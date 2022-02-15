---
title: "Procedural Galaxy"
date: 2020-10-12T17:40:14-06:00
lastmod: 2022-02-15T17:40:14-06:00
description: "Experiment with using procedural generation to build a galaxy map."
repository: "https://github.com/aguilarm/procedural-galaxy"
demo: "https://aguilarm.github.io/procedural-galaxy/"
draft: false
---

I have always been fascinated by procedural games like Minecraft and No Man's Sky. So, I set off on a search for a way to get my hands dirty building something using the concept. This project is the result.

I found [this video on youtube](https://www.youtube.com/watch?v=ZZY9YE7rZJw) where a 2D galaxy map is built. He uses C++ there, but I've re-created that implementation in javascript. I've also used Github Actions to push this project up to Github Pages every time I push a change, and Snowpack to compile the source code.

This project opened up the world of procedural generation to me, and I've spent hours checking out all the other neat things people have done with the concept on YouTube since. As I explored, I wanted to build the UI part of this in React and eventually found react-three-fiber. I may eventually build a Minecraft clone using that along with the things I've learned from putting this project together.
