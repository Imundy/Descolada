---
templateKey: tech-blog-post
title: Audio Mixing on iOS
date: 2017-12-28T15:04:10.000Z
featuredpost: false
featuredimage: /img/audio-mixing-ios-cover.jpg
description: Using AVAudioEngine to make cool things
tags:
  - audio
  - ios
  - react native
  - programming
  - swift
---

While working on a React Native app recently, I discovered a need to drop down and write some native code for audio processing. I had what I thought was a straightforward goal: layer two audio tracks over each other.

Having roughly zero familiarity with iOS development, I had no idea where to start. I tried a lot of things before I discovered AVAudioEngine — but it’s what I was looking for all along. This elegant interface turned a lot of time looking at dated and complicated sample code into a few lines of what felt like magic.

I’ll be using examples in Swift here because _wow_ do I like it a lot more than Objective C. #opinions

## What is AVAudioEngine?

From the apple [docs](https://developer.apple.com/documentation/avfoundation/avaudioengine):

> A group of connected audio node objects used to generate and process audio signals and perform audio input and output.

Which is all you need to know right? 🖐🎤

But that really is a very good description of what’s going on. We create an `AVAudioEngine` and connect a bunch of nodes to it that inherit from `AVAudioNode`. These nodes could be reading from files, or from buffers of Audio data. They could also be effects or mixer nodes. There’s a world of possibilities.

### What about CoreAudio and AUGraph?

Good question. A lot of the canonical audio work done on iOS has been through the old and robust CoreAudio framework. However, with the expansion and improvements to `AVAudioEngine` and the [impending deprecation](https://stackoverflow.com/questions/44952582/is-augraph-being-deprecated-on-ios-if-so-when) of CoreAudio in 2018, it seems that `AVAudioEngine` is the way to go if you’re writing new audio code today.

## Example: Playing multiple tracks

First I’ll give a block of code and then I’ll break down the example.

[GitHub gist](https://gist.github.com/Imundy/e1a11f93d36a64f0c620ea63967411b2#file-avaudioengineexample-swift)

```
private var audioFiles: Array<String>
private var audioEngine: AVAudioEngine = AVAudioEngine()
private var mixer: AVAudioMixerNode = AVAudioMixerNode()

func Play() {
    // do work in a background thread
    DispatchQueue.global(qos: .background).async {
      self.audioEngine.attach(self.mixer)
      self.audioEngine.connect(self.mixer, to: self.audioEngine.outputNode, format: nil)
      // !important - start the engine *before* setting up the player nodes
      try! self.audioEngine.start()

      let fileManager = FileManager.default
      for audioFile in self.audioFiles {
        // Create and attach the audioPlayer node for this file
        let audioPlayer = AVAudioPlayerNode()
        self.audioEngine.attach(audioPlayer)
        // Notice the output is the mixer in this case
        self.audioEngine.connect(audioPlayer, to: self.mixer, format: nil)
        let fileUrl = NSURL.init(fileURLWithPath: fileName.removingPercentEncoding!)
        var file : AVAudioFile

        // We should probably check if the file exists here ¯\_(ツ)_/¯
        try! AVAudioFile.init(forReading: fileUrl.absoluteURL!)

        audioPlayer.scheduleFile(file, at: nil, completionHandler: nil)
        audioPlayer.play(at: nil)
      }
    }
  }
```

Notice that this really isn’t a lot of code for doing audio mixing — a non-trivial task. (Part of that is because I’ve foregone any error handling but still).

Now a text explanation of that gist.

Starting with our initialized AVAudioEngine, we connect an `AVAudioMixerNode` to the engine with its output set to the output of the audioEngine. By default this is going to play sound from the device, but, of course, it could also connect to other nodes. After the mixer is connect, we create an `AVAudioPlayerNode` for each file and connect those outputs to the mixer. The file urls are then used to create `AVAudioFile` objects that can be scheduled to play through an `AVAudioPlayerNode`(This isn’t very robust handling of file URLs).

Notice that this also handles the messy work of dealing with codecs and sample rates without us needing to worry about any of that. If you’ve manually up or downsampled audio to mix, then you’ll know that this avoids some serious work.

Some small “gotchas”:

- It’s important to start the engine _before_ you try to schedule any files to play.
- PLEASE do your work in a background thread. :)
- If you want to play a file a second time, then you need to schedule it again. If you’re looking to loop audio, it may make sense to load the file into a buffer (which has options via `scheduleBuffer`) or deal with it in the completionHandler
- If you do decide to schedule buffers, you may experience a delay if you decide to load a large file into memory that you won’t see when directly scheduling the file.

### Syncing Audio File Playback

I wanted to mention that I came across [the last answer in this thread](https://forums.developer.apple.com/thread/14138) when looking for how to make sure my audio files started in perfect sync. It seems to work well for me doing something like:

```
if startFramePosition == nil {
audioPlayer.play(at: nil)
 startFramePosition = (audioPlayer.lastRenderTime?.sampleTime)!
startTime = AVAudioTime.init(sampleTime: startFramePosition!, atRate: Double(self.mixer.rate))
} else {
audioPlayer.play(at: startTime!)
}
```

That answer also had another suggestion:

> If you really wanna be sure that you have a perfect sync just use your favorite cd-ripped song.wav in 44.1kHz/16bit.
> Make a copy of it and load it into an audio editor, inverse the phase and save it as is now.
> When you now schedule both version at exactly the same startTime (and of course with the same volume/pan settings) you will hear — SILENCE…

Which if you’ve worked with audio makes sense, but is still pretty cool 😎. One of the things I love about working with audio is the great mathematical properties of it!

---

Thanks for reading! Did I miss anything? Have any other examples of cool and elegant things you can do with `AVAudioEngine`? Let me know! I’m always on the hunt to learn more.
