/*
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

import { RedisClientType, createClient } from "@redis/client";
import { Server, WebSocket } from "ws";

const REDIS_SERVER = process.env.REDIS_URL || "redis://localhost:6379";

const TUNNEL_HOST = process.env.TUNNEL_HOST || "0.0.0.0";
const TUNNEL_PORT = parseInt(process.env.TUNNEL_PORT) || 5000;

const redisClient: RedisClientType = createClient({
  url: REDIS_SERVER,
});

// Create & Start the WebSocket server
const server: Server = new Server({
  host: TUNNEL_HOST,
  port: TUNNEL_PORT,
});

// Register event on client connection
server.on("connection", async (ws: WebSocket) => {
  console.log("connected");

  // create new redis connection for each websocket connection
  const subscriber = redisClient.duplicate();
  await subscriber.connect();

  await subscriber.pSubscribe("*", (message, channel) => {
    console.log(`New event received -> ${channel}::${message}`);
    ws.send(`${channel}::${message}`);
  });
});

console.log(`WS Tunnel started at ws://${TUNNEL_HOST}:${TUNNEL_PORT}`);
