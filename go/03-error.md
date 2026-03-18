---
layout: post
title: 03 Error
date: 2023-01-19 08:56:00
giscus_comments: true
description: Handling errors in Go
tags: error
# categories: sample-posts
---

Concurrency in programming means running multiple tasks simultaneously. In Go, it is realized by **Goroutine** and **Channel**.

## Goroutine

A **goroutine** is a lightweight thread of execution. It is mainly used to run a task while allowing other task run at the same time. Look at the example code below. 

{% highlight go linenos %}

package main

import "fmt"

func main() {
	//inline goroutine
	go func() { fmt.Println("First goroutine") }()
	//call a function as goroutine
	go goroutineExampleFunc()
	fmt.Println("Print after two goroutines")
}

func goroutineExampleFunc() {
	fmt.Println("Second goroutine")
}

{% endhighlight %}

If you run the above code, you only see `Print after two goroutines` only as an output. That's because it fires up each goroutines(line 7 and 9 each) and moves down to execute the line 10 without waiting the two goroutines finish. Because the line 10 is executed and the `main()` execution is done ahead of both `fmt.Println` inside of the two goroutines, both goroutine `Println` results are not printed out. To fix this issue, you need to use **channel** between goroutines.

## Channel
**Channel** makes communication possible between goroutines. It allows you to pass in a certain information from one goroutine to another. The way to use the channel is following:
* Assign a new channel: `ch := make(chan int)`
* Send `1` to a channel: `ch <- 1`
* Store the current value in the channel: `var := <- ch`

Let's take a look at the code below. I declare a new channel called `ch` on line 6 and send `1` to the channel inside the first goroutine and `2` inside the second goroutine. And the line 16 will print out what number the channel at the end of `main()` execution.

{% highlight go linenos %}

package main

import "fmt"

func main() {
	ch := make(chan int)
	//inline goroutine
	go func() {
		fmt.Println("First goroutine")
		ch <- 1
	}()
	//call a function as goroutine
	go goroutineExampleFunc(ch)
	fmt.Println("Print after two goroutines")
	i := <-ch
	fmt.Println("Recieved ", i)
}

func goroutineExampleFunc(ch chan int) {
	fmt.Println("Second goroutine")
	ch <- 2
}

{% endhighlight %}

Everytime you run the above code, you will find different outputs. Below is my outputs.

{% highlight shell %}
% go run goroutine.go
Second goroutine
First goroutine
Print after two goroutines
Recieved  2
{% endhighlight %}

{% highlight shell %}
% go run goroutine.go
First goroutine
Print after two goroutines
Recieved  1
Second goroutine
{% endhighlight %}

{% highlight shell %}
% go run goroutine.go
Print after two goroutines
First goroutine
Second goroutine
Recieved  1
{% endhighlight %}

The Channel does not change the way **goroutines** function. It just gives us a better visibility of which goroutine was executed until which line while `main()` function is running.

Note: I reference Parikshit Agnihotry's *Understanding the context package* in golang to create this post. Please visit <a href="https://p.agnihotry.com/post/understanding_the_context_package_in_golang/" target="_blank">his page</a> for more detailed explanation.