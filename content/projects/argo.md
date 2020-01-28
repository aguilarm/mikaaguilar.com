---
title: "Argo"
date: 2017-01-10
lastmod: 2017-10-19
description: "Golang-based CLI tool for managing Kubernetes workloads."
draft: false
repository: "https://github.com/favish/argo"
---

When we made the switch to Kubernetes as a shop at Favish, we needed a way to ease onboarding everyone to the new stack.

Coming from the world of Vagrant where a pre-made virtual machine could be downloaded that included everything you needed,
this tool was created in Golang to automatically install and configure things like Docker and kubectl for use with our
clusters.

At the time, there were a few rough edges involved in interacting with the cluster to get things like database
dumps and files into and out of it. We hoped, and had some success, at sort of hiding these behind a simple abstraction
everyone could use.

We also built this a bit before Helm became common practice, and it ultimately evolved into a homebrewed version of helm.\
So once helm gained traction, we switched over to that and this tool was largely replaced.

A very fun project to build that got pretty well into using Golang for a CLI tool.
