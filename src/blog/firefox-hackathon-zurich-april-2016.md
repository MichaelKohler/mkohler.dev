---
title: Firefox Hackathon Zurich April 2016
permalink: /blog/2016/05/{{title | slug}}/
layout: "blogpost.liquid"
date: 2016-05-05 14:31:47
---

Last Saturday we've held a [Firefox Hackathon](https://mozilla.github.io/reps-archive/e/firefox-hackathon-zurich-april-2015/) in Zurich, Switzerland. We've had 12 people joining us.

## Introduction

At first I gave an [introduction to Firefox](https://docs.google.com/presentation/d/11euVpPoJ7kKO1OcWTYCqA3XOmUC_DAoGi1rJEeQtOS8/edit) and introduced the agenda of the hackathon.

![](https://c7.staticflickr.com/8/7753/26557746230_9362c332c9_z.jpg)

## Dev Tools Talk

After my talk we heard an amazing talk from [Daniele](https://mozilla.github.io/reps-archive/u/Mte90) who came from Italy to attend this hackathon. [He talked about the Dev Tools](http://mte90.github.io/Talk-DevTools) and gave a nice introduction to new features!

![](https://c5.staticflickr.com/8/7446/26736586972_51c7593fdf_z.jpg)

## Hackathon

Before the hackathon we created a list of "good first bugs" that we could work on. This was a great thing to do, since we could give the list to the attendees and they could pick a bug to work on. Setting up the environment to hack was pretty easy. We've used "The Janitor" to hack on Firefox, I'll write a second blog post introducing you to this amazing tool! We ran into a few problems with it, but at the end we all could hack on Firefox!

![](https://c5.staticflickr.com/8/7791/26736583812_e110d0bebb_z.jpg)

We worked on about 13 different bugs, and we finished 10 patches! This is a great achievement, we probably couldn't have done that if we needed more time to set up a traditional Firefox environment. Here's the full list:

* [https://bugzilla.mozilla.org/show_bug.cgi?id=1031956](https://bugzilla.mozilla.org/show_bug.cgi?id=1031956) (Colin, Patch done, but not yet uploaded)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1256822](https://bugzilla.mozilla.org/show_bug.cgi?id=1256822) (Fabien, patch just needs a small addition to the commit message)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1256895](https://bugzilla.mozilla.org/show_bug.cgi?id=1256895) (Ale and Richard, patch just needs a small addition to the commit message)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1256912](https://bugzilla.mozilla.org/show_bug.cgi?id=1256912) (Augustin, patch was checked in)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1256810](https://bugzilla.mozilla.org/show_bug.cgi?id=1256810) (Fabien, patch just needs a small addition to the commit message)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1256936](https://bugzilla.mozilla.org/show_bug.cgi?id=1256936) (Fabien, patch just needs a small addition to the commit message)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1256795](https://bugzilla.mozilla.org/show_bug.cgi?id=1256795) (Ale and Richard, patch just needs a small addition to the commit message)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1235062](https://bugzilla.mozilla.org/show_bug.cgi?id=1235062) (Ale and Richard, patchs needs some more work)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1256863](https://bugzilla.mozilla.org/show_bug.cgi?id=1256863) (Michael, patch was checked in)
* [https://bugzilla.mozilla.org/show_bug.cgi?id=1256854](https://bugzilla.mozilla.org/show_bug.cgi?id=1256854) (Michael, patch was checked in)

Thanks to everybody who contributed, great work! Also a big thanks to Julian Descolette, a Dev Tools employee from Switzerland who supported us as a really good mentor. Without him we probably couldn't have fixed some of the bugs in that time!

![](https://c5.staticflickr.com/8/7137/26736578932_68c48cf246_z.jpg)

## Feedback

At the end of the hackathon we did a round of feedback. In general the feedback was rated pretty well, though we might have some things to improve for the next time.

![](/images/2016/05/hackathon1.png)

40% of the attendees had their first interaction with our community at this hackathon! And guess what, 100% of the attendees who filled out the survey would be joining another hackathon in 6 months:

![](/images/2016/05/hackathon2.png)

For the next hackathon, we might want to have a talk about the Firefox Architecture in general to give some context to the different modules. Also for the next hackathon we probably will have a fully working Janitor (meaning not alpha status anymore) which will help even more as well.

## Lessions learned

*   Janitor will be great for hackathons (though still Alpha, so keep an eye on it)
*   The mix of talk + then directly start hacking works out
*   The participants are happy if they can create a patch in a few minutes to learn the process (Creating Patch, Bugzilla, Review, etc) and I think they are more motivated for future patches

![](https://c4.staticflickr.com/8/7164/26830426435_816408ddb3_z.jpg)

All in all I think this was a great success. Janitor will make every contributor's life way easier, keep it going! You can find the [full album on Flickr](https://www.flickr.com/photos/128655475@N02/albums/72157665608923543) (thanks to Daniele for the great pictures!).
