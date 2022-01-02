---
title: "2020/21 Retrospective"
date: 2021-12-31T17:10:08-06:00
lastmod: 2021-12-31T17:10:08-06:00
description: "What did I do and what am I looking forward to next?"
draft: false
---

It is difficult to believe that we're entering 2022 already! I did not do a retrospective in 2020, so I thought I would reflect on the last two years together. This was largely a time of putting the things I planned on doing next in my 2019 post into action and seeing the benefits pan out. Finally, midway through 2021 I decided to resign from my position and begin a ~year long sabbatical to spend time getting some perspective on my life and career up to this point.

What Did I Do?
--------------

Of course the biggest change for 2020 was the pandemic. Like many, we were suddenly working fully remote amidst some really challenging times outside of work. Remote was isolating but also allowed a big boost in productivity for me and was generally an exciting challenge to work out. We dialed in many of our agile processes, and I enjoyed finding ways to make collaboration as asynchronous as possible while still being inclusive and engaging.

I migrated some projects from CircleCI to Github Actions and ultimately would call it a pretty even trade with GHA winning on price (free) and slightly better build times with caching. Using [Cypress](https://www.cypress.io) to create tests was an absolute joy. Cypress is incredibly simple to add and the videos make it easy to find problems and let a non-technical team member understand them.

As 2020 rolled on, I had two main projects. One was completing multi-language support for a site powered by Drupal and NextJS and the other was adding a premium subscription model to a very high traffic news platform running on Drupal.

### Multi-Language Drupal

For the multi-language site, the CMS side was Drupal and I leaned on Drupal's core language features to get different languages rendering on the NextJS frontend. This was my first multi-lang implementation, and it needed to work for users speaking five languages across the globe. 

Perhaps the most difficult part of the project was modeling the behavior of fallback languages, defaults, etc., before implementing and clearly aligning expectations among many different client stakeholders. To get that going I used a lot of visual aids created in white-boarding tools like [excalidraw](https://excalidraw.com/). Remote work made creating visuals for concepts and system designs more crucial than ever for getting everyone on the same page.

### Premium News Platform

Intermingled with the language work I was plotting a course for the addition of a premium model to a Drupal-powered news site. This work would add some dynamic in-page content based on the current user, premium-only articles and other features common to news sites around the web that run on this model. Prior to these changes the site was mostly static and served primarily to anonymous users.

My first task was to identify key feature sets/problem areas and analyze platform alternatives. Drupal would probably work, but I have been unsatisfied with its resource usage and the expected additional load was very likely to make it prohibitively expensive to run. This was also a good opportunity to split apart key systems to make the site more resilient. My key decision points for a new setup were:
1. A way to handle many thousands of concurrent authenticated users.
2. Serve static content to over ten thousand concurrent anonymous users and handle huge traffic spikes without outages.
3. Manage an enormous amount of content - hundreds of thousands of items.
4. Quick updates were crucial, so efficient cache invalidation was required.
5. Little or no major workflow adjustments for CMS content editors.

The fact that the site was almost entirely static articles made something like Hugo, Gatsby or NextJS very alluring. Static files are leaps and bounds better than babysitting PHP and Varnish even if Varnish *mostly* works. So, I dove into #2 first planning on tackling authentication with a detached service via either AJAX or SSR.

For a previous project, I [tried using Gatsby](https://www.mikaaguilar.com/posts/building-decoupled-drupal-sites-2019/) and I didn't love it for a few reasons outlined in that post. So, my first try was hugo, something I had [already rewritten this site in](https://www.mikaaguilar.com/posts/blogging-on-hugo/part-1/). Going in, I first needed to make sure Hugo would be able to handle building 100s of thousands of articles efficiently - which was the major drawback of Gatsby when I tried it. 

My prototype performed decently but build times of even a few minutes were not acceptable. To overcome that I toyed with a split build that would only update critical things like the front page and new articles and another process to later catch up older content. Eventually it was clear that I was both pushing the use-case for Hugo and creating something so custom that on-boarding my team would be difficult, so I had to move on. Hugo is excellent for blogs and mostly static sites, but not as well-equipped as NextJS for dynamic content or fully custom functionality.

Finally, I started on a prototype in NextJS. The game-changer here was [incremental static regeneration](https://nextjs.org/blog/next-9-5) which allowed you to skip building the *entire* site every build and let less important pages get built on request. Conveniently this feature dropped just as I wrapped up Hugo exploration. Building the rest of the feature set in Next was pure joy - mixing widgets that needed authentication in with static content was simple and efficient both for computation and developers.

For authentication, we used Firebase. While this allowed us to pretty much entirely ignore handling scaling for users, it was surprisingly cumbersome I found the general design of Firebase felt fragmented with all sorts of slightly different ways of doing basic tasks. When we built this, there was no way to query Firebase for a total user count - you had to keep track yourself! However, nothing came close in terms or pricing with the amount of expected users we had. It ultimately proved fast and reliable so despite the rough edges it was a good choice.

The content remained managed by Drupal to let us focus on the frontend and allow editors to retain their workflows. NextJS static pages became the primary 'cache' layer and Next requested content from Drupal via a handful of REST endpoints almost exclusively on build or during incremental regeneration. This drastically reduced the resources required for Drupal and even if Drupal went down, the static Next pages would serve without issue.

This project was the culmination of several years of work, and it was really satisfying to launch. It deployed with practically no downtime and proceeded to run for months without major issues. Splitting the rendering of the site to end users from the admin interface/cms with a relatively durable cache made cms maintenance far less risky. Furthermore, having a separate authentication service meant that the site could at least serve base content even if for some reason auth went down. After years of running everything-or-nothing in Drupal, this setup was really great.

### Sabbatical

The last few years were exceptional in many ways. Halfway through 2021 I decided to resign from my position and take around a year off of work. My long-term partner was diagnosed with Fibromyalgia in 2020 and then not much later contracted Covid19 before the vaccines came out despite our best isolation efforts, resulting in long-covid fatigue as well. I took the first few months of this break to support her. Thankfully, while still far from a full recovery, her condition has improved significantly since this began and hopefully will continue to.

After that, I took a solo van road trip for three months across the western US. My route was north from Austin to Yellowstone, Seattle, down the California coast then back east through AZ and NM. During the pandemic I picked up bird watching and on this trip I hit 300 species! I took [bird photos](https://www.instagram.com/diagnosisbirder/) and some [van shots](https://www.instagram.com/theohvan/) along the way.

As of writing this, I've been back home for a bit. Between making life as easy as possible for my partner, I am getting back into programming after some time away. I have been toying with making a light CMS in NextJS and created [Searching for Birds](https://www.searchingforbirds.com) to experiment. It's using some Markdown files in a similar setup as a Hugo site. I've also been making my way through [Clojure for the Brave and True](https://www.braveclojure.com/clojure-for-the-brave-and-true/) again and, of course, watching loads of Rich Hickey talks. Finally, as I'll be back on the job hunt, I've really enjoyed tackling a few LeetCode questions a week.

What's Next?
-----------

I am hopeful for 2022. This later half of my break is going to be focused on volunteer work and creating music, art, and code while I start looking for my next work opportunity. After taking up birding and going on my trip, it is clear to me that the climate crisis is very much here, and I want to do what I can as a software engineer to help solve it.

Tech-wise, I remain excited about NextJS. In 2019, it was the top of my list and in the time since then it's had time to mature into a robust platform. I am a huge fan of what Guillermo Rauch is doing, and to hear that he's hired Rich Harris with the goal of making Svelte better is amazing. I think there is a lot of potential overlap between them and having the two work together to merge these two ideas is great. 

At the end of 2019 I expected to find a replacement for Drupal but did not end up focusing on it enough to build a full site in something new. [Strapi](https://strapi.io) is the most robust alternative, and it appears to have significantly improved since I last considered it.

I'm super excited to see what my next role looks like. I'm exploring all sorts of different options spanning the stack and excited to learn and grow from a new team wherever I end up.

Here's to 2022!
