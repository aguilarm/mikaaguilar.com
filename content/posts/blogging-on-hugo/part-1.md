---
title: "Part 1: Why Hugo"
date: 2020-04-11
lastmod: 2020-05-16
description: "Before you get started, make sure you know *why* you're choosing Hugo."
pinned: false
draft: false
series: 
  - "Blogging on Hugo"
---

This site is running Hugo with GitHub pages, and I am really happy with the setup.
There are a *lot* of options for spinning up a personal blog site, and I really think building with Hugo
is the best option. I'm going to guide you through building a blog in this series of posts. Lets start off with the most important question - why.

Hugo is a static site generator. Everyone is **really** jumping on the static+serverless/JAMStack hype train these days,
and there are many good reasons for that. Here are a few:

1. **No server**. In my opinion, the single best reason is that there is no long-running server process to maintain.
This site will effectively *never* go down, and I do not have to worry about scaling for traffic spikes.
1. **Backups are easy**. The site is a collection of normal files that I can save in many different places.
1. **No database**. This can be a downside if you need to scale *content* or do relational lookups, but for a simple blog 
you probably aren't going to need it. One less thing to worry about.
1. **Composable features**. If you want something dynamic, like comments, you can add a mount point to your static template.
Your core site will not go down if your comments go down.

I really think Hugo in particular is **the best choice** for a few additional reasons:

1. **Authoring is easy**. I can use any editor that outputs Markdown or HTML to write posts and then I add them to Git
and I'm done. If you aren't a developer, you can use [Forestry.io](https://forestry.io/) to abstract that entire process.
1. **No dependencies**. You can include the binary and have everything you need to build your site locally with a `git clone`. 
Hugo uses a single binary to build your site. No webpack, no dependencies.
1. **Simple templates**. You can use plain HTML for nearly everything and simple Golang formatters when things get complicated.
1. **Built-in functionality catering to blog-style sites**. You will not need to re-invent many wheels using Hugo for a blog.
1. **Truly static output**. Hugo takes your templates and strings them together in plain HTML/CSS/JS. Everything works at rest, 
and there is no runtime.

One downside of Hugo is the documentation. It was difficult for me to see the forest for the trees combing through the
Hugo docs. I wanted to start at zero and build up into a blog, adding only the bits I would definitely be using and that
was tough. The Quick Start portion of the docs is fair too quick, and Basic Usage doesn't get you far enough to get going.

Hopefully this series will make that easier for you 😅.

