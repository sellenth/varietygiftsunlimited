---
title: "Azure Scale Set VM Pool Tutorial"
date: "2025-10-24"
excerpt: "You'll find this after the official docs fail you."
tags: ["Azure", "Development", "Tools", "Programming"]
readTime: "1 min read"
---

Azure. Scale Set. Pipeline Agent Pool

Did the mere mention send chills down your spine? These things are an absolute chore to set up. I'll assume you're already knee deep and wondering why it's not working. First, your image must be GENERALIZED. Second, you must use UNIFORM orchestration. You won't see meaningful warnings about this ahead of time, only after you waste your time doing it the other ways.

Secondly, instead of using the command line to generlize your image try the Azure UI. Go to your base VM and click the 'Capture Image' button in the Overview. This will give you a generlized option, this is the way.

Thirdly, if you have an existing agent service on that generalized image, your jobs might only get picked up in the name of that original service...

Remember to load balance to give a public IP to your instances. And add an NSG rule to allow your own IP. 