---
templateKey: tech-blog-post
title: Writing a Node.js script
date: 2017-05-02T15:04:10.000Z
featuredpost: false
featuredimage: /img/node-js-script-cover.jpg
description: Hack your way to glory
tags:
  - node
  - scripting
  - encryption
  - javascript
  - npm
---

I've spent a decent amount of time writing server code with Node.js but despite that I've somehow never written a simple script before. I mean, I _knew_ they were easy and useful, but I'd never got around to using one.

Writing one off scripts was basically my entire college education - so I love stuff like this. Let's get into what I learned!

## Setting things up

```
npm init
```

💥 You're done!

Okay not really, but it's just about that easy to get started. Bonus from [the docs](https://docs.npmjs.com/cli/init): if you use the -y option with `init` it won't ask you to fill in all the defaults.

All `init` really does is create a package.json file for us. We'll need to add an index.js file to write our script in. It's not important that this is actually named index.js, but it's a good choice IMO.

Before I get too far, I should mention what I'm building. This will be a script that does 2 things:

- Creates a public/private key pair
- Encrypts a file, as passed in from the command line

## Command Line Arguments

If you want to use command line arguments in your script like `node index.js -a foo -b bar` then you'll want to access `process.argv`. The [first two](https://nodejs.org/docs/latest/api/process.html#process_process_argv) arguments are always the path to the Node executable and the path to the file we are executing respectively. Those aren't important for this so we can just do:

```
var args = process.argv.slice(2);
```

This will get an array of all the arguments after the defaults. I found that handling command line arguments like this was tedious, so I added the [minimist package](https://www.npmjs.com/package/minimist) to my script to make it a little cleaner. Afterwards I could do the following to pass a file in through the command line and read it in the script

```
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var file = fs.readFileSync('data/' + argv.file, 'utf8');
```

If you're not familiar with fs, it contains the bindings for Node's filesystem library (one of the many things that makes Node.js so awesome!). Since Node.js is designed to be an event based, asynchronous framework most default methods are asynchronous. Because async callbacks would only complicate this simple script, I've elected to specifically use `readFileSync` to `read` the `File` `Sync`hronously.

## Creating the KeyPair

For this part I used the [node-rsa](https://www.npmjs.com/package/node-rsa) package. So our goal here is to:

- Create a keypair
- Write the public/private keys to files (because it's not any good encrypting things we don't have the keys to decrypt)

![Important PSA](/img/config-key-security.jpg)

```
var NodeRSA = require('node-rsa');

var key = new NodeRSA().generateKeyPair();
var publicKey = key.exportKey('pkcs8-public-pem');
var privateKey = key.exportKey('pkcs1-pem');

fs.openSync('keys/public.pem', 'w');
fs.writeFileSync('keys/public.pem', publicKey, 'utf8');
fs.openSync('keys/private.pem', 'w');
fs.writeFileSync('keys/private.pem', privateKey, 'utf8');
```

Turns out the code to do that was also really simple. I generate the keys using the NodeRSA library - and I can't stress enough how great having the npm registry at your disposal is - and write them out. If you're stepping through your program, you might notice it takes a bit when you step over the `generateKeyPair` line but that's _definitely_ a good thing 😀.

Again, we're using synchronous operations here. The `w`flag on the `openSync` call does the following (again from the fs docs)

> Open file for writing. The file is created (if it does not exist) or truncated (if it exists).

If you try to write to a file that does not exist yet, get ready for some 🔥🔥🔥.

## Encrypt All The Things

That was pretty easy so let's encrypt our file we passed in and write it back to disk. This isn't so different than what we've been doing, so I'll just go ahead and get to the code:

```
var encrypted = key.encrypt(file, 'base64');

fs.openSync('test/encrypted.txt', 'w');
fs.writeFileSync('test/encrypted.txt', encrypted, 'utf8');
```

Simple right?

Now all we have to do is open up terminal and run `node index.js --file=config.json` and it will encrypt our file and write it back out to disk!
I hope this showed you how easy it is to write a script to get things done using Node.js. The simple and well documented Node core libraries along with a [universe of modules](https://anvaka.github.io/allnpmviz3d/) to choose from makes Node.js a great choice for all your scripting needs :)
