---
title: "Part 3: Layouts"
date: 2020-05-17
description: "Overview of how layouts and templating work in Hugo."
pinned: false
draft: false
series: 
  - "Blogging on Hugo"
---

You'll need some templates to render your new content. Hugo templates exist in the `/layouts` directory. 
[The docs for the base templates](https://gohugo.io/templates/base/) are decent, but I'll give a quick rundown from top to bottom.

## Baseof

At the very top of your site is the `layouts/default/baseof.html`. This includes the outer shell of your site 
starting from the `<html>` element. Here is a minimal example I pulled from the docs:

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

Anything that you need on your entire site, like styles or javascript, should go here.  

## Blocks

You may notice the block definitions above - `title`, `main`, and `footer`.
These are little holes where child layouts can optionally add their own markup. 
Lets see that in action by creating a default single content item template.

Make a new file at `layouts/default/single.html` and add these contents to it:
```html
{{ define "title" }}
    .Title
{{ end }}

{{ define "main" }}
<article class="post-container">
    <header class="post-header">
        <h1><a href="{{ .RelPermalink }}">{{ .Title }}</a></h1>
        <div class="post-date post-published">
            {{ .Date.Format "January 2, 2006" }}
        </div>
        <div class="post-date post-last-updated">
            Updated {{ .Lastmod.Format "January 2, 2006" }}
        </div>
    </header>
    <div class="article-body">
        {{ .Content }}
    </div>
</article>
{{ end }}
```

This template will insert the items wrapped in the `define` chunks into corresponding blocks.
So, in the `baseof` above, the content of `single.html` will be printed in `title` and `main`.

## Variables, Partials and Context

Hugo uses [golang's template package](https://golang.org/pkg/text/template/) with some additional 
sugar to populate these template files. You can use most of the template functions in Hugo, so the golang
docs may be useful when you're doing something difficult.

If you've not yet encountered it before, there are a couple of things to note.
 
First, You'll see that all of the called variables have a `.` in front of them. 
This represents the current scope object - called context in golang.
On things like `partials`, which I'll explain next, you can
optionally pass a smaller scope in from your parent page. Lets check that out.

On my site, I've created a `partials/header.html` to keep the `baseof` concise and concerned only with overall page structure. 
It looks like this:
```html
<header class="site-header">
    <div class="branding">
        <a class="brand-logo" href="/">
            <img alt="Mika Aguilar's Logo" src="/images/logo.svg"/>
        </a>
        <div class="brand-text">
            <a class="brand-text--site-name" href="/" rel="home" title="Home">
                {{ .Site.Title }}
            </a>
            <div class="brand-text--site-tag-line">
                {{ .Site.Params.TagLine }}
            </div>
        </div>
    </div>
    {{ partial "navigation.html" . }}
</header>
```

When I use it, I add `{{ partial "header.html" . }}` wherever I want my header to show up.  
Since I only actually use variables in `.Site`, I could switch usages to `{{ partial "header.html" .Site }}`. I'd
also be able to switch things like `{{ .Site.Title }}` to `{{ .Title }}`. I don't think that makes it much more clean or easier
to grok, so I'm passing in the full context.

You may also notice that I've used the `navigation.html` partial inside of the header partial. You can use partials or blocks
in any template you want! I re-use navigation in the footer. I've created most of this to play around with
partials and would probably copy/paste the navigation usages mostly because they're styled a bit differently.

A final note on scope/context in Hugo: you can always reach back up to the global scope by using a `$` - ex `$.Site.Pages` 
will work no matter where you place it.

## Functions and Lists

In Hugo, you can run things through functions which have a kind of lisp-y format of nested calls. 
The syntax is may be pretty unfamiliar but you'll eventually have no trouble making sense of things. 
Usually you can keep things pretty simple by combining appropriate functions.

We'll use a couple on our next page - the list layout.

Create a new file at `/content/layouts/_default/list.html` and populate it with this:
```html
{{ define "main" }}
<main>
    <header class="list-header">
        <h1>{{ .Title }}</h1>
    </header>
    {{ $pinned := where .Pages.ByLastmod ".Params.pinned" "==" true }}
    {{ if $pinned }}
    <section class="list-pinned-container">
        <ul class="list-pinned">
            {{ range $pinned }}
            <li class="list-pinned-item">
                <a class="list-item-title" href="{{ .RelPermalink }}">{{ .Title }}</a>
                <div class="list-item-description">{{ .Description }}</div>
            </li>
            {{ end }}
        </ul>
    </section>
    {{ end }}
    <ul class="list">
        {{ range .Pages | complement $pinned }}
        <li class="list-item">
            <div class="list-item-date">{{ .Date.Format "Jan 2, 2006" }}</div>
            <a class="list-item-title" href="{{ .RelPermalink }}">{{ .Title }}</a>
            <div class="list-item-description">{{ .Description }}</div>
        </li>
        {{ end }}
    </ul>
</main>
{{ end }}
```

Alright, things are getting a little fancy now. We've got some `range` usages and an example of a pipe function call with 
`range .Pages | complement $pinned`. Complement is an easy way to remove one array's elements from another. In this
case we'll loop all of the Pages that are not pinned.

There are lots of handy functions in Hugo like `complement` and you should give the [functions page](https://gohugo.io/categories/functions) a scroll when you're
trying to do something that gets a little out of hand in a template. There is probably a shorter way to do it.

For pagination, you get something use-able out of the box with a usage that looks like this:

```html
{{ template "_internal/pagination.html" . }}
{{ range .Paginator.Pages }}
   {{ .Title }}
{{ end }}
```

There is a lot of magic happening there. If you need or want to dig in and make some custom pagination, check out
[this great post](https://glennmccomb.com/articles/how-to-build-custom-hugo-pagination/) for a really nice rundown. I'd
go into it more, but it is demonstrably a post in itself :smile:.

## Internal Templates

You may have noticed that pagination used an [`_internal` template](https://gohugo.io/templates/internal). Hugo comes
with some easy to add little extras. The most important ones that I use are probably the Open Graph and Twitter Card
meta tag templates which will handle those for you based on your content. There's also Google Analytics and Disqus.

## Conclusion and Next Steps

With a few templates, Hugo can get you started with a full site that you can start making content for. 
These represent the meat and potatoes of Hugo and the final part of my series.

You'll need to get your preferred type of CSS added, as well as a bit of Javascript. These can be done with
[Hugo Pipes](https://gohugo.io/hugo-pipes/). If you add anything sufficiently complicated (like custom React components), 
it may be worth a separate build process that outputs artifacts for Hugo to include as though they were regular files. 
I've found that pipes are great for simple things but are not really appropriate for scaling anything complicated.

To get your site hosted, which you can do very easily (and for free) with [Github Pages](https://pages.github.com/).
Use the `docs` folder approach and either manually build hugo or give something like [Github Actions](https://github.com/features/actions) 
to automatically run hugo after you push.