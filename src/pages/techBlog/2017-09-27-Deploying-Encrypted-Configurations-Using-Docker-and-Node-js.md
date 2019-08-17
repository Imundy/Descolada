---
templateKey: tech-blog-post
title: Deploying Encrypted Configurations Using Docker and Node.js
date: 2017-09-27T15:04:10.000Z
featuredpost: false
featuredimage: /img/deploying-encrypted-config-cover.jpg
description: placeholder
tags:
  - node
  - javascript
  - docker
  - encryption
  - configuration management
---

You may know that it’s good to not check your database credentials into Git. Good! Knowing is half the battle right? I’ve found that deploying secure configurations using Docker is actually a straightforward process. (You just search through the 5,000 Docker CLI flags until you find one that looks right?)

Before we get to Docker though, let’s start at the beginning.

## Encrypting Data

When storing production for my Node.js server, I like to use a simple file like `configuration.js`. Some people prefer a json file. It’s really up to you.

```
//config.js
export const config = {
  username: "DarkHelmet",
  password: "12345"
};
```

If I have multiple configurations for different environments, then I’ll use `process.env` to decide which one to export.

```
if (process.env === 'production')
  export productionConfig;
```

Regardless of the file type, I will encrypt it in the same way. The basic idea is: generate a key pair, encrypt the files, and write the encrypted content out. Here’s a gist of something I’ve used that takes advantage of the [node-rsa package](https://www.npmjs.com/package/node-rsa). I like using an npm package instead of an alternative mechanism because it makes it easier to consume later on when decrypting.

[GitHub gist](https://gist.github.com/Imundy/160c551f03b49d7e167cff382c2707cc#file-encrypt-things-js)

```
const NodeRSA = require('node-rsa');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));


const file = fs.readFileSync('data/' + argv.file, 'utf8');
const key = new NodeRSA().generateKeyPair();
const publicKey = key.exportKey('pkcs8-public-pem');
const privateKey = key.exportKey('pkcs1-pem');

fs.openSync('keys/public.pem', 'w');
fs.writeFileSync('keys/public.pem', publicKey, 'utf8');
fs.openSync('keys/private.pem', 'w');
fs.writeFileSync('keys/private.pem', privateKey, 'utf8');

const pub = fs.readFileSync('keys/public.pem', 'utf8');
const private = fs.readFileSync('keys/private.pem', 'utf8');
const publicKey = key.importKey(pub, 'pkcs8-public-pem');
const privateKey = key.importKey(private, 'pkcs1-pem');


const encrypted = key.encrypt(file, 'base64');

fs.openSync('encrypted/production.js', 'w');
fs.writeFileSync('encrypted/production.js', encrypted, 'utf8');
```

## Using the Encrypted Configuration

So how do we consume the configuration in production? Well, as I said, using an npm package makes this _way_ easier. In my case I have a file that looks something like this:

```
import { decrypt } from './decrypt';

const fs = require('fs');
const env = process.env.NODE_ENV;

if (env === 'production' && !fs.existsSync('./production.js')) {
  decrypt();
}

const config = require(`./${env}.js`);
module.exports = config;
```

If we’re running in production, I decrypt the configuration. It’s worth noting that this decryption only happens once — the time at which I import it into my server.js file for use. This is important, because otherwise we’d be running a decryption on every request and that sounds pretty inefficient.

Decrypting things looks pretty similar to the earlier gist using node-rsa.

[GitHub gist](https://gist.github.com/Imundy/b00c05966f70c45fb30f16b068a1c4f0#file-decrypt-things-js)

```
const NodeRSA = require('node-rsa');
const fs = require('fs');

export const decrypt = () => {
  // Read in your private key from wherever you store it
  const file = fs.readFileSync('/keys/private.pem', 'utf8');
  const key = new NodeRSA();
  key.importKey(file, 'pkcs1-pem');

  const encrypted = fs.readFileSync(__dirname + '/encrypted-config', 'utf8');
  const decrypted = key.decrypt(encrypted, 'utf8');

  // name matches ${env}.js
  fs.openSync(__dirname + '/production.js', 'w');
  fs.writeFileSync(__dirname + '/production.js', decrypted, 'utf8');
}
```

## Accessing the Private Key in Docker

How do we access the private key in the Docker container? Obviously if we pushed the key up with our app and deployed it in the container that would kind of defeat the purpose. The solution we’re looking for in Docker is called a [volume](https://docs.docker.com/glossary/?term=volume) — specifically a host volume.

So you’ve uploaded your key to a server somewhere, presumably with scp. Maybe if you’re really cool you’re using puppet or something else to set up your environment with the keys already. We use the volume option to essentially say “use this directory on the host machine as though it was a directory in my container”.

In the cli command this looks like:

```
docker run [some options] -v ~/keys:/in-container/keys
```

Where `keys` is the host directory and in-container is, well, in the container. If you’re using docker-compose you’re pretty cool already and it will look something like:

```
your-app:
  [some options]
  volumes:
    - "~/keys:/in-container/keys"
```

Now the private key is accessible inside our Docker container. That means we can read the file in and decrypt our production settings. You can now push configurations to Git to your ❤️’s content.

Just don’t push your private key — but no one has ever pushed something to Git on accident right?
