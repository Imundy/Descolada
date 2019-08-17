---
templateKey: tech-blog-post
title: Async Event Handlers in React
date: 2018-03-05T15:04:10.000Z
featuredpost: false
featuredimage: /img/sake.jpg
description: Proper async handling of events in React
tags:
  - es6
  - javascript
  - async/awaut
  - react
  - browser events
---

The other day I was reviewing a piece of code that looked something like this:

```
handleForm = async event => {
  this.setState({ isProcessing: true });
  const response = await client.sendApiRequest({
    value1: event.target.elements.field1.value,
    value2: event.target.elements.field2.value,
  });
  if (response.ok)
    this.setState({ isProcessing: false });
}
```

Now, depending on your familiarity with events in React, that code might seem totally fine. But the async event handler stood out to me and made me wonder if those lines where we’re accessing `elements` will work as expected. before I get into whether or not that works, let’s hit some background points here.

## React Events and the Browser Event Loop

If you already know how both of these work, then feel free to skip on down.👇

First, I’ll touch on the Event Loop. It’s worth noting that this has been written about thoroughly in other places (and probably much better than me as well!). I recommend [this post](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5), but I’ll try to give you the TL;DR here.

### Event Loop

Javascript is single threaded. This means that there are many race conditions we don’t need to worry about because we know things will be executed off the call stack in that single thread. This single threaded Event Loop can be thought of as pulling from a few different sources:

- The **call stack**: this is straightforward. Call a function (console.log) and it gets added to the call stack to be executed.
- The **callback queue**: the best example of this is setTimeout. It takes a callback function that (once the time has elapsed) adds the item to the callback queue. If there is nothing on the call stack, then the Event Loop will execute whatever is on the callback queue.
- The **Job Queue**: This is kind of like the callback queue, but it the items on it have a different priority. During a tick of the Event Loop, we’ll check if there is anything on the job queue for us to do, and if there is then we’ll execute that in order — and not just if the call stack is empty.

The Job Queue is particularly important because it backs the resolution of promises. Why is this all relevant to event handlers in React though?

### React Event Handlers

React wraps native browser events in its own structure called a `SyntheticEvent`. This is helpful in a lot of ways because it smooths out differences between some browser implementations and allows React to control certain aspects of the event. From the [React docs](https://reactjs.org/docs/events.html#event-pooling):

> The `SyntheticEvent` is pooled. This means that the SyntheticEvent object will be reused and all properties will be nullified after the event callback has been invoked. This is for performance reasons. As such, you cannot access the event in an asynchronous way.

Why is that?

Well think about the callback queue for instance. Say we pass our event to something like `setTimeout(() => { console.log(event.target.value); }, 5000);`. Well in the 5 seconds that elapse before the earliest time we might execute the callback, React might decide it needs to reclaim that event causing us to be accessing something totally different (or more likely null).

So what happens in the example of the asynchronous function used as an event handler?

## Async Event Handlers

So, it turns out that the code above is totally fine. The syntactic sugar of `async/await` is backed by `Promises` which means we could also look at our code as doing something like this:

```
handleForm = event => {
    this.setState({ isProcessing: true });
    client.sendApiRequest({
      value1: event.target.elements.field1.value,
      value2: event.target.elements.field2.value,
    }).then(response => {
      if (response.ok)
        this.setState({ isProcessing: false });
    });
  });
}
```

The first part of that promise is going to execute in what is essentially a synchronous manner. That means we are safe to pass the event values as arguments. However, it’s important to recognize that this does not mean that accessing the event values anywhere in an async function is okay. Take for example what would happen if we needed access the event after the API request.

```
handleForm = async event => {
  this.setState({ isProcessing: true });
  const response = await client.sendApiRequest({
    value1: event.target.elements.field1.value,
    value2: event.target.elements.field2.value,
  });
  if (response.ok) {
    this.setState({
      isProcessing: false,
      value1: event.target.elements.field1.value,
      value2: event.target.elements.field2.value,
    });
  }
}
```

Now we’re accessing the event **after the await**, which is like accessing it in the `.then` chain of a promise. We would be accessing the event asynchronously now. Here’s that same event written as promises again:

```
handleForm = event => {
  return new Promise((resolve, reject) => {
    this.setState({ isProcessing: true });
    client.sendApiRequest({
      value1: event.target.elements.field1.value,
      value2: event.target.elements.field2.value,
    }).then(response => {
      if (response.ok) {
        this.setState({
          isProcessing: false,
          value1: event.target.elements.field1.value,
          value2: event.target.elements.field2.value,
        });
      }
    });
  });
}
```

The moral of the story with async event handlers in React is a simple one — be careful. One of the cool things about `async/await` is that it makes sometimes very ugly nested asynchronous code look just as simple and straightforward as synchronous code, but it’s **not synchronous code**.

### How do you fix it?

The answer is `event.persist()`. If you need to access an event in an asynchronous way, then you should call `event.persist()` at the beginning of the function. This will take the `SyntheticEvent` out of the pool and prevent it from being reclaimed by React.

---

Thanks for reading! I know I glossed over some details of the Event Loop so I definitely recommend the article from earlier. Here it is again to save you from scrolling:

https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5
