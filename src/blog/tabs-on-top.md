---
title: Tabs-on-Top
permalink: /blog/2010/04/{{title | slug}}/
layout: "blogpost.liquid"
date: 2010-04-18 21:30:48
---

Currently there is a discussion about the Tabs-on-Top feature in the [mozilla.dev.apps.firefox newsgroup](http://groups.google.de/group/mozilla.dev.apps.firefox/browse_thread/thread/29849697fc8f53f5#). Tabs-on-tops has been [pushed](http://hg.mozilla.org/mozilla-central/log?rev=544815) to the nightly (trunk) development branch of firefox on April 6th 2010\. Pretty much every new feature introduced to Firefox leads to a more or less active discussion but this time it is very important to find the right decision since this is a major change in the front UI. Of course there will never be an agreement because GUIs are still a matter of subjective. Now the FF UI design team needs to find a decision which is best for most of the users.

Firefox is currently used by millions of users. This means a lot of people who need to be satisfied. Otherwise they will just think about changing the browser. But wait, is there a good browser which has the option to place tabs on the bottom of the location bar? Yes, it is Firefox. Of course there will be an option to place tabs on the bottom. It is just about where to place the tabs by *default*.

It is well known that good design is getting more and more important (e.g. the iPhone or iPad design). Unfortunately a lot of people think that good visual design (good looking interfaces) are the best ones. This is in most cases absolutely false. The best GUI is the one that allows the user to do the needed actions in the most comfortable way. A browser is still just for surfing the web (at least in most cases) and not for looking at something beautiful.

Coming back to the actual discussion I think it is difficult to get to a good decision. There are pros and cons which I will explain now.

**Pros:**
Often tabs indicate that the content will change. Already with tabs on bottom the content of the tab changes when clicking on another tab. This will not change. But have you ever thought about other things that change when focusing another tab? The first thing that comes to mind is the location bar. Sure, that was logical, wasn't it? The other thing are the forward/back-arrows. The location bar indicates the URL you are currently on, the arrows represent the history. Even though you don't see the change of the arrows right away, their content changes. In my opinion it would be more intuitive having the tabs on top (even though a few things are constant like the home button).

[![](http://www.webdesign-portal.net/wp-content/uploads/2010/04/bookmarksbar_on_tablevel-1024x211.png "bookmarksbar_on_tablevel")](http://www.webdesign-portal.net/wp-content/uploads/2010/04/bookmarksbar_on_tablevel.png)

Wait, the bookmarks toolbar doesn't change. So why should it be below the location bar? It would be way better if it was right on top of the tabs (i.e. right below the window title bar). So just move it on top, so the bookmarks toolbar doesn't disturb the user's view.

[![](http://www.webdesign-portal.net/wp-content/uploads/2010/04/bookmarksbar_on_browserlevel-1024x211.png "bookmarksbar_on_browserlevel")](http://www.webdesign-portal.net/wp-content/uploads/2010/04/bookmarksbar_on_browserlevel.png)

(thanks to [Alex Faaborg](http://blog.mozilla.com/faaborg/) for these [mockups](http://people.mozilla.com/~faaborg/files/daf/bookmarksBarLevel.png))

An important fact in user-centered UI design has always been [Fitt's Law](http://en.wikipedia.org/wiki/Fitts%27s_law). I don't want to explain it here, but one aspect of it is really important: It is easier to click on an element which is located at the top of the screen than on one that is somewhere in the middle of the screen. This is because you can move your cursor straight to the top and it automatically stops there and then you can move it a few pixels down and you are right over the element to click on. Unfortunately nowadays the screen resolutions are very high and a lot of users don't have the windows maximized. Due to this fact Fitt's Law doesn't work here anymore.

Further it is better to have the tabs on top because they do not disturb the vision of the user when watching away from the location bar to the tab's content. Every feature has its disadvantages, though.

**Contras:**
As mentioned above a lot of users don't maximize their windows, so Fitt's Law doesn't work. I cannot mention this enough times: Fitt's Law is still important! It is probably better to place the tabs right on top of the content, like that there is at least less way to move the cursor.

A question I always ask myself is why it would need a change. The most users know the current UI design, why should they get used to another layout? Sure if it was more comfortable it wouldn't be a problem. If a user has always used Google Chrome and now decided to use Firefox, he would probably want to have the tabs on top because he is used to that. But honestly, do we really want to copy Google Chrome? Is its design really that well done? In my opinion there is absolutely no reasons to do so. An unified browser design would be very indeed, but unfortunately that is something that will never be achieved..

Another problem with tabs-on-top would be the menu bar. I don't think it would be good to have the menu bar and the tabs this close together. It would make it much easier to click on a top instead of a menuitem and that is definitely not something the users want. Sure, this will not be a problem anymore when the "Firefox App Button" will be introduced in a future version of Firefox.

In conclusion I think the tabs-on-top feature is very nice-to-have, but as always there are disadvantages, too. Some UX (user experience) experts need to weigh the facts and decide. Either way (tabs on top/bottom) there will be an option to change the layout. In my opinion the tabs should be placed at the bottom where they are now. Having them at the top by default has too many disadvantages.. Please don't forget one thing: eventually the majority of the users needs to be satisfied.
