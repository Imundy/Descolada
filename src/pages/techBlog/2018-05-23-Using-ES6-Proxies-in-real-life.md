---
templateKey: tech-blog-post
title: Using ES6 Proxies in Real Life
date: 2018-05-23T15:04:10.000Z
featuredpost: false
featuredimage: /img/es6-proxy-cover.jpg
description: JSON value ‘<null>’ of type NSNull cannot be converted to NSString 🙃
tags:
  - node
  - javascript
  - docker
  - encryption
  - configuration management
---

A while back I read about some of the metaprogramming features that were added in ES6. While I use some extensively, like Symbols, others I’ve had a hard time finding a use for. Like Proxies. They seem so _cool_ (and now you know my idea of cool 😎).

I’ll explain briefly what a Proxy is and then what I used it to actually solve recently.

## The Proxy Object

Before going too far, I need to give credit to Keith Cirkel who wrote an incredible set of posts on all the metaprogramming additions to ES6. if you want to read that, you can find it [here](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/).

From [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy):

> The **Proxy** object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).

Put another way, a Proxy “wraps” another object, and can intercept (and possibly modify) operations for that object. For example if I try to `get` a value for a `property` on a proxied object, that would instead call the Proxy method I have defined instead of just immediately retuning me the value of that property.

In code that looks like:

```
// plain old object
const foo = { a: 'value of a' };
// define a handler for any number of operations (get, set, etc.)
const handler = {
  get: function(target, property) {
    // We're overriding the fundamental "get" operation
    // target is the orignal object (foo)
    // property is what we're trying to access (a)
    const value = target[property]; // foo.a
    console.log(value);
    return value;
  }
}
// create a proxy for the original object
const proxiedFoo = new Proxy(foo, handler);
const b = proxiedFoo.a; // logs "value of a"
```

If you’re like me, I looked at these examples and thought “okay cool I think I’m following… but where would I use this?”

### React Native + IOS + JSON serialization

I came across this super awesome behavior from iOS in React Native described in [this issue](https://github.com/facebook/react-native/issues/9743). (But seriously I _love_ React Native and am constantly in awe of what that team accomplishes).

The TL;DR on that issue:

- Have a null property in a JS object — cool
- Call JSON.stringify on that object with a null property — totally cool.
- Store that string in AsyncStorage on iOS — sure, no problem!
- Retrieve that item later? — 💥🔥⁉️

Yea, pretty killer. In my case, I’m storing something I’m getting back from the API, and I don’t _really_ feel like sanitizing that to make sure there aren’t any null values. The solution? Use a **Proxy** to do that for me on the fly when I’m inserting into AsyncStorage.

Here’s the code I wrote for that (with some comments):

```
const proxyReplaceNullWithEmptyString = (obj) => {
  const handler = {
    get: (target, prop) => {
      // get the value of the property
      const value = target[prop];
      if (!value) {
        return ''; // return empty string instead of null/undefined
      }
      if (typeof value === 'object') {
        // if the target is also an object, proxy that too
        return new Proxy(target[prop], handler);
      }
      return value; // it's not null and not an object, return it
    },
  };
  return new Proxy(obj, handler);
};
```

Some small things here:

- I’m using `Reflect.get` instead of `target[prop]`
- null and empty string are **definitely not** equivalent. But for my use case I don’t care and I’ve named the function to explicitly call out that behavior.

---

So there you have it — a short, real life use for **Proxy** objects in ES6. I think the main thing I learned is that they don’t have to be used to solve complicated problems. There were other ways I _could_ have solved that problem. But using a **Proxy** seemed elegant and straightforward.

Thanks for reading!
