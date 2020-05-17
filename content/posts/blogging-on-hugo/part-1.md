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
is the best option. I'm going to guide you through building a blog in this series of posts. Lets start off with the most important question - why.

## The JAMStack :guitar:

Hugo is a static site generator, which is the *M*arkdown bit of the JAMStack. Everyone is *really* jumping on the [JAMStack](https://jamstack.org/) hype train these days,
and there are many good reasons for that. Here are a few:

1. **No server**. In my opinion, the single best reason is that there is no long-running server process to maintain.
This site will effectively *never* go down, and I do not have to worry about scaling for traffic spikes.
1. **Backups are easy**. The site is a collection of normal files that I can save in many different places.
1. **No database**. This can be a downside if you need to scale *content* or do relational lookups, but for a simple blog 
you probably aren't going to need it. One less thing to worry about.
1. **Composable features**. If you want something dynamic, like comments, you can add a mount point to your static template.
Your core site will not go down if your comments go down.

# Hugo's Advantages

I really think Hugo in particular is **the best choice** for a few additional reasons:

1. **Authoring is easy**. I can use any editor that outputs Markdown or HTML to write posts and then I add them to Git
and I'm done. If you aren't a developer, you can use [Forestry.io](https://forestry.io/) to abstract that entire process.
1. **No dependencies**. You can include the binary and have everything you need to build your site locally with a `git clone`. 
Hugo uses a single binary to build your site. No webpack, no dependencies.
1. **Simple templates**. You can use plain HTML for nearly everything and simple Golang formatters when things get complicated.
1. **Built-in functionality catering to blog-style sites**. You will not need to re-invent many wheels using Hugo for a blog.
1. **Truly static output**. Hugo takes your templates and strings them together in plain HTML/CSS/JS. Everything works at rest, 
and there is no runtime.
1. ***Really* Fast**. You will not have speed problems compiling Hugo. My site builds in between 100 and 200ms. Crazy fast compared to most alternatives. Builds will not slow until you have hundreds of thousands of pieces of content, and even then you'll be looking at a couple of minutes most likely.

## Why *Not* Hugo

Hugo isn't perfect, of course. Here are some things to expect, and potentially some reasons to choose a different platform.

1. **Documentation**. The official Hugo docs lay out each component nicely, but don't help you a whole lot with full usage examples. They're complete, but using just the docs is difficult. This was the main reason I decided to write this series.
1. **Variable Discoverability**. Figuring out what is available in your page's current scope is difficult. You're stuck with `printf` debugging or being tied to the docs - there is no breakpoint debugging or IDE auto-completion. Largely Hugo is simple enough for this to be fine, but it's not awesome.
1. **Everything is a file**. There is no database. If you want to add content, it needs to be in the content folder. If you want to style it, a template needs to be in a corresponding layout folder. That's it. Hugo is a publishing platform, and is probably not a good choice for something like a store where you might need lots of relational lookups.

I would be remiss if I didn't discuss these shortcomings, but take them with a grain of salt. There are ways to smooth of many of these rough edges. For me, the advantages of Hugo make it very attractive despite these shortcomings.

With that, let's continue on and build something!