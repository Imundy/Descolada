---
templateKey: tech-blog-post
title: Async Map in Javascript
date: 2017-09-03T15:04:10.000Z
featuredpost: false
featuredimage: /img/blog-index.jpg
description: Consider looking at the for await … of syntax as well.
tags:
  - node
  - javascript
  - async/await
  - babel
  - es7
---

Update May 2019: Consider looking at the `for await … of` syntax as well.

I was writing some API code recently using Node 8, and came across a place where I needed to use `Array.prototype.map` with an async function on each item. Async/Await is one of my favorite new features in javascript as it makes asynchronous javascript code much more readable. Now I was briefly surprised when my `map` call did not work. Look at the code below and see what you expect it to log:

```
const arr = [ { key: 1 }, { key: 2 }, { key: 3 } ]

const result = arr.map(async (obj) => { return obj.key; });

console.log(`Result: ${result}`);
// outputs "Result: ???"
```

If you’re saying “Well of course it’s ‘Result: [object Promise],[object Promise],[object Promise]’” (how did you say that out loud), then congratulations for being right! 🎉

If you’re not sure _why_ that is the result, then I suggest reading the following article about async/await in JS — [Learn About Promises Before You Start Using Async Await](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8).

> However, what a lot of people may have missed is that the entire foundation for async/await is **promises**

So what is the solution to the problem of `map` with async/await? Welcome `Promise.all`. As illustrated by the following Pen:

[codepen link](https://codepen.io/Imundy/pen/xLBbog)

If you’re like me, you’ll find `Promise.all` incredibly helpful while working with async/await. Know other, even more powerful uses of async/await? Feel free to leave a comment with your favorite one :)
