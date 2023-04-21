package main

import (
	"fmt"
	"github.com/dop251/goja"
	"io/ioutil"
	"log"
)

func main() {
	fileContent, err := ioutil.ReadFile("../ts/dist/bundle.js")
	if err != nil {
		log.Fatal(err)
	}

	// Convert []byte to string
	text := string(fileContent)

	vm := goja.New()
	_, err = vm.RunString(text)
	if err != nil {
		panic(err)
	}

	var fn func() string
	err = vm.ExportTo(vm.Get("f"), &fn)
	if err != nil {
		panic(err)
	}

	fmt.Println(fn()) // note, _this_ value in the function will be undefined.
	// Output: 42
}
