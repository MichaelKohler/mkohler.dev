---
title: Mozilla Switzerland IoT Hackathon in Lausanne
date: 2016-04-24 13:04:27
---

On April 2nd 2016 we held a small [IoT Hackathon in Lausanne](http://www.meetup.com/Mozilla-Meetup-Romandie/events/229797456/) to brainstorm about the Web and IoT. This was aligned with the [new direction that Mozilla is taking on](https://blog.mozilla.org/futurereleases/2016/03/01/update-on-connected-devices/).

**Preparation**
We started to organize the [Hackathon on Github](https://github.com/mozillach/participation/issues/12), so everyone can participate. Geoffroy was really helpful to organize the space for it at [Liip.ch](https://www.liip.ch). Thanks a lot to them, without them organizing our events would be way harder!

**The Hackathon**
We expected more people to come, but as mentioned above, this is our first self-organized event in the French speaking part of Switzerland. Nevertheless we were four persons with an interest in hacking something together.

<video src="https://fat.gfycat.com/SereneSnappyAuk.webm" controls="controls" width="300" height="150"></video>

Geoffroy and Paul started to have a look at [Vaani.iot](https://github.com/mozilla/vaani.iot), one of the projects that Mozilla is currently pushing on. They started to build it on their laptops, unfortunately the Vaani documentation is not good enough yet to see the full picture and what you could do with it. We're planning to [send some feedback](https://github.com/mozillach/participation/issues/37) regarding that to the Vaani team.

In the meantime Martin and I set up my Raspberry Pi and started to write a small script together that reads out the temperature from one of the sensors. Once we've done that, I created a small API to have the temperature returned in JSON format.

![](/images/2016/04/iot1.jpg)

At this point, we decided we wanted to connect those two pieces and [create a Web app](https://github.com/mozillach/mozilla-iot-hackaton) to read out the temperature and announce it through voice. Since we couldn't get Vaani working, we decided to use the [WebSpeech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for this. The voice output part is available in Firefox and Chrome right now, therefore we could achieve this goal without using any non-standard APIs. After that Geoffroy played around with the voice input feature of this API. This is currently only working in Chrome, but there is a [bug to implement it in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1248897) as well. In the spirit of the open web, we decided to ignore the fact that we need to use Chrome for now, and create a feature that is built on Web standards that are on track to standardization.

![](/images/2016/04/iot2.jpg)

After all, we could achieve something together and definitely had some good learnings during that.

**Lessions learned**

*   Organizing a hackathon for the first time in a new city is not easy
*   We probably need to establish an "evening-only" meetup series first, so we can attract participants that identify with us
*   We could use this opportunity to document the Liip space in Lausanne for future events on our [Events page on the wiki](https://wiki.mozilla.org/Switzerland/Events)
*   Not all projects are well documented, we need to work on this!

**After the Hackathon**

Since I needed to do a project for my studies that involves hardware as well, I could take the opportunity and take the sensors for my project.

![](/images/2016/04/iot3.png)

You can find the Source Code on the [MozillaCH github organization](https://github.com/mozillach/raspberry-temp-motion). It currently regularly reads out the two temperature sensors and checks if there is any movement registered by the movement sensor. If the temperature difference is too high it sends an alarm to the NodeJS backend. The same goes for the situation where it detects movement. I see this as a first step into my own take on a smart home, it would need a lot of work and more sensors to be completely useful though.
