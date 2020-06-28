---
title: "Part 1: Why Hugo"
date: 2020-04-11
lastmod: 2020-05-17
description: "Before you get started, make sure you know *why* you're choosing Hugo."
pinned: false
draft: false
series: 
  - "Blogging on Hugo"
---

This site is running Hugo with GitHub pages, and I am really happy with the setup.
There are a *lot* of options for spinning up a personal blog site, and I really think building with Hugo
is the best option.  
I'm going to guide you through building a blog with it in this series of posts.  
Lets start off with the most important question - why.

## The JAMStack :guitar:

Hugo is a static site generator, which is the *M*arkdown bit of the JAMStack. Everyone is *really* jumping on the [JAMStack](https://jamstack.org/) hype train these days,
and there are many good reasons for that. Here are a few:

1. **No server**. In my opinion, the single best reason is that there is no long-running server process to maintain.
This site will effectively *never* go down, and I do not have to worry about scaling for traffic spikes.
1. **Backups are easy**. The site is a collection of normal files that I can save in many different places.
1. **No database**. This can be a downside if you need to scale *content* or do relational lookups, but for a simple blog 
with 10s or 100s of posts, you will likely be ok. One less running process.
1. **Composable features**. If you want something dynamic, like comments, you can add a mount point to your static template, and 
use Javascript. Your core site will not go down if your comments (or another add-on service) go down.

# Hugo's Advantages

I really think Hugo in particular is **the best choice** to build a personal blog for a few additional reasons:

1. **Authoring is easy**. I can use any editor that outputs Markdown or HTML to write posts and then I add them to Git
and I'm done. If you aren't a developer, you can use [Forestry.io](https://forestry.io/) to abstract that entire process.
1. **No dependencies**. You can include the hugo binary and have everything you need to build your site locally with a `git clone`. 
Hugo uses a single binary to build your site, that's it.
1. **Simple templates**. You can use plain HTML for nearly everything and simple Golang templating functions when things get complicated.
1. **Built-in functionality catering to blog-style sites**. You will not need to re-invent many wheels using Hugo for a blog.
1. **Truly static output**. Hugo takes your templates and strings them together in plain HTML/CSS/JS. Everything works at rest, 
and there is no runtime.
1. ***Really* Fast**. You will not have speed problems compiling Hugo. My site builds in between 100 and 200ms. Crazy fast compared to most alternatives. Builds will not slow until you have hundreds of thousands of pieces of content, and even then you'll be looking at a couple of minutes most likely.

## Why *Not* Hugo

Hugo isn't perfect, of course. Here are some things to expect, and potentially some reasons to choose a different platform.

1. **Documentation**. The official Hugo docs lay out each component nicely, but don't help you a whole lot with full usage examples. They're complete, but using just the docs is difficult. This was the main reason I decided to write this series.
1. **Variable Discoverability**. Figuring out what is available in your page's current scope is difficult. You're stuck with effectively `printf` debugging or being tied to the docs - there is no breakpoint debugging or IDE auto-completion. Largely Hugo is simple enough for this to be fine, but it's certainly more difficult than alternatives.
1. **Everything is a file**. There is no database. If you want to add content, it needs to be in the content folder. If you want to style it, a template needs to be in a corresponding layout folder. That's it. Coming from dynamic database-backed CMS's this can be a little weird.

For me, the advantages of Hugo make it very attractive despite these shortcomings.

With that, let's continue on and build something!