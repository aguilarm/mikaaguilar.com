---
title: "Blogging on Hugo"
date: 2020-04-11
lastmod: 2020-04-11
description: "How to build and host a dead-simple blog using Hugo and GitHub pages."
pinned: false
draft: false
---

This site is running Hugo with GitHub pages, and I am really happy with the setup.
There are a *lot* of options for spinning up a personal blog site, and I really think building with Hugo
is the best option.

## Why Hugo

Hugo is a static site generator. Everyone is **really** jumping on the static+serverless or JAMStack hype train these days,
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
Hopefully this post will make that easier for you 😅.

## Building a Blog

Ok. I'm going to start from zero and arm you with the key points you'll need to get started building a nice blog in Hugo.
I wrote this site nearly from scratch from the base template on up but it was not a huge lift.

This guide assumes that you aren't going to read *any* of the Hugo docs. I'm totally ok with that, I'll link you to
the parts that I'd otherwise repeat.

### Getting Started

Ok. Very first thing you need to do is install the binary. [Docs for this are fine](https://gohugo.io/getting-started/installing/).
After that, create a new empty folder to begin your site. You can `git init` in there if you'd like - you do you.

You need ~4 directories and a configuration file to get Hugo fired up and doing something useful.

#### Configuration

Here is a really minimal configuration file.
Change the relevant values and you can save this in your new directory as `config.toml`:

```TOML
baseURL = "https://www.example.com/"
title = "Example"
publishDir = "docs"
```
I recommend changing the publishDir to `docs` (it's default is `public`), because later you'll be hooking this up to GitHub pages and that directory
will be your public dir.
There are *tons* more options if you need them [in the docs](https://gohugo.io/getting-started/configuration/). 
You can also have a look at [my config on github](https://github.com/aguilarm/mikaaguilar.com/blob/master/config.toml) for more options.  
Anyway, moving on.

#### Content

Next up, I think you should make at least once piece of content so the templates you build later can have things on them.
So, go ahead and `mkdir -p /content/posts` and then create a new post in there. Maybe `first-post.md`?

The `/content` directory is where Hugo grabs the raw versions of your stuff that it then inserts into templates.
You can use [quite a few different formats](https://gohugo.io/content-management/formats/). 
I use Markdown or `.md` to quickly write posts.

Hugo uses a concept called [front matter](https://gohugo.io/content-management/front-matter/) 
to define your content's metadata - the title, date, tags, etc.
Here is the front matter for this post:

```yaml
---
title: "Blogging on Hugo"
date: 2020-04-11
lastmod: 2020-04-11
description: "How to build and host a dead-simple blog using Hugo and GitHub pages."
pinned: false
draft: false
---
```

You can find a full list of the predefined variables [in the docs](https://gohugo.io/content-management/front-matter/).
Keep in mind that you can add arbitrary values here and access them in templates via the `.Params` value.
In this example, I've defined the additional `pinned` value. More on that later.

After the final `---`, you can add your Markdown content. 
[Check out the markdown for this post as an example](https://github.com/aguilarm/mikaaguilar.com/blob/master/content/posts/blogging-on-hugo.md).

Boom! You've got a post. Awesome.

#### Layouts

Next you'll need some templates to render your new content. Hugo templates exist in the `/layouts` directory. 
[The docs for the base templates](https://gohugo.io/templates/base/) are pretty good, but I'll give a quick rundown from top to bottom here.

At the very top of your site is the `layouts/default/baseof.html`. Here is a minimal example I pulled from the docs:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ block "title" . }}
      <!-- Blocks may include default content. -->
      {{ .Site.Title }}
    {{ end }}</title>
  </head>
  <body>
    <!-- Code that all your templates share, like a header -->
    {{ block "main" . }}
      <!-- The part of the page that begins to differ between templates -->
    {{ end }}
    {{ block "footer" . }}
    <!-- More shared code, perhaps a footer but that can be overridden if need be  -->
    {{ end }}
  </body>
</html>
```

**That's all for now. This post is a work in progress. I intend to have more soon!**
