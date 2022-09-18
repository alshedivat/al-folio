---
layout: post
title: "Ruby: create a Hash from Arrays"
description: "Ruby: create a Hash from Arrays"
category: 'Programming'
tags: [ruby]
---

Ruby has a very beatutiful expressiveness and offers a great standard library. This helps a lot when dealing with data structures. Especially when you have to convert, merge or combine Arrays and Hashes. This post is showing just a little example out of the big area of possibilities.

## The target

One thing we likely stumble upon when creating data structures is the task to create a `Hash` from two Arrays where one `Array` holds the `keys` and the other one the `values` of the resulting `Hash`. Based upon our example Arrays, one result could look like this:

    {
        "Verena" => "reading",
         "Kiana" => "swimming",
          "Naya" => "painting"
    }

Or even:

    {
        "Verena" => "rock",
         "Kiana" => [
            [0] "folk",
            [1] "disco"
        ],
          "Naya" => "metal"
    }

The following sections will describe how we can create these data structures.

## The data

We have three simple Arrays with the following structure:

    names = %w(Verena Kiana Naya)
    [
        [0] "Verena",
        [1] "Kiana",
        [2] "Naya"
    ]

    hobbies = %w(reading swimming painting)
    [
        [0] "reading",
        [1] "swimming",
        [2] "painting"
    ]

    music = ['rock', %w(folk disco), 'metal']
    [
        [0] "rock",
        [1] [
            [0] "folk",
            [1] "disco"
        ],
        [2] "metal"
    ]

These Arrays are the base for all subsequent steps to create our `Hash`.

## Combine data with the `Array#zip` method

From the [documentation](http://www.ruby-doc.org/core-2.1.2/Array.html#method-i-zip)
> Converts any arguments to arrays, then merges elements of self with
> corresponding elements from each argument. ...

So when using our data structures, we can do something like this:

    names.zip(hobbies)
    [
        [0] [
            [0] "Verena",
            [1] "reading"
        ],
        [1] [
            [0] "Kiana",
            [1] "swimming"
        ],
        [2] [
            [0] "Naya",
            [1] "painting"
        ]
    ]

As you can see, `Array#zip` is creating a new Array from our two Arrays `name` and `hobbies`. The resulting Array consists of pairs from `name[0] -> hobbies[0]`, `name[1] -> hobbies[1]` and so on. If no corresponding value can be found, `nil` will be inserted in the resulting Array.

The `zip` method is very helpful for creating data structures as we will see when we will create a Hash.

## A flat Array from a nested Array with `Array#zip`

From the [documentation](http://www.ruby-doc.org/core-2.1.2/Array.html#method-i-flatten)

> Returns a new array that is a one-dimensional flattening of self
> (recursively).

The resulting Array of Arrays created with the `Array#zip` method is not yet in the correct form to be able to throw it into our resulting `Hash`. We have to convert it into a `one dimensional Array` because later we will create the `key` - `value` pairs like this:

    key0 = Array[0]
    value1 = Array[1]
    key1 = Array[2]
    value1 = Array[3]

I think you got the idea. `Array#flatten` will help us to get the job done. It is as simple as this:

    names.zip(hobbies).flatten
    [
        [0] "Verena",
        [1] "reading",
        [2] "Kiana",
        [3] "swimming",
        [4] "Naya",
        [5] "painting"
    ]

That was easy. Now let's see how we create the final `Hash` in the next section.

## Reaching the target: creating the `Hash` from `Arrays`

We are nearly done. In the last section we saw, how to create a flattened Array. This Array has the correct form to throw it into our Hash. So let's do it:

    Hash[names.zip(hobbies).flatten]
    (irb):47: warning: wrong element type String at 0 (expected array)
    (irb):47: warning: ignoring wrong elements is deprecated, remove them explicitly
    (irb):47: warning: this causes ArgumentError in the next release
    (irb):47: warning: wrong element type String at 1 (expected array)

Oh WTF? That is not the expected result. Why is this?

The problem is, that a Hash expects to receive a list of arguments. And here comes the `splat` operator `*` into play. It is able to convert a list into a group of parameters and is able to fill an Array with a group of parameters. Following we look at some examples.

*Convert a Hash into an Array*

    hash = *{'Andy' => 'Daddy'}
    [
        [0] [
            [0] "Andy",
            [1] "Daddy"
        ]
    ]

*Convert a (flat) Array into a Hash*

    Hash[*n.flatten]
    {
        "Andy" => "Daddy"
    }

Interesting is to examing the result with the `class` method:

    hash = {'Andy' => 'Daddy'}.class
    => Hash

    hash = *{'Andy' => 'Daddy'}.class
    => [Hash]

As you can see, the second one is a `Hash` in a list (Array).

You can also do other cool stuff with the splat operator. Please have a look at the [4loc Blog](http://4loc.wordpress.com/2009/01/16/the-splat-operator-in-ruby/) for more details.

## But now: the final Hash

After we understood why the error occured and know how to circumvent it, we are finally able to create our `Hash`:

    Hash[*names.zip(hobbies).flatten]
    {
        "Verena" => "reading",
         "Kiana" => "swimming",
          "Naya" => "painting"
    }

Woot! That's the result we expected. Cool. But what if the `hobbies` data structure would have nested Arrays? Let's see what happens, when we use the `music` Array instead of the `hobbies` Array:

    Hash[*names.zip(music).flatten]
    ArgumentError: odd number of arguments for Hash
        from (irb):79:in `[]'
        from (irb):79
        from /Users/andwen/.rvm/rubies/ruby-2.0.0-p353/bin/irb:12:in `<main>'

Hm - that did not work. Ruby does not know what to do with the `not flat` data structure of `music`. We need to create the Hash a bit differently:

    result = {}
    Hash[names.zip(music).each {|a,b| result[a] = b }]
    {
        "Verena" => "rock",
         "Kiana" => [
            [0] "folk",
            [1] "disco"
        ],
          "Naya" => "metal"
    }

That did the trick. Please note that this is working for an Array one level deep nested. I leave it to you to also find a solution for n-level deep nested Arrays :-) .

## Further info for Array and Hash

Dealing with Arrays and Hashes is daily business for developers. That for sure also counts for Rubyists. You should definitely dive into the documentation for the [Array](http://www.ruby-doc.org/core-2.1.2/Array.html) and [Hash](http://www.ruby-doc.org/core-2.1.2/Hash.html) Classes included in the Ruby standard library.

## Conclusion

In this post we examined how to convert two Arrays with simple data structures in a Hash with a `key - value data structure`. This is very helpful when dealing with data and we have seen, that Ruby offers good solutions to handle these tasks.

How are you creating similar data structures? I am curious and would love to receive a message from you ... simply send it to [andy@nms.de](mailto:andy@nms.de).

##UPDATE

Thanks to [Nathan Wallace](https://twitter.com/nosuchthingas2) who pointed out that you can do this since [Ruby 2.1](http://ruby-doc.org/core-2.1.0/Array.html#method-i-to_h)

    names.zip(music).to_h
    {
        "Verena" => "rock",
         "Kiana" => [
            [0] "folk",
            [1] "disco"
        ],
          "Naya" => "metal"
    }

