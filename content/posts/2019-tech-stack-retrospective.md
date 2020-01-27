---
title: "2019 Retrospective"
date: 2019-12-24T17:10:08-06:00
lastmod: 2019-12-29T17:10:08-06:00
description: "This past year my tech stack saw some exciting changes. We fully embraced React Hooks, Typescript and GraphQL."
draft: false
---

This past year my tech stack saw some exciting changes. We fully embraced React Hooks, Typescript and GraphQL. We poked around the JAMStack and built a fairly large NextJS application. That was a real pivot from the primarily Drupal based projects we've done before. While we're still using Drupal as a headless CMS, we have ditched the entire front-end of it. Server-wise, Kubernetes and Docker have remained a nice constant this year with a year perhaps defined by stability while the tech reached maturity.

What Did I Do?
--------------

As 2019 dawned on the world, we were starting a new greenfield project. I had the opportunity to jump out of tuning our Kubernetes workloads and try to get a feel for what was going on in the front-end space. The biggest rumblings seemed to be around the 'JAMStack' (Javascript, APIs, and Markup) which promised to allow you to ditch long running server processes. Having spent most of the last two years tweaking such processes, that sounded awesome. Even though I felt I was pretty good at wrangling the little beasts into happily humming along, I was definitely hoping that eventually we could move to something a little simpler to maintain.

My new project, however, was planned to be providing lots of dynamic content that varied heavily depending on what user was viewing it. So, [while I gave Gatsby a shot](https://www.mikaaguilar.com/posts/building-decoupled-drupal-sites-2019), I moved to NextJS to power this project, with a headless Drupal CMS hooked up to it via GraphQL through [Apollo](https://www.apollographql.com/). We added typescript to this project as well. In the process of adding Typescript, I used [ESLint](https://eslint.org/) and added [Husky](https://github.com/typicode/husky) for pre-commit validation as well as [Prettier](https://prettier.io/) to keep code looking the same. I decided to stick with SASS for CSS.

It's been quite nice to work in this stack. Typescript and ESLint with Prettifier have enormously improved our code readability and stability. Using React for all of our front-end is a lot more consistent than the half Drupal php/twig templates with a bit of JS sprinkled around. With React everywhere, we have access to a massive library of open source UI component implementations that speed development. It's also generally more accessible to engineers than twig templates in PHP. GraphQL is nice to consume on the front-end and we've moved nearly all of the code-based interaction with Drupal behind it.

We've had some paper-cuts using this, and I would be remiss not to point some of those out. Firstly, I've not been able to tune Apollo client side caching nicely and the methods for managing it feel a bit clunky. Webpack is powering this and it's _still_ a real awkward abstraction with a large amount of configuration holding us together though it has improved a bit as the year progressed. Overall, however, I would say this setup was a net-positive. So what do I hope to do different in 2020?

Whats Next?
-----------

There appears to be a new kid on the block, called [Svelte](https://svelte.dev/). I've done just a bit of poking around with it, and the code you actually write using it is super duper simple. It's wildly efficient computationally as well, double win! I am 100% on the hype train for this one but there is definitely more I need to consider about it. I hope to build something with it this coming year to give it a shot.

It is also starting to feel like we're going to use something besides Drupal as our CMS this year. Things like [Hasura](https://hasura.io/) and [Graphile](https://www.graphile.org/) are candidates, which introspect a Postgres database to output GraphQL schema from it. Those might be a bit too spartan, but we're toying around with them now. [Netlify CMS](https://www.netlifycms.org/) or [TinaCMS](https://tinacms.org/) and many other JAMStack focused offerings are extra attractive because we can ultimately serve plain old flat files. [Sapper](https://sapper.svelte.dev/) uses Svelte and that's cool.

The server side situation this year was really static. Nothing big changed. This next year I expect we'll still be running Kubernetes workloads but we may ascend to flat files and perhaps even short running processes commonly known as 'serverless.'

I'm excited about how this last year went and even more excited about what could be coming up in 2020.
 

