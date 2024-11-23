---
templateKey: tech-blog-post
title: Effective Technical Leads
date: 2024-11-22T15:04:10.000Z
featuredpost: true
featuredimage: /img/effective-technical-leads.jpg
description: Lessons learned from building teams from the ground up
tags:
  - web development
  - javascript
  - front end development
  - app development
  - programming
---

_This post can also be read on my [medium blog](https://medium.com/@ian.mundy/effective-technical-leads-43bf15a1c7b7)._

![Effective Techical Leads](/img/effective-technical-leads.jpg)

If you stick around a team long enough, you start to become the person who knows a lot about a technical stack. As many of us have learned, sometimes “knows a lot” is code for “the last person who touched this repository”. It can be overwhelming to be in the position at first as you begin to balance answering questions from junior engineers with actually getting your own work done. Then, one day, you wake up and you’re a technical lead. Congratulations! But what does it mean? How do you go from just being the person who “knows a lot” to the person who is guiding the technical development of a project for several engineers?

The first step is trusting your team to get work done. You may think that you could do it faster yourself and you are probably right—after all, that’s why they made you the technical lead. But this is not technical lead thinking. Someday the engineers on your team can develop into your own present level of effectiveness, and it is your job to help get them there. This frees you to start thinking at a higher level of abstraction: you can analyze the system as a whole. But how do you help those engineers you lead develop? That is what I hope to cover and help with below.

# A Spectrum of Engineers

I am going to generalize here a bit, which, of course, can be bad. Each engineer on your team is an individual with specific skills and you should definitely approach them all as individuals.

However, the I want to present what is hopefully a useful spectrum that I have seen engineers fall on over the years. On one side of this spectrum is confidence and on the other side is hesitance. I want to be clear that neither side is inherently good or bad. I have witnessed the tendency to reward confidence where a cautious approach is more appropriate. I worked in Payments for many years and I understand that engineers working on the flow of money for a business should have a healthy respect for the consequences of their design choices and implementations. Good engineers develop qualities of both, forging ahead with decisions once they have adequately contemplated the alternatives.

## Hesitant Engineers

Watch out for: Starting Block problems, Wheel Spinning, Lack of Sharing

Hesitant engineers are those who want to make sure they have everything solved before they are comfortable submitting a PR. This can take two forms that I have noticed. One is a starting block problem, where they keep coming back to ask questions before getting started. This isn’t always an issue (asking questions is good! especially for new engineers) but can lead problems getting started at all, or sometimes just getting started too slowly. As hesitant engineers become more effective over time, this problem magnifies as they don’t actually need to ask the questions.

There is a somewhat simple answer to this problem though: tell them to go figure it out. To be clear I am not saying that you should not help them, but instead you should recognize when they already know the answer. You can say something like “I think this will work like thing X you worked on before” and then send them off to work on it. The key here is that you, as the technical lead and expert, may be a better judge of their technical expertise than they are.

The goal here is to make hesitant engineers more comfortable dealing with ambiguity. This will also help with the problem of wheel spinning, where these engineers get stuck at a penultimate step. Often, they will get stuck at this point because they realize that they have reached what feels like a sub-optimal solution and they are sure that there is some key piece of knowledge they are missing. While this is occasionally true, I have found it is helpful to encourage these engineers that they are smart and you are comfortable documenting the gaps and moving on. I also am very comfortable sharing my thought process in these instances to show that I do not have all of the answers. I want to demystify the role of the technical lead: I am here for technical expertise, but I have no crystal ball to gaze into.

Finally, I have found that these engineers are sometimes also reluctant to share their work or take the lead in technical conversations. This can come from a belief that they are still learning and not ready for that role. I will mention this later on, but put your team members on the spot where appropriate. Encourage them to demo their work. Call out their successes with things like “you worked on a really complex problem, do you want to describe it to the team?” This boils down to a basic tenet of leadership, which is that you should recognize good work and give it the credit that it deserves.

I have seen extremely hesitant engineers grow into well rounded technical leads. This is not to say that something fundamental changed about their personality. They still bring all their natural traits of caution and inquisitiveness that helped them develop, but they understand that not all questions can be answered in a satisfying manner. As a result, they become comfortable offering their technical contributions to others without the safety blanket of 100% provable confidence in its correctness.

## Confident Engineers

Watch out for: frustration, shortcuts, overcomplication

On the other hand, some engineers come in ready to tackle the world’s problem. And truthfully, nothing will make your life easier than a mid-level or senior engineer who has the knowledge and expertise to back up that confidence.

However, sometimes the confidence is unwarranted (yet). We all need time to learn a new codebase even when we have a lot of experience. From my experience, new engineers who ask absolutely no questions are usually missing some things. The risk is that these misses will lead to eventual frustration arising out of repeated ask to redo some bit of work. I’ve seen this be a wholesale rejection of a PR due to an approach that won’t work at all, or even having to roll something back that went in when I have been out. And I understand that frustration. No one wants to redo work.

Overconfidence can also lead to both shortcuts and overcomplication in engineering tasks. These emerge from engineers assuming the solution that they have landed on is the best one. You want to empower your team to make decisions without you being involved in every step, yet you need to be sure that those decisions are taking the stack in the right direction.

The first solution to this is a simple one: encourage your engineers to ask questions. (Note that this is also something you should be encouraging younger engineers like interns to do, but for the different reason that they may think asking questions makes them look like they don’t know what they are doing). This also means being available to your team, which can be difficult. Use your daily stand up, if you have one, to encourage them to chat with you about the technical decisions they are making. There’s usually something interesting in those updates and it also makes standup less of a burden.

You can also give these engineers “homework” in a sense. This is not unnecessary work. They want to go solve problems on their own and you should encourage that. Instead you are doing some up front work to identify what you expect to be the difficult technical aspects of their project and prompting them with a “let me know what you decide/think”. Then, when they come back to you, there is an opportunity to discuss and make sure that things are headed in the right direction. And there is a chance to impart some of the expertise that you have developed as a technical lead.

If you are a team that writes technical documents (and everyone should be, though that is an article for a different day), then encourage one pagers as well. The point isn’t to slow down your engineers. The point is to make sure that sufficient thought is given to complex decisions. At Google, one of our tenants was “respect the opportunity” because the software we wrote had the potential to serve billions of users. The opportunity to meet your user’s needs is one that deserves the appropriate thought and, by extension, the appropriate respect.

Finally, like hesitant engineers, sharing in the right forum can be extremely valuable for confident engineers too. This gives not only you a chance to provide input, but also other engineers a chance to offer their perspective. When done right, this fosters a culture of bouncing ideas off of your peers and grows the collective knowledge of the group. It also helps prevent decisions from being made in silos, which can be a risk when one person is forging ahead on their own.

# Sharing Forums

I mentioned above that having forums for your team to share is important. Often the most common team meetings, like stand ups, demo days, and status meetings are poor places to share more informal engineering discussions. What I have seen work very well is to have a single meeting for your team each week that is just for the engineers — no project management stakeholders—can help create a place to start building a collaborative culture.

At the beginning, this meeting will likely be primarily a place for you as the tech lead to share. You can take conversations you’ve had with individual engineers through the week and share that knowledge with the entire team. As the meetings develop, you can also encourage other engineers on your team to discuss problems that they have solved. Importantly, while you can also do demos in this meeting, this allows your team to discuss difficult problems they have solved that don’t translate to a demo. When doe right, this should help your team turn individual knowledge into communal knowledge. Your team will remember who worked on particular projects and be able to go to them when they hit similar issues in the future.

Importantly, if you don’t know the answer to a question, this can also be a good informal place to raise the discussion (if the meeting is coming up soon). While you are the expert as the lead, this can also help your team realize that they are building their own expertise and that they can rely on each other as well. At the same time, you get to provide the thousand foot view guidance on how your APIs and the like should be structured. In short everyone wins.

---

I am always happy to consult on career growth in engineering and how to build effective teams! Reach out to me@ianmundy.com if you would like to set something up.
