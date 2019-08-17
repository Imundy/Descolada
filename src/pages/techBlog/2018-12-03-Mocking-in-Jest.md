---
templateKey: tech-blog-post
title: Mocking in Jest
date: 2018-12-03T15:04:10.000Z
featuredpost: false
featuredimage: /img/mocking-in-jest-cover.jpg
description: placeholder
tags:
  - jest
  - javascript
  - react
  - testing
  - unit testing
---

Recently, I’ve been working to add more unit tests to front end code. Using Kent C. Dodds’ great [react-testing-library](https://github.com/kentcdodds/react-testing-library) (if you haven’t checked it out, it’s seriously 🔥) alongside Jest. Testing small components is usually pretty straightforward. Pass them mocked functions as props, fire some events, and validate things look like you `expect`. Most of my fun has been when I’ve need to mock dependencies.

### A brief plea to write unit tests like production code

Before I get into details of mocking, I just want to write a brief petition to treat the code you write in unit tests like code you write for production. Mostly, make it readable! It can be really easy to treat unit tests more like hacky little scripts rather than what they really are; pieces of code critical to deploying your application.

And even more importantly, you probably have other people who will need to understand the unit tests someday. For that reason alone consider factoring them into easily understood pieces of code. Write helper functions to encapsulate common pieces of code or set up. Document what is going on. Because unit tests are the things you tend to interact with only when they fail, it’s nice to be able to get into them and quickly understand what’s going on.

## Mocking DOM APIs

Sometimes DOM APIs are not available in JSDOM. Jest calls this out in their [documentation](https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom) by recommending you just simply write a mock function and assign it to the window object. But what if you want to mock a property on the window?

It turns out there’s a straight forward VanillaJS™️ way to do this. By using `Object.defineProperty` with the window object (or the document object), we can mock out the getters and setters. Here’s an example I wrote recently for mocking `document.cookie`. The goal was to test a situation where `doucment.cookie` could not be set due to cross-origin iframe restrictions in Safari(🙃).

```
test('Renders help message when cookies cannot be set', () => {
  Object.defineProperty(document, 'cookie', {
    get: jest.fn().mockImplementation(() => { return ''; }),
    set: jest.fn().mockImplementation(() => {}),
  });
  // more test code...
})
```

Now, the test does what I want. The component will not be able to set the cookie and should behave correctly.

## Alternate Approach: DOM utility functions

Another way we could do this, is instead of mocking `document.cookie` directly, we could write a utility function for the component that uses it. `function canSetCookie() -> boolean`

Why is this useful? Because we don’t have to mock the `document` property at all. Instead we can just mock our utility method like we would mock anything else in a test. For example, if the `canSetCookie` function is taken in as a prop, we have an easy way to test that component in isolation.

Or if it is in some common local utility file, we can mock that dependency. Along with the cookie code, we also had some code that determined if we were in an iframe. Because this was out in a helper method, I could do a “normal” mock, with the following code.

```
jest.mock('shared/util/iframe.js', () => ({
  isInIframe: () => true
}));
```

Easy, next.

## Partially mocking dependencies

So let’s say you have a dependency where you want to mock a function differently for each test. As an example, a situation I need to do this in was client code. We have API clients that can hit many routes on a test. For a lot of tests, we want to return the same thing from our mocks, but occasionally we might want to test different scenarios (like the API returning error responses). The question is how do we have our generic mock, and then occasionally override individual exports from it? Or maybe you want to observe what a mocked function gets called with?

The answer here also turns out to be just javascript. The steps are:

1. Mock the dependency
2. Import the mocked dependency
3. Assign the function we want to override back to the import

For example:

```
jest.mock('shared/my-api-client.js');
import { client } from 'shared/my-api-client.js';
test('returns error from client' () => {
  const mockMethod = jest.fn(() => Promise.resolve({}));
  client.sendInfo = mockMethod;
  // test code...
  expect(mockMethod).toHaveBeenCalledWith(expectedJson);
})
```

One important thing to remember when doing this is that you will need to clean up the client method you mocked after each test that cares about that method.

---

I hope this was helpful! These are just a few techniques I found very useful when writing unit tests for complex components. If you have any techniques that you find useful, I would love to hear about them below.
