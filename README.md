mkohler.codes
===

[mkohler.codes](https://mkohler.codes) is my personal CV which contains public documentation of my current and previous work, my education and general skills.

Setting up
-----

After cloning the repository change to the newly created folder and install the third-party dependencies.

```
$ npm install
```

Running the project
------

To create a local webserver to serve the content of the repository run

```
$ npm start
```

This project includes a watcher to pick up changes on files and directly reloads the page or injects the appropriate changes.

Building the project
-----

```
$ npm run build
```

This will create a few folder ```dist``` which will include all necessary files to upload to a web server.

LICENSE
-----

In general this project is published under the MIT license, apart from the following files which you are **not** allowed to use freely.

* src/app/theme/theme.css
