---
title: Firefox OS App Day Frankfurt - 22.11.2014
permalink: /blog/2014/11/{{title | slug}}/
date: 2014-11-25 22:58:29
---

On the 22nd of November we met in Frankfurt am Main (Germany) to have a Firefox OS App Day. This is an event where we have talks in the morning to explain Firefox OS and Web APIs and then we hack for the rest of the day creating amazing apps for Firefox OS (and the open web).

<!-- excerpt -->

## Preparation

I asked Jan Bambach if he wanted to help out to organize a Firefox OS App Day. He gladly accepted even though he had some stress in school since he has to write exams. After figuring out a date, we started to plan the event. We started with the agenda.

* 09:00 - 09:15 Welcome / Introduction to Mozilla
* 09:15 - 09:45 "What is Firefox OS?"
* 09:45 - 10:15 "How do I develop for Firefox OS?"
* 10:15 - 10:30 Break
* 10:30 - 12:30 Hacking your own Firefox OS app
* 12:30 - 13:30 Lunch Break
* 13:30 - 17:15 Hacking your own Firefox OS app
* 17:15 - 17:30 "Firefox Marketplace - How to submit an app"
* 17:30 - 18:15 App presentations

We did a lot of advertisement for the event, but unfortunately that didn't turn out as we expected. We only heard about another event taking place the same day a few days before the event. This was too late to reschedule. Next time we'll check better and avoid having an event at the same day as a big Barcamp going on. I'm sure that we'd have more participants if it was on another day. Additionally we found out that asking Universities to advertise it to their students doesn't scale as well as it should. We didn't get any feedback from them.

[![](https://farm8.staticflickr.com/7564/15692584017_1de6b03b7a_b.jpg)](https://farm8.staticflickr.com/7564/15692584017_1de6b03b7a_b.jpg)

## App Day

On Saturday we were 9 persons. We expected to have 25 persons, but I'm going to explain to you why this is actually not as bad as it sounds.

After a talk about the Mozilla community and Firefox OS from me, Colin talked about Web APIs and showed some examples. This was very interesting to all the participants since most of them were native App developers and not web developers. There were some "I can do X on Android, is that possible with Firefox OS too?".

Since we could support every developer without having a "question queue", the overall turnout of the apps was a lot more advanced than at other App days with more people where we sometimes had multiple people waiting for an answer to a question. This was also the first time where we had two Marketplace submissions with a fully functional app.
/images/images
Apps created:

*   [Wasserwaage](https://marketplace.firefox.com/app/wasserwaage-lite?src=search)- an app to measure if something is even
*   Clownfish - a game where you need to swim around fishes and need to avoid them  (still awaiting review in the Marketplace, make sure to check it out once it's reviewed!)
*   A game where you need to clear your side of the table of all balls so that the other person has all the balls (not yet pushed to the Marketplace, but already a very exciting game even though there are no points yet)
*   A quiz app where you need to find out the capital or country by identifying the flag of the country (this was already developed before, but he did a lot of fixes and adapted it to Firefox OS)
*   An app to upload Creative Commons pictures to the Wikimedia Commons page. Unfortunately we had a problem with the Wikimedia API and couldn't finish the app. He promised to finish it once it's possible. The Wikimedia Commons API doesn't send a CORS header, so systemXHR doesn't work if cookies are sent.

[![B3Jr9DnIMAAlbvK.jpg_large](/images/2014/11/B3Jr9DnIMAAlbvK.jpg_large.jpg)](/images/2014/11/B3Jr9DnIMAAlbvK.jpg_large.jpg)

At the end we showed how to upload an App to the Marketplace. Let's hope that everybody else uploads their app too once it has a better state and is not a prototype :)

Thanks to everybody who attended, great event!

## Lessons learned

*   Check better for "competing" events during the event days
*   Re-check location (fortunately this wasn't a problem even though the reservation wasn't confirmed)
*   Smaller groups are better since you can support the developers way better than in a large group
*   We should advertise the Flame better, there is a lot of interest!
