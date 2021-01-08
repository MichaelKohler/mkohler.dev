---
title: my mozconfig
permalink: /blog/2010/04/{{title | slug}}/
layout: "blogpost.liquid"
date: 2010-04-14 17:55:11
---

As you probably know I have already fixed a few bugs in Mozilla Firefox. For this I need to build Firefox from the source files. Therefore I need a "mozconfig" which sets some general options how to build Firefox. Feel free to copy it if you want to use it too:

```
ac_add_options --enable-application=browser
mk_add_options MOZ_CO_PROJECT=browser`

ac_add_options --enable-tests

export MOZ_DEBUG_SYMBOLS=1
export CFLAGS="-gstabs+"
export CXXFLAGS="-gstabs+"
export BUILD_OFFICIAL=1

mk_add_options MOZ_OBJDIR=../fx-obj
```
