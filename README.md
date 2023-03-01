mkohler.dev
===

[mkohler.dev](https://mkohler.dev) is my personal CV which contains public documentation of my current and previous work, my education and general skills. It also hosts my blog.

Setting up
-----

After cloning the repository change to the newly created folder and install the third-party dependencies.

```
$ npm ci
```

Running the project
------

To create a local webserver to serve the content of the repository run

```
$ git submodule init && git submodule update
$ npm start
```

This project includes a watcher to pick up changes on files and directly reloads the page or injects the appropriate changes.

Building the project
-----

```
$ npm run build
```

This will create a few folder ```_site``` which will include all necessary files to upload to a web server.

LICENSE
-----

In general this project is published under the MIT license.

However you might not be able to use the design, as I bought it and adjusted it. It's not freely available.
