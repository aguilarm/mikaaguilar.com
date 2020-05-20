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

At the very top of your site is the `layouts/default/baseof.html`. This includes the outer shell of your site starting from the `<html>` element. Here is a minimal example I pulled from the docs:

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

In this first example you see some block definitions. These are little holes where child layouts can optionally add their own markup. Lets see that in action by creating a default single content item template.

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

Now we're cooking with some variables. Hugo uses [golang's template package](https://golang.org/pkg/text/template/) with some additional sugar to populate these template files.

If you've not yet encountered it before, there are a couple of things to note.
 
First, You'll see that all of the called variables have a `.` in front of them. This represents the current scope object. In Hugo, you can always reach back up to the global scope by using a `$` - ex `$.Site.Pages` will work no matter where you place it.

Additionally, you can run things through functions which have a kind of lisp-y format of nested parenthesis. Keep with it on these - the syntax is likely pretty unfamiliar but you'll eventually have no trouble making sense of things. Ultimately it is generally quite simple.

Speaking of functions, you'll likely need one for our next page - this list layout.

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

Alright, getting a little fancy now. We've got some `range` usages and an example of a pipe function call with `range .Pages | complement $pinned`.