---
title: "Easily Patch Contrib Drupal Modules Composer"
date: 2019-01-12
lastmod: 2018-12-26
description: "The workflow for patching Drupal modules can be a bit obtuse if you do everything by hand, but with composer it's easy!"
draft: false
---

The workflow for patching Drupal modules can be a bit obtuse if you do everything by hand, but with composer it's easy!

I manage all contributed modules with composer, so an example `composer.json` might look like this:

    {
        "name": "example",
        "description": "Drupal 8 Example",
        "type": "project",
        "minimum-stability": "dev",
        "prefer-stable": true,
        "repositories": [
          {
            "type":"composer",
            "url":"https://packages.drupal.org/8"
          }
        ],
        "require": {
            "cweagans/composer-patches": "^1.6",
            "composer/installers": "^1.6",
            "drupal-composer/drupal-scaffold": "^2.5",
            "drupal/core": "^8.6",
            "drush/drush": "^9.5",
            "drupal/health_check": "^1.0",
            "drupal/redis": "^1.1",
            "drupal/twig_tweak": "^2.1"
        },
        "scripts": {
          "drupal-scaffold": "DrupalComposer\\DrupalScaffold\\Plugin::scaffold"
    		},
    		"extra" : {
    			"installer-paths": {
    				"docroot/core": ["type:drupal-core"],
    				"docroot/libraries/{$name}": ["type:drupal-library"],
    				"docroot/modules/contrib/{$name}": ["type:drupal-module"],
    				"docroot/themes/contrib/{$name}": ["type:drupal-theme"]
    			}
    		}
    }

This will put all of my Drupal modules into `docroot/modules/contrib` (relative to my composer.json).

But say I need to patch `twig_tweak`, for example. I would need to clone the git repo and check it out at whatever the most recent dev version is.

To do that with composer, you can run

    composer require drupal/twig_tweak --prefer-source 

If you've already installed twig\_tweak, you'll have to remove it first (`rm -rf docroot/modules/contrib/twig_tweak`)

Now you'll have the module installed with the .git folder so you can track any changes you need to make.  If you go into the module's directory (`cd docroot/modules/contrib/twig_tweak`) and run git branch -v you can see that it also pulls info for the dev branch, assuming you're on the main branch.

You can now make your adjustments, and create a patch by running `git diff > name-of-patch.patch`.

If for some reason your patch is specific to your use case and you don't need/want to push it upstream somewhere, you can store this .patch file locally and add it to your composer but use a relative path.  I usually put custom patches in `./patches`, so an example patch would add this to my composer.json inside the 'extras' object:

    "patches": {
        "drupal/twig_tweak": {
            "Fix something specific to my use case": "./patches/twig_tweak.patch"
        }
    }

Patches in composer this way require the `cweagans/composer-patches` package.

As a final note, in the near future [Drupal is partnering with Gitlab to revamp contribution workflows](https://www.drupal.org/drupalorg/blog/developer-tools-initiative-part-5-gitlab-partnership) and importantly adding merge requests. Most likely this workflow will be a little bit different when patch-based contribution is swapped for merge requests.