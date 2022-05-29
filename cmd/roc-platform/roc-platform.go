package main

import "fmt"
import "math"

func main() {
	var x float64
	var list []int

	list = []int{1, 2, 3, 4, 5}
	for _, i := range list {
		x = math.Pow(float64(i), 2)
		fmt.Println(i, " -> ", x)
	}

	fmt.Println("ROC platform started...")
}
