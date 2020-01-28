---
title: "Coral Talk"
date: 2018-05-08
lastmod: 2018-02-26
description: "Open source commenting system I contributed to."
draft: false
repository: "https://github.com/favish/talk-plugin-ckeditor"
---

When we moved a very high traffic client onto Kubernetes, we tried to split up their stack a bit.

The site is largely static, except for comments. So there was definitely an opportunity to save resources if we could
spin off comments into a microservice decoupled from our main Drupal application.

We decided to use [Coral Talk](https://coralproject.net/), and I spent quite a bit of time working on various custom plugins to fit our use-case.\
Many of those remain private repos because they were very specific use cases, but the CKEditor plugin is public.

It was built with a mongodb backend and a React frontend that used GraphQL. It was deployed on a site that regularly has
around 5-8k active users at any moment, and hummed along quite nicely.

I made some issues and [one accepted PR](https://github.com/coralproject/talk/pull/2038) in the process.

