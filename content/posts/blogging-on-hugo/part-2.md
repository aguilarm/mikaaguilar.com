---
title: "Part 2: Setup, Directories, and Content"
date: 2020-05-16
lastmod: 2020-05-17
description: "Quick setup guide, an overview of the various directories we'll use and a short intro to creating content."
pinned: false
draft: false
series: 
  - "Blogging on Hugo"
---

This guide assumes that you aren't going to read *any* of the Hugo docs. I'm totally ok with that - I'll link you to
the parts that I'd otherwise repeat. We'll also be sticking with the *bare minimum* needed to get going with a blog and have a great time. There are plenty of bells and whistles I'll show you in a later section of the guide.

## Step 0 - Installing Hugo

The very first thing you need to do is install the binary. [The docs for this are fine](https://gohugo.io/getting-started/installing/).
After that, create a new empty folder to begin your site. You can `git init` in there if you'd like - you do you.

## Directory Overview

Here's what we're going to cook up:
```bash
├── content
│   └── The raw content files written in Markdown.
├── layouts
│   └── Template files to determine your markup.
├── static
│   └── Plain assets like images or libraries to be served as-is.
├── assets
│   └── Files that will be used and transformed by Hugo, like CSS.
├── docs
│   └── The result of your build.
└── config.toml
```


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

The `/content` directory is where Hugo grabs the raw versions of your stuff that it then inserts into templates.
You can use [quite a few different formats](https://gohugo.io/content-management/formats/). 
I use Markdown or `.md` to quickly write posts.

Each direct child folder of the `/content` directory denotes a different *Type* of content. For example, your blog could have *Projects* and *Posts*, in which case you would have this directory structure:
```bash
└── content
    ├── projects
    │   └── personal-website.md
    └── posts
        └── first-post.md
```

Lets start off by making a post. Add the `posts` directory to your `content` folder, and make a new markdown file in it. Perhaps `first-post.md`?

Here is an example of what the contents of this post could look like:
```yaml
---
title: "First Post!"
date: 2020-05-17
lastmod: 2020-05-17
description: "The very first post in my new blog."
pinned: false
---

These days, you have to start somewhere. I've decided to start here.
Everything down here is, in fact, *markdown*.

```

Hugo uses a concept called [front matter](https://gohugo.io/content-management/front-matter/) 
to define your content's metadata - the title, date, tags, etc. In my examle, I've used
YAML as the format of my front matter section. You can use JSON or TOML to format your front matter instead if you'd like. I don't mind YAML here because it's terse.  
Everything after that is parsed as markdown.

You can find a full list of the predefined variables you can use in Front Matter definitions [in the docs](https://gohugo.io/content-management/front-matter/).

Keep in mind that you can add arbitrary values here and access them in templates via the `.Params` value.
In this example, I've defined the additional `pinned` value. More on that later.

Boom! You've got a post. Awesome. Next we'll have to make some templates to display it.

