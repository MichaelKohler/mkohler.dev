---
title: Firefox OS App Days - combined with Webmaker
permalink: /blog/2013/06/{{title | slug}}/
date: 2013-06-23 23:20:59
---

In late May 2013 we (Mozilla Switzerland) organized a Firefox OS App Day in Zurich. At this event we wanted to give local developers a chance to play with Firefox OS and write some apps for it. It was a great event, which I don't need to blog about further since it has been documented [very](http://blog.zuehlke.com/firefoxos-app-day-switzerland-was-great/) [well](https://blog.liip.ch/archive/2013/05/28/firefox-os-app-day.html) [elsewhere](http://blog.utou.ch/2013/mozilla-firefox-os-app-day/).

<!-- excerpt -->

In the beginning of May 2013 I attended the Vienna Firefox OS App Day. This event was awesome and got me to think about combining Firefox OS with [Webmaker](http://www.webmaker.org).

## Firefox OS App Day Vienna

At the App Day in Vienna I met three really brave women. You may ask why I call them "brave". Well, they have never created a website before and didn't have any idea about HTML or CSS. I spent about 10 minutes stripping down the Boilerplate App to have a white "workspace" and explained them where they can put the HTML elements. I showed them how to insert an image and they were already happy. After that I showed them the HTML reference with all the elements. About 15 minutes later I came back to them and they already inserted a button on their own.

With a little help from us they managed to connect to button to a music file with JavaScript and they got a Firefox OS App they made themself! It's a "laugh app". When you click the button it plays a laughter.

## Firefox OS App Day Zurich

At the App Day in Zurich we were joined by a Java developer who has never written any HTML. This time it was easier to explain it since he already got enough knowledge to quickly understand the concepts. Nevertheless I stripped down the boilerplate app again and we started to create the app.

Since he already heard about the different awesome features in HTML5, he wanted to create an app which stores the value of an input field in the localstorage after clicking the submit button. Since the boilerplate app already had form fields he just needed to change the labels and write the JavaScript code. After about 15 minutes he had a working Firefox OS app! Once again we could [#teachtheweb](https://twitter.com/search?q=teachtheweb) to somebody and saw one more smiling face in the room.

You can see the code at [https://github.com/ohumbel/sffoa](https://github.com/ohumbel/sffoa).

## How can we combine these two topics?

I think using Firefox OS to teach others HTML is a great possibility since most of the learners have never created a phone app. Why not learn and have something wonderful in your hands?

This is the reason why I created some resources. I'm sure this is not the final version of the resources, feel free to remix them!

**Activity and cheat sheet:** You can find the [activity sheet](https://mkohler.makes.org/thimble/firefox-os-app-activity-sheet) and the [ressource sheet](https://mkohler.makes.org/thimble/firefox-os-app-resource-template) remixable on Thimble.
**Webmaker Firefox OS template:** I created a github repository, so I don't need to strip down the boilerplate app every time. Feel free to send a pull request: [https://github.com/MichaelKohler/webmaker-firefoxos-template](https://github.com/MichaelKohler/webmaker-firefoxos-template).

What do you think about this combination? Would you use it yourself to teach HTML? Please leave a comment!
