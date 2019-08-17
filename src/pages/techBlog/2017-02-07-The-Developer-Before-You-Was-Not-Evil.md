---
templateKey: tech-blog-post
title: The Developer Before You Was Not Evil
date: 2017-02-07T15:04:10.000Z
featuredpost: false
featuredimage: /img/evil-developer.png
description: Or why you shouldn’t complain too much about old code.
tags:
  - react
  - flux
  - redux
  - javascript
  - reactjs
---

Or why you shouldn’t complain _too much_ about old code.

There is a common class of complaints I hear, especially from newer developers, about the code they are in. They all generally boil down to “old developer was stupid and this code sucks.” Or sometimes they’re more like “We should hunt down old developer and burn then at the stake.” I’m writing this to save old developer from being met with a [terrible fate](https://www.youtube.com/watch?v=vbMQfaG6lo8).

Before going on, I have to confess that I have definitely gone on this rant and still feel myself wanting to complain about old code regularly.

I’m going to try to provide some actionable alternatives instead of just being a crotchety developer telling you to quit complaining. I actually don’t mind hearing people complain. A lot of their complaints are very legitimate and identify bad processes or code patterns, but I believe that this class of complaints is often not constructive.

## Understand Why Old Code Was Bad

![XKCD 1513](/img/xkcd-1513.png)
https://xkcd.com/1513/

“Wow, look at this code it’s terrible. It’s casting X to Y and putting it into a collection of type Z.”

“Why does it do that?”

“I have no idea.”

Generally if you’re looking at code and you have no idea what it does, then you’re missing either context or understanding.

Solving context problems is easy to do assuming you’re using version control like Git. Git blame that code and figure out what it looked like when it was written. Changes over time can transform necessary code into superfluous or downright confusing code. Often times, adding the context of how the output of that function is used elsewhere can help you realize whether it is essential and can help eliminate the class of bugs stemming from “I thought line xx was no longer necessary”.

Missing understanding is a lot more fun in my opinion, because that means we get to learn something new. If you don’t know what a line a of code is doing, then that’s a great time to start googling and figuring it out. If the code is in a critical path of what you are working on, then this is absolutely more important than saving yourself an hour by glossing over the details of the code. If you’re new to the codebase, this could be a pattern you will see in the future, or, even if you’re not new, you might see elements of it reused in the future. Understanding now is a building block for iterating quickly on your next project.

But what if you’re certain that is code is bad?

## Fix Bad Code

This should be a pretty obvious one, but it certainly isn’t easy. If the code you’re looking at is in fact a train wreck, it can be pretty entertaining to watch, but you don’t want to get in there and put the train back together. That’s the hard part. But it will make you grow. Maybe it will even bring you closer to that [mythical 10x developer](https://medium.com/javascript-scene/getting-to-10x-results-what-any-developer-can-learn-from-the-best-54b6c296a5ef).

Leave behind a stream of good code in your wake. Sometimes fixing bad or outdated code is a very quick win. You may even be able to just delete it (in which case it’s probably actually good code).

I’m not telling you to go out of your way and refactor entire projects to get a one hour bug fix out the door. I’m just urging you to halt the encroaching entropy in the codebase so you can hopefully prevent the eventual heat death of all your services.

## Don’t Forget You Might Be Old Developer

Someday your code will be obsolete — probably even deleted. This is one of the reasons you shouldn’t be too hard on the last developer in the code. I have certainly looked at code thinking “what idiot wrote this” only to remember that I am the idiot who wrote it.

This might be one of the places to apply the “junior dev for life” mantra. Hesitate to make judgements on the competency of old developer, and assume good intentions. Yes, sometimes the code is bad and its writer was unskilled because companies can miss on developers — but often times that git blame is going to point towards one of your coworkers. (As an aside use git blame to get context on code, not necessarily to track down the mistakes of all your coworkers).

Assuming that all bad code is a sign of incompetency is a quick way to breed mistrust among developers. “Developer Jack wrote this awful bug in 2012, therefore he must not be very good” is just not healthy. Your coworkers care about writing good code. They aren’t part of some sinister plot to wake you up in the middle of the night 5 years later when something breaks.

Simply put — take everything in stride. Don’t let old, bad code upset you but instead harness it as a learning tool. Instead of learning from your own mistakes, you have a chance to learn from others. And don’t forget to leave open the possibility that old code provides the correct solution — and that the problem may lie only in your own understanding.
