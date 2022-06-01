/*
 *   Copyright (c) 2021-2022 Yusuf Can Bayrak <yusufcanbayrak@gmail.com>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 *   Contributors:
 *   Yusuf Can Bayrak - initial implementation and documentation.
 *
 */
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
)

var ch = make(chan string)
var ctx = context.Background()

var rd = redis.NewClient(&redis.Options{
	Addr: os.Getenv("REDIS_URL"),
	DB:   0, // use default DB
})

func beginPubSubSubscription(wg *sync.WaitGroup, c chan string) {
	status := rd.Ping(ctx)

	if _, err := status.Result(); err != nil {
		fmt.Println("Unable to connect Redis.")
		os.Exit(-1)
	}

	for {
		sub := rd.PSubscribe(ctx, "*")
		ch := sub.Channel()

		for msg := range ch {
			c <- msg.Payload
		}
		close(c)
		wg.Done()
	}
}

func beginWebSocketTunnel(wg *sync.WaitGroup, c chan string) {
	http.HandleFunc("/ws", func(writer http.ResponseWriter, request *http.Request) {
		upgrader := websocket.Upgrader{CheckOrigin: func(*http.Request) bool { return true }}
		conn, err := upgrader.Upgrade(writer, request, nil)
		if err != nil {
			log.Fatal("websocket connection err:", err)
			return
		}
		defer conn.Close()
		for i := range c {
			err := conn.WriteMessage(websocket.TextMessage, []byte(i))
			if err != nil {
				log.Fatal("websocket write err:", err)
			}
		}
		wg.Done()
	})

	log.Println("Pub-Sub Websocket Channel started.", "http://localhost:5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}

func main() {
	wg := sync.WaitGroup{}

	wg.Add(2)

	go beginPubSubSubscription(&wg, ch)
	go beginWebSocketTunnel(&wg, ch)

	wg.Wait()
}
