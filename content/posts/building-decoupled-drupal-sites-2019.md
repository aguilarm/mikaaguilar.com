---
title: "Building Decoupled Drupal Sites 2019"
date: 2019-04-02
lastmod: 2019-07-14
description: "Deciding between using GatsbyJS or NextJS as your frontend in a decoupled Drupal project."
draft: false
---

Alright, you've seen it everywhere for the last couple of years - decoupled Drupal. I've been eyeing the available solutions for some time and finally feel like things are in a good spot to make the jump over. Buckle up and join me on my journey to find a rightful heir to Drupal 8's frontend.

If you want to skip the journey and get some real decisions, scroll on down to the last section.

Motivations
-----------

My primary role is the 'ops' side of devops, but I get the opportunity to do a fair bit of frontend work here and there as well. A true devopsian, or what have you.  
Most of the projects I work on are medium to very large scale traffic wise. Content is largely news or periodical articles, sometimes intranets or university sites, and a few snowflake custom rich web experiences.

So, in looking for a decoupled solutions, I had a few problems I needed it to solve better than the existing infrastructure and developer experience surrounding a vanilla Drupal 8 install. My primary motivators for moving away from the Drupal frontend were:

1.  **Combining static and dynamic content in Drupal tends to get a little messy**. Generally you end up building some JavaScript solution alongside your twig. I really want react with server side rendering so my templates are all the same for everything that gets rendered on the page.
2.  **Core theme templates are really noisy**. They come with a lot of dead weight HTML and CSS. We are almost always getting cleaner, clearer solutions by ditching nearly everything we get out of the box anyway. I would much rather start really slim and grow when I need to with simple components.
3.  **Static site generation just sounds great**. If I can remove the need for my entire infrastructure for everyone except editors, and I get a persistent but dynamically generated set of files to serve my site, I can scale to the moon!

Generally speaking, however, Drupal 8 is a really robust solution. The cache tags system is mostly a joy and using in in tandem with Varnish is relatively simple and super performant. Most of the developer experience for nearly everything is getting better as it moves out of hook land and into Symphony. Dependencies are nice with composer. All that to say I'm not going to ditch Drupal for something that isn't going to almost blow my mind.

The Journey
-----------

The very first thing I came across was a series of blog posts by Dries, the creator of Drupal. He started elaborating on decoupled Drupal in [a 2016 post](https://dri.es/how-should-you-decouple-drupal) and has come back to it in [2018](https://dri.es/how-to-decouple-drupal-in-2018) and [2019](https://dri.es/how-to-decouple-drupal-in-2019). The goal of these posts, mostly, is to help decide whether you even should decouple, and, if so, how far you should take it. You should read these posts to get some perspective on where we're going here. However, my mind was pretty well made up on a fully decoupled solution because of my motivations.  
I'm not considering a progressively decoupled solution because of the complication overhead. So, it's going to be a decoupled static site or a decoupled app at this point.

### Gatsby

Dries mentions the [JAMStack](https://jamstack.org/) in his later posts, so at this point I decided I should finally actually take a serious look at that. The website has some pretty cool sounding promises. I can ditch the entire backend? No more databases? Sign me up!

[Gatsby](https://www.gatsbyjs.org/) is one of the most popular implementation of the JAMStack and there is a Drupal source plugin for it ready to go.

I went ahead and created a [basic proof-of-concept project](https://github.com/favish/drupal-gatsby) to see how it felt developing with Drupal serving Gatsby. Probably will have a post here documenting that sometime.

It feels nice. Gatsby has you create pages and place components onto them, ultimately having Webpack compile everything into a bunch of static files that you can then place on s3 or something similar and you've got yourself a website.

All you will need Drupal to do is provide you a way to edit and manage your actual content, and a build system standing by to compile it into new static assets whenever you make changes.

That last part had me a little concerned. Some of the sites I manage have hundreds of thousands of articles, so rebuilding them all every time one is changed is a bit of a code smell. I have not plugged a site that large into Gatsby yet, but even my small test site had build times of a couple of minutes. From what I can tell this may already be greatly improved or is a big priority for Gatsby maintainers, so it's not really a reason to ditch the tool.

I originally decided that build times would become a huge issue for me since I'm running relatively huge sites publishing news that is time sensitive and needs to appear on the site quickly. In retrospect, one could probably create a build pipeline that would make this work and I'd like to come back and give it a shot. A build processor that receives update requests from Drupal hooks, but waits a minute or two between the first update request before triggering a build, would be totally great. Then multiple editors can make a bunch of edits and, as long as the total average build time is under a minute or two, get nearly instant publish times.

Using Gatsby also means your build process is going to be the thing that needs uptime monitoring since your actual site is all flat files. Definitely a net positive but you'll probably need to give your clients some insight into builds - at the very least timing and success/failure. All that to say is instead of having php-fpm, varnish, and nginx configuration to deal with at scale, I'm going to have a sort of complicated build process to maintain. That's almost definitely a good thing, but it is a _different_ thing.

Also, with Gatsby, from what I can tell, you don't get a super great static and dynamic story. It looks like you have one Apollo Client for your build to generate static assets, and if you want dynamic things you'll need another separate client for that. Not awesome but I really feel like I missed something obvious there.

None of this entirely rules Gatsby out as a good choice for a frontend to sit on top of a decoupled Drupal site, however. If you have a small amount of editors making infrequent content, or your content updates are not time-critical and you don't have dynamic content Gatsby is really the _best_ choice. Like the blog you're currently reading? Great candidate for a Gatsby rewrite.

Ultimately my initial reaction and findings with the build problem lead me to search once more for a different solution. I think that if I found nothing else I probably would have stuck with Gatsby and spent more time finding ways to optimize builds - it is really a great tool. Anyway...

### NextJS

The last time I attempted server side react was probably 2015-ish and back then it was do-able but there was a LOT to do. It wasn't awesome. I've run into [NextJS](https://nextjs.org/) quite a few times and it looked really nice so that's where I went after Gatsby.

One of the reasons I hadn't really done anything with Next yet is because I wasn't sure what the storage story was for it. It turns out, there isn't one. Next isn't going to make that decision for you, it's _only_ doing isomorphic React. That makes using it as a decoupled frontend for Drupal a really nice use case. Drupal can manage my content relationships and structure, Next can handle templates.

Since I had already done it for Gatsby, I used the [drupal/graphql](https://github.com/drupal-graphql/graphql) as my data source and added the Apollo Client to my Next setup, using [this example](https://github.com/zeit/next.js/tree/5ff7c0742c25394ff8384ee31915bddaac46a4f2/examples/with-apollo) as a starting point.  Relatively quickly I made a lot of progress with this setup.

You make pages and pop components on to them - the server and client share nearly all of the templates. Your server is able to run all of your queries on pageload or your client can run the _exact same queries_ as the user navigates around the app. The caching story for Apollo is pretty good and you can tune it for server or client caching.

As of writing I've moved pretty far past the basic proof of concept with Next and have made the vast of majority of what I'd normally have in a Drupal frontend with it. I've got views with pagination, user auth is managed by Drupal, dynamic-or-static is incredibly simple with Apollo. I hope to come back and build something similar to my Drupal/Gatsby starter project with Next but I was able to move so fast with my project this time that I zoomed right past 'starter' phase.

It remains to be seen how Next will hold up to some of the massive traffic I have on more traditional Drupal stacks right now, but I have other Node processes at scale with no trouble at all. Also this means you have a service to maintain uptime on instead of the fire-and-forget flat file system Gatsby generates, but you do get basically instant time to publish.

TLDR
----

You should be decoupling Drupal in 2019. The ecosystem is ready and prime for contribution right now. Decoupled solutions are better than using twig/php because you can use React everywhere making your frontend unified on one system. There are many good reasons to unify behind React, and I recommend [Dan Abramov's Overreacted](https://overreacted.io/react-as-a-ui-runtime/) blog if you need convincing.

I recommend using [Gatsby](https://www.gatsbyjs.org/) as a first choice. Replacing all of your infrastructure with flat files is really hard to beat. You'll have to come up with a build process that makes sense though.

If you have a lot of dynamic in-page content or are going to need a really fast (less than 10 minutes) time-to-publish, [NextJS](https://nextjs.org/) is a better choice. The mixing of dynamic and static content is really straightforward if you use Next and Apollo and Next is generally nice to use.