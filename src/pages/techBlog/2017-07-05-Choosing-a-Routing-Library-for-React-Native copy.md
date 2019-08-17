---
templateKey: tech-blog-post
title: Choosing a Routing Library for React Native
date: 2017-07-05T15:04:10.000Z
featuredpost: false
featuredimage: /img/react-native-navigation-cover.jpg
description: Or how I changed my routing solution 4 times
tags:
  - react
  - react native
  - ios
  - android
  - navigation
---

After watching a talk on React Router v4 at [React Conference](http://conf.reactjs.org/), I was interested in trying their [native router](https://reacttraining.com/react-router/native/guides/quick-start). I had experience already using it for web development and loved the small api surface it provided. At the time, I was using [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) but didn’t feel tied to it.

I didn’t end up choosing to stick with React Router, but it led me to playing with a few different routing libraries.

TL;DR — I personally decided to go with [React Navigation.](https://github.com/react-community/react-navigation)

## React Native Router Flux

First off, React Native Router Flux has been around for a while, being an early entry into React Native. Both the library and React Native have come a long ways since it’s first release in September 2015. Here’s what I liked about using RNRF when I started:

- It was the most complete library I could find at the time :)
- It has a lot of documentation and possible configurations
- Features — customizable nav and tab bars, scene renderers, dynamic routing

The [large api](https://github.com/aksonov/react-native-router-flux/blob/master/docs/API_CONFIGURATION.md) was ultimately one of the reasons I decided to move away from RNRF. It was large and powerful, but it felt like a steep learning curve when I was also learning React Native for the first time. While the documentation and examples are constantly improving, it felt more complicated than what I needed.

## React Router

As I said, I was very interested in native routing using React Router. It delivered mostly on my expectations. Routing is nearly identical to the web — a huge bonus if you’re already used to that — and the api was simple to learn and use.

Why did I decide to move on from it?

The routing never felt native to me. React Native itself is an abstraction over two different experiences, and the resulting routing felt like another layer taking away from the Native experience. It works, but I felt constrained by the small API instead of liberated. It’s possible I didn’t give it enough time when I was shifting through libraries, but I wanted something that felt more specific to the the native experience.

While a familiarity with react router makes it seem like an easy win — following the learn once, route anywhere principle — I didn’t find the web to native transition to be all that natural. The screen size meant that pages often have a smaller, more defined purpose. Things that might be a single page on the desktop can easily become some kind of tabbed navigation on a mobile experience with a shared context. Being able to represent that was important to me.

## React Native Navigation

So after React Router I tried [React Native Navigation](https://github.com/wix/react-native-navigation) by Wix. I was drawn in by the native part of this library. There’s a long explanation on [why Wix wrote a native navigation library](https://github.com/wix/react-native-controllers#why-do-we-need-this-package) and it compelled me to try it out. You should really read their reasoning, but the TL;Dr is summarized in this one sentence from that section:

> Using this package we are able to use the original native components instead of compromising on pure JS alternatives.

I like the sound of that!

So, what did the experience end up like?

It was a _lot more complicated_ to initially set up than any of the other libraries I used. This makes sense of course, instead of building on top of React Native, Wix is rebuilding it all from the ground up. This means not just installing a package, but changing the way your Objective-C and Java code is set up.

The first thing that made me wary of this using native navigation was some problems I was having with the IOS swipe left gesture working (after all, all the native magic is supposed to be there). Wix is in the process of a major 2.0 milestone for the library and I think it has caused issues like that one to possibly lose some traction. However, while an undetermined 2.0 release didn’t deter me from using the library, I found that I ultimately could not accomplish a goal in the app I was working on.

I needed to render a fixed element that **never** changed when navigating between screens below the navigation bar. There just wasn’t a way a to do that in the current API because of the way the app is registered so that the native implementation owns the changes. For example, I couldn’t render my screens inside some unchanging layout.

So I tried the last library…

## React Navigation

[React Navigation](https://reactnavigation.org/docs/intro/) was what I was looking for. It’s a JS implementation, and it works well. _Really_ well.

The documentation is great — the best of any of the libraries I looked at — and it helped me both to get started and to dive deeper into the specific scenarios I was interested in.

A particular thing I loved was that things were defined in terms of Navigators. Navigators are kind of like a collection of routes, but they can also be nested. So what I was saying earlier about wanting to represent native navigation more closely — this paradigm feels closer to that. If we have a several screens in our app, and some of those screens also have tabs, we nest a `TabNavigator` in a `StackNavigator`.

While this is possible with the other libraries, I liked the representation that React Navigation provided the best. It also allowed me to render that fixed component I was mentioning earlier. I felt like I could get off the ground quickly by knowing about the Navigators and a couple screen navigation props. Add a section for integrating with redux and I was on my way.

### Honorable Mention: AirBnB’s Native Navigation

2019 Note: AirBnB no longer uses React Native

[Link](http://airbnb.io/native-navigation/?source=post_page-----604f97e58729----------------------)

I really like what AirBnB has been doing for the React Native community. Their [React Native Maps](https://github.com/airbnb/react-native-maps) library is incredible. I’m excited to see what they’re going to do with their own native navigation library, but by their own admission, it’s not ready for production use.

> We encourage people to try this library out and provide us feedback as we get it to a stable state we are confident in, but not to rely on it for production use until then.

How will they know when it’s ready? [When they ship it to the AirBnB app.](http://airbnb.io/native-navigation/docs/roadmap.html)
