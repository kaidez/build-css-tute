# CSS BUILD PROCESS TUTORIAL

This is the source code for a the screencast I posted at https://www.youtube.com/watch?v=UDm6e7OKi4M with a coresponding blog post at http://kaidez.com/css-build-demo/. It's based on a code refactor I had to do for work and I used it as a test project for my process.

Everything is under an MIT license so feel free to use it as you see fit on my blog.

## HOW THE CODE WORKS
The production-code is in `build`. Run it by either opening `index.html` in a web browser or running the the code from the server setup of your choice.

## PLAY WITH THE BUILT OUT CODE
The files in `build` get built out using three pieces of pre-processor software: [Jade](http://jade-lang.com/), [LESS](http://lesscss.org/) and [Coffeescript](http://coffeescript.org/).

There's one built-out web page: `build/index.html` and it's built out with Jade.

All styles are in `build/css/styles.min.css` with LESS. The styles contain both custom code and a custom build-out of [Twitter Bootstrap's](http://getbootstrap.com/) core CSS.

To understand what the styles do, it's best to go to `css-build` and review both `styles.less` and everything in the `import` folder...things are commented quite well in there.

All the JavaScript is processed with [Coffeescript](http://coffeescript.org/), which builds out the code to `build/js/main.js`. The preprocess files are in `coffee` and are commented quite nicely.

To play with all the preprocessor code, you would need to download the following software:

* [Node/npm](http://nodejs.org/download/)
* [Git](http://git-scm.com/downloads)
* [Bower](http://bower.io)
* [Grunt CLI global install](http://gruntjs.com/getting-started)
* [Gulp global install](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

Node/npm will download all the all the development-level dependencies listed as `devDependencies` inside `package.json`.

While source code control is not required to do anything with either the built-out files or various pre-processors, Git is required to interact with Bower. This is because Bower will download the packages listed as dependencies in `bower.json` and these dependencies are almost always downloaded from on GitHub via Git.

npm will install both Grunt and Gulp locally to the project folder, but their respective globally-installed versions need to be installed as well. After Node/npm is installed, thinstall Grunt and Gulp as follows:

### Grunt
    $ npm install -g grunt-cli

### Gulp
    $ npm install --global gulp

## Install devDependencies and dependencies
After all these things have been installed, you can install the `devDependencies` listed in `package.json`:

    $ npm install

And then install the `dependencies`

    $ bower install

In order to keep the `devDependencies` up to date, it's best to *globally* install [npm-check-updates](https://www.npmjs.com/package/npm-check-updates):

    $ npm install -g npm-check-updates

From there, use the command line to periodically navigate to the spot in your project where `package.json` is located and run:

    $ npm-check-updates

This will check to see if the `devDependencies` listed in `package.json` have been updated on [https://www.npmjs.com/](https://www.npmjs.com/). If they have, you will be walked through the process of updating them.

Bower can check for updates on its own and without third party software:

    $ bower list

This will check to see if the `dependencies` listed in `bower.json` have been updated on [http://bower.io/](https://bower.io/). If they have, you can update them:

    $ bower update

This is a lazy way of updating Bower packages...read about updating with options at [http://bower.io/docs/api/#update](http://bower.io/docs/api/#update).
