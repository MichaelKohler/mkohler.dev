---
title: Alpha Review - Using Janitor to contribute to Firefox
permalink: /blog/2016/05/{{title | slug}}/
date: 2016-05-05 15:02:12
---

At the [Firefox Hackathon in Zurich](/blog/2016/firefox-hackathon-zurich-april-2016) we used [The Janitor](http://janitor.technology/) to contribute to Firefox. It's important to note that it's still in alpha and invite-only.

[![Screen Shot 2016-05-05 at 14.37.23](/images/2016/05/Screen-Shot-2016-05-05-at-14.37.23.png)](/images/2016/05/Screen-Shot-2016-05-05-at-14.37.23.png)

The Janitor was started by [Jan Keromnes](https://mozillians.org/en-US/u/janx/), a Mozilla employee. While still in an alpha state, Jan gave us access to it so we could test run it at our hackathon. Many thanks to him for spending his Saturday on IRC and helping us out with everything!

Once you're signed up, you can click on "Open in Cloud9" and directly get to the [Cloud9 editor](http://c9.io/) who kindly sponsor the premium accounts for this project. Cloud9 is a pure-web IDE based on real Linux environments, with an insanely fast editor.

[![Screen Shot 2016-05-05 at 14.38.23](/images/2016/05/Screen-Shot-2016-05-05-at-14.38.23.png)](/images/2016/05/Screen-Shot-2016-05-05-at-14.38.23.png)

[![Screen Shot 2016-05-05 at 14.38.50](/images/2016/05/Screen-Shot-2016-05-05-at-14.38.50.png)](/images/2016/05/Screen-Shot-2016-05-05-at-14.38.50.png)

At the hackathon we ran into a Cloud9 "create workspace" limitation, but according to Jan this should be fixed now.

## Setting up

After an initial "git pull origin master" in the Cloud9 editor terminal, you can start to build Firefox in there. Simply running "./mach build" is enough. For me this took about 12 minutes for the first time, while my laptop still needs more than 50 minutes to compile Firefox. This is definitely an improvement. Further you won't need anything else than a browser!

I had my environment ready in about 15 minutes if you count the time to compile Firefox. Comparing this to my previous setups, this solves a lot of dependency-hell problems and is also way faster.

## Running the newly compiled Firefox

The Janitor includes a VNC viewer which opens a new tab and you can run your compiled Firefox in there. You can start a shell and run "./mach run" in the Firefox directory and you can start testing your changes.

[![Screen Shot 2016-05-05 at 14.49.08](/images/2016/05/Screen-Shot-2016-05-05-at-14.49.08.png)](/images/2016/05/Screen-Shot-2016-05-05-at-14.49.08.png)

[![Screen Shot 2016-05-05 at 14.50.20](/images/2016/05/Screen-Shot-2016-05-05-at-14.50.20.png)](/images/2016/05/Screen-Shot-2016-05-05-at-14.50.20.png)

## Running ESLint

For some of the bugs we tackled at the hackathon, we needed to run ESLint (well, would be good to run this anyway, no matter what part of the code base you're changing). The command looks like this:

```
    user@e49de5f6914e:~/firefox$ ./mach eslint --no-ignore devtools/client/webconsole/test/browser_webconsole_live_filtering_of_message_types.js
    0:00.40 Running /usr/local/bin/eslint
    0:00.40 /usr/local/bin/eslint --plugin html --ext [.js,.jsm,.jsx,.xml,.html] --no-ignore devtools/client/webconsole/test/browser_webconsole_live_filtering_of_message_types.js

    /home/user/firefox/devtools/client/webconsole/test/browser_webconsole_live_filtering_of_message_types.js
    8:1   warning  Could not load globals from file browser/base/content/browser-eme.js: Error: ENOENT: no such file or directory, open '/home/user/firefox/browser/base/content/browser-eme.js'  mozilla/import-browserjs-globals
    8:1   warning  Definition for rule 'mozilla/import-globals' was not found                                                                                                                     mozilla/import-globals
    8:1   error    Definition for rule 'keyword-spacing' was not found                                                                                                                            keyword-spacing
    18:17  error    content is a possible Cross Process Object Wrapper (CPOW)                                                                                                                      mozilla/no-cpows-in-tests

    ✖ 4 problems (2 errors, 2 warnings)

    0:02.85 Finished eslint. Errors encountered.
```

As you might see from the input, running this in the Janitor environment results in not finding the Mozilla-specific rules. The reason here is that the eslint npm package is installed globally. Globally installed eslint can't find the locally installed mozilla-eslint-plugin. In my opinion the easiest fix would be to not install it globally, just within the firefox directory (running "./mach eslint --setup") while spinning up the instance should be enough here.

We could circumvent this problem by changing the global npm prefix and then running it with "/new/path/eslint ..." so it doesn't call the other one. In hindsight, we could just have installed it to the directory and then call it through node_modules.

**Update, May 5, 15:09:** Jan has has fixed this plugin issue :)

## Creating a patch

Creating a patch is really easy, following the [tutorial on MDN](https://developer.mozilla.org/en-US/docs/Mercurial/Using_Mercurial#I%27m_all_used_to_Git_but_how_can_I_provide_Mercurial-ready_patches) is enough. We were very happy to see that the moz-git-tools are already installed by default, so you can just create your own branch, checkin your changes and run "git format-patch -p -k master" to get a Git patch file. Since we need a Mercurial patch, you then run "git-patch-to-hg-patch" and you can upload the resulting file to Bugzilla and you're set!

Those two commands could maybe be aliased by default so running "create-patch" or similar would directly do this for you to further decrease the work you need to do manually.

## Seeing it in action

You can watch it in action on [YouTube](https://www.youtube.com/watch?v=5sNDMIh-iVw).

## Conclusion

After some initial account problems, we didn't really find any other bugs apart from the ESLint situation. Again, thanks a lot to Jan for providing us the environment and letting us test it. This will change the live of a lot of contributors! For now The Janitor supports contributions to Firefox, Chrome, Thunderbird, Servo and KDE. There is also a [GitHub repository](https://github.com/jankeromnes/janitor) for it.
