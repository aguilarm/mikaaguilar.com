---
title: "Tuning Php Fpm"
date: 2019-07-19
lastmod: 2019-09-04
description: "My experience running Drupal sites with php-fpm at scale."
draft: false
---

We've been running php-fpm at a pretty significant scale for quite some time now and have played around with a bunch of different performance configurations in an attempt to do so efficiently. Our stack is varnish > nginx > php-fpm. Php is running Drupal behind all of that, and the vast majority of a site is hitting varnish cache. Occasionally we'll have to warm up caches or something will leak through and we'll have to deal with a sizeable surge of concurrent requests.

Of course, ideally, I'm not tuning the stack to handle the very occasionally absolute worst possible scenario - totally un-cached site rebuilds - but it's still a reality I'll need to handle relatively gracefully.

My current scale is hundreds of concurrent authenticated users, and nearly 10k concurrent total users. Also, when everything is as cached as it realistically can be, I have maybe 20 or 30 requests going through php at any one time.

The most common advice I've come across is to allocate a maximum children count following the _average memory usage of your scripts / total available memory_.  Following that with average memory usage generally very low, I could have hundreds of children processes on each master. So that was the first thing I rolled with.

I've since done some research on general concurrency handling patterns and how CPUs work to arrive at a new working understanding of this problem. It turns out, there is a lot of subtlety in how a CPU actually, physically, performs work and in which order but you can at least get pretty close with some relatively safe assumptions. Here are some key things to understand when tuning php-fpm:

1.  **One child handles one request at a time.**  
    This means your total children at any moment represent the maximum number of concurrent requests you can handle.
2.  **One child processing one request is using CPU time that another child will not be able to use\***  
    Things get really murky here the closer you try to get to real concurrency handling with CPUs. One php request runs in a single, isolated thread. This means that it's far less equipped for massive concurrency than something like NodeJS or Golang where requests are not isolated in threads and many requests run together. It makes php a bit easier to grok because state is not leaking over requests and needs to be built anew each time a request is made, but has the downside of being a bit harder to scale.  
    However, modern CPUs are also doing a lot things in an attempt to accomplish many tasks in a short time frame seemingly all at once. This can mean that, depending on your CPU's ability to do so, you may be able to simulate efficiently handling a handful of simple requests roughly concurrently even with something blocking like php. Generally, though, that amounts to the CPU performing a single request faster, meaning more 'concurrent' requests can be pushed through the queue in a smaller time frame.  
    Getting a really clear answer to what to expect with CPU usage and children processes, or what is _actually_ happening down to the metal is really tough and you're going to have to tune based on observing your app here.
3.  **Children processing requests take a certain amount of average memory per request, based on the app they're running.**  
    Well, sort of. Your app probably does have an average memory footprint over many requests. But if you're using something like Drupal or WordPress, the admin interface is likely to take a whole lot more memory than your average page. You'll also likely need a relatively large amount of memory for image uploads and image processing. So this is really dependent on the nature of your php application. Ideally you trim your memory\_limit down to the lowest possible expected usage so things that anomalously exceed it will be killed. So, for a CMS, the admin sections should probably be on a separate pool with a higher memory limit. If you do something difficult/memory intensive (like image processing in php), that should be happening in a dedicated pool as well. You should avoid throwing a big limit on _all_ of your children because a very small handful of them occasionally need a lot of memory. Often easier said than done, but said nonetheless.

Finding the sweet spot
----------------------

I came across the 'avg memory per request/total memory = children' advice in enough different places that I started to hold onto it as definitely-all-I-need-to-know-about-children-processes. That is, however, only half of the story. My average requests in php use a minuscule amount of RAM compared to how much I can chuck on a machine for relatively low cost right now. So, following that advice, I could have hundreds of children. Similarly, my average requests also generally use a tiny portion of CPU percentage. Still seems like I can go to the moon with my total children process count.

Doing so invariably hits the CPU cap way before it hits a memory issue. So I get a logjam of kind of an f5 storm. If I try to let 100s of concurrent requests run on a machine with 1 or 2 cores, its got to do them 1 or 2 at a time. If one of those requests takes a little bit, even a second or two, I'm backing up the others into the listen queue waiting for it to finish. By default, listen queue is set to unlimited (-1) by php but actually limited by your platforms max connections, which could be a few thousand now. After the queue fills up, requests are dropped. I recommend having your listen queue capped at something as low as 5 or 10 to prevent a situation where 100s are waiting and 100s are queuing that you'll never realistically catch up to because your available CPU is going to be jammed trying to continuously process all of these requests. Capping at a smaller number will give the CPU an opportunity to free up work and stop putting users in line, where they invariably just refresh the page over and over.

This is a bit of a fundamental shortcoming of using php in a high concurrency situation because you cannot get away from scaling hardware to meet concurrency demands at a much higher ratio than something like NodeJS or Go. Because every request in php is going to effectively lock up an entire core while it processes, you need to scale cores to handle concurrent requests. You'll gain potentially quite a bit of concurrency ability if you use really fast cores because requests will be processed faster, but you're not escaping the 1core = 1request problem with php.

With that in mind, to tune php to handle concurrency as well as it is able to, you need to consider the concurrent users you expect and how many CPU cores you are able to throw at it. Your children processes should really be 1 process per core, but can realistically be around 5 or 10 depending on what kind of CPU you're able to get and how complicated your requests are. It is most likely that memory won't be something to consider, but of course that is going to play a role as well if your requests take a high amount of memory on average.

I'm still experimenting with the best way to handle full cache-rebuilds at high (1000+) concurrency, but so far having a lot of performant CPUs available has been the best setup. I think limiting my listen queue and max execution times considerably will increase possible throughput as well, but have yet to find a nice balance there. We were recently able to upgrade our CPUs and it had a rather dramatic effect on the ability to push concurrency through the system.

Realistically you _need_ a caching layer to use php in a high concurrency situation. Things like Varnish are purpose built for serving lots of concurrent requests very quickly by looking them up in memory. You are basically building an in-memory version of the JAMStack setup where everything is files that get updated by a build system. You should approach scaling php with this in mind - it doesn't _do_ concurrency and if you want to do lots of concurrency, you need a cache layer on top. It should be considered a build tool that outputs memory artifacts into Varnish. With Drupal 8 and cache tags, we've been able to do that without the common 'oh that is cached for an hour, we can't update it immediately' troubles and it's a relatively nice experience for developers and end users.

Hopefully you've found this helpful. If you see something that needs correcting, you can reach me on twitter or via email (it's definitely all over this very website). I, of course, have assembled this knowledge from many great sources throughout the internet:

### Further Reading

There is _tons_ of great stuff on Hayden's website, here's two that are super relevant:  
https://haydenjames.io/understanding-php-memory\_limit/  
https://haydenjames.io/php-performance-additional-cpu-cores-vs-faster-cpu-cores/  
You should also go ahead and search for 'php' there. Really awesome resource.

https://devcenter.heroku.com/articles/php-concurrency

https://carlalexander.ca/php-application/

https://slack.engineering/taking-php-seriously-cf7a60065329

https://forum.nginx.org/read.php?3,222702

https://www.linode.com/community/questions/8712/how-many-php-children-is-too-many

And a Talk about concurrency. This is in Java but will still help CPU concurrency make sense (after making it seem like real life magic):

https://www.infoq.com/presentations/concurrency-tips/