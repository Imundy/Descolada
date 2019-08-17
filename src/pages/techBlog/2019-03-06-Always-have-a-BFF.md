---
templateKey: tech-blog-post
title: Always Have a BFF
date: 2019-03-06T15:04:10.000Z
featuredpost: false
featuredimage: /img/always-have-a-bff-cover.jpg
description: Why you should (always) have a backend for frontend
tags:
  - web development
  - javascript
  - front end development
  - app development
  - programming
---

Alright, alright — always doesn’t mean always. But really, the backend for front end pattern is one that everyone should be using and can be tempting to skip. But having a backend for frontend should mean little upfront work that allows a range of future benefits.

## What is a BFF?

A Backend for frontend (BFF) is a server that exists to server a client application. In a sense every web application needs something like this simply as a starting point for assets, but the pattern is not limited to web apps.

![BFF Diagram](/img/bff-diagram.png)
Example of the BFF pattern

Notice that in it’s simplest form a BFF could be nothing more than a _proxy server for your other APIs_. Even with a simple proxy server, we can already gain potential benefits from the pattern.

For example, by sending everything to a proxy server first, this means that you don’t have to expose you APIs externally. Hiding implementation details can make it harder for someone to coordinate an attack (though security through obscurity is not viable defense in the long run). It also immediately gives you a place to start cacheing or rate limiting requests outside of the API you may be overloading. For APIs that serve many clients, having a quick shutoff valve can be a lifesaver in not having the whole world on fire.

## But won’t this increase latency?

The simple answer is yes, but the long answer is no.

Putting a proxy server between your client application and the service it is requesting increases latency. There is overhead in making HTTP requests (or whatever you’re using). But if you’re just forwarding along the request and response then this should be trivial overhead and there are almost certainly other bottlenecks. Like some dev messed up a webpack config and you’re shipping React in development mode. (Who would do that. Not me 👀)

But building a BFF allows you to intelligently batch calls to other backends and return the data all at once, or transformed a more convenient representation. This can be very useful for clients that are on 2G or 3G networks where it can take seconds (or more) just to establish the connection. You don’t want them making dozens of concurrent requests, [where concurrent can also be limited by the browser](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser).

Add into this the aforementioned caching and you should be able to significantly increase the performance of your client application. And those benefits aren’t limited to web applications. There’ no rule that says you can’t have separate backend for you native or desktop applications. You could even have a different backend for android and ios, or tablets and phones (or foldable phones?), all of which may present data to the user in a different way and thus have different requirements for fetching data.

And you may have already guessed this, but if you have an application that is doing server side rendering, then this means you need to have a BFF to accomplish that. SSR may or may not be right for your application, but it is a great example of an optimization for a client to be “do it on the server instead”.

## Separation of Concerns

One important thing here is that it allows you to separate your frontend requirements from your backend concerns. A web application is not the same as a remote API, and front ends often find it useful to transform data that they fetch from the server. This also allows us to obtain the deep magic of the Gang of Four.

> **Program to an ‘interface’**, not an ‘implementation’. — [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns)

The BFF acts as a type of interface for your client code. How that gets implemented behind the BFF is not the concern of your client application. In fact, having your client application know less about the structure of your APIs will make it more resilient to changes in those APIs. You control what runs on your server, but it can often be hard to control what your clients are running especially in native situations.

Take for example a billing system. You allow people to save their information so that they can easily pay again later like any civilized ecommerce site. What all is in saving a user’s billing information? Well it might include a payment instrument like a credit card and a billing address. This is great and you create an API to store billing information.

Later you realize that addresses can be really useful outside of billing information. They could be shipping addresses, or legal addresses, or maybe part of your product utilizes addresses. At this point you realize it would be really convenient to have an API that deals with address management separate from your API that deals with payment instruments. Since you have wrote a BFF, you can undertake this rewrite, swap out the implementations on the backend, and all of your old clients will continue to work 🚀.

## Error Handling

As a minor point, this also allows you to handle UI errors a lot better. My personal experience is that server errors tend to be verbose and not very useful for determining what to show the user. Often times you can have fifty different server errors — all of which indicate very interesting and useful things when debugging an alert and 2am — but they may all result in the exact same user experience. By using a backend for frontend you can simplify the expectations of the client code to a known subset of errors and deal with the mapping on the BFF.

---

To wrap things up, consider investing the time to make sure your client application isn’t calling APIs directly. Doing so opens the door to future optimizations and less painful migrations, which can increase velocity as your project grows in complexity.
