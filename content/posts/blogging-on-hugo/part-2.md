---
title: "Part 2: Setup and Directory Structure"
date: 2020-04-11
lastmod: 2020-05-16
description: "Build your site's basic structure."
pinned: false
draft: false
series: 
  - "Blogging on Hugo"
---

We're going to start from zero and arm you with the key points you'll need to get started building a nice blog in Hugo.
I wrote this site nearly from scratch from the base template on up but it was not a huge lift.

This guide assumes that you aren't going to read *any* of the Hugo docs. I'm totally ok with that, I'll link you to
the parts that I'd otherwise repeat.

The very first thing you need to do is install the binary. [The docs for this are fine](https://gohugo.io/getting-started/installing/).
After that, create a new empty folder to begin your site. You can `git init` in there if you'd like - you do you.

You need ~4 directories and a configuration file to get Hugo fired up and doing something useful.

## Configuration

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

## Content

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

## Layouts

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

