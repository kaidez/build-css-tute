// Single var pattern of gulp (require) stuff in full effect!!!

var gulp = require("gulp"), // Bring in gulp
    exec = require('child_process').exec, // Run CLI commands via node
    Q = require('q'), // Manage promises,
    jade = require("gulp-jade"), // Jade task
    uncss = require("gulp-uncss"), // Remove unused css selectors
    minifyCSS = require("gulp-minify-css"), // Minify CSS
    autoprefixer = require('gulp-autoprefixer'), // Vendor prefixes
    csslint = require("gulp-csslint"), // Lint CSS
    concatCss = require('gulp-concat-css'), // Concatenating .css files
    imagemin = require('gulp-imagemin'), // Minifying images
    watch = require("gulp-watch"), // Watch files changes
    connect = require("gulp-connect"); // Livereload on port 8080

// End single var pattern



// Run grunt tasks in gulp
require("gulp-grunt")(gulp);



/*
 *  ===================================================================
 *  | STORE PREPROCESSOR FILE REFERENCES IN VARIABLES |
 *  ===================================================================
 */
var jadeFiles = ["jade/index.jade", "jade/**/*.jade"], // Jade
    lessFiles = ["css-build/*.less", "css-build/**/*.less"], // LESS
    coffeeFiles = ["coffee/*.coffee"]; // Coffeescript



    /*
     * IGNORE ARRAY
     * ============
     * Selectors NOT to be removed when "gulp uncss" task runs.
     * Try to list them alphabetically and in the following order:
     *
     * 1. Page elements first (<nav>, <aside>, etc.)
     * 2. IDs second
     * 3. Classes third
     */
    ignoreArray = [
      "nav",
      "ol",
      "ul",
      ".all-player-info",
      ".btn",
      ".btn-info",
      ".cycle-slide",
      ".player-info",
      ".player-name",
      ".scroll-nav",
      ".scroll-nav__item",
      ".scroll-nav__link",
      ".scroll-nav__list",
      ".scroll-nav__section"
    ];



/*
 *  ===================================================================
 *  | JADE TASK |
 *  ===================================================================
 */
// Output Jade Files to build "build/index.html"
gulp.task("jade", function () {
  return gulp.src("jade/index.jade")
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest("build"))
  .pipe(connect.reload());
});



/*
 *  ===================================================================
 *  | CSS BUILD TASKS |
 *
 * Running "gulp buildcss" performs the following sequence of tasks...
 *
 * 1. "gulp less" task
 * 2. "gulp concat" task that takes "gulp less" as a hint(*)
 * 3. "gulp outputcss" task that takes "gulp concat" as a hint(*)
 * 4. "gulp outputcss" removes unused CSS, minifies, lints, &   
      auto-prefixes it
 * 5. "gulp jade" which rebuilds/resets build/index.html
 * 6. "gulp critical" to extract critical path CSS to build/index.html
 *
 * Some tasks return q promises so all files are ready for a given task
 *
 * (*) gulp "hints" are cool...read more about them at:
 * https://github.com/gulpjs/gulp/blob/master/docs/API.md
 *  ===================================================================
 */

// The core task for building out the site's CSS
gulp.task('buildcss', ['outputcss', 'jade', 'critical']);


// "gulp less" task
// ================
// Process .less files using node exec
// Returns a promise with q
gulp.task("less", function () {
  var deferred = Q.defer();
  setTimeout(function() {
    exec("lessc css-build/styles.less > css-build/styles.css");
    return deferred.promise;
  }, 1000);
});



// "gulp concat" task
// ==================
// Concatenate "css-build/styles.css" and "css-build/bootstrap.css"
// Takes "less" as a gulp hint
// Returns a promise with q
gulp.task('concat', ['less'], function() {
  var deferred = Q.defer();
  setTimeout(function() {
    return gulp.src(['css-build/bootstrap.css', 'css-build/styles.css'])
    .pipe(concatCss('styles.min.css'))
    .pipe(gulp.dest('build/css/'));
    return deferred.promise;
  }, 1000);
});



// "gulp outputcss" task
// =====================
// uncss, auto-prefix, minify and lint the css
// Takes "concat" as a gulp hint
// Returns a promise with q
gulp.task("outputcss", ['concat'],function () {

 // Set this up so "outputcss" returns a promise
 var deferred = Q.defer();
  setTimeout(function() {
    gulp.src('build/css/styles.min.css')
    .pipe(uncss({
      html: ["build/index.html"],
      ignore: ignoreArray
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest("build/css/"))
    .pipe(csslint({
      "important": false,
      "duplicate-background-images": false,
      "ids": false,
      "text-indent": false
    }))
    .pipe(csslint.reporter())
    .pipe(connect.reload())
   }, 4000);
  return deferred.promise;
});



// "gulp critical" task
// =====================
// Extract critical path css to "build/index.html" 
// This a grunt task that is getting executed with gulpjs
// Returns a promise with q
gulp.task("critical", function () {
  var deferred = Q.defer();
  setTimeout(function() {
    gulp.run("grunt-critical");
      return deferred.promise;
  }, 6000);
});

/*
 *  ===================================================================
 *  | END CSS BUILD TASKS |
 *  ===================================================================
 */



/*
 *  ===================================================================
 *  | IMAGE MINIFICATION TASK |
 *
 *  Take all images in "imagemin/" & minify them out to "build/img/"
 *  ===================================================================
 */

gulp.task('images', function () {
  return gulp.src('image-min/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}]
    }))
  .pipe(gulp.dest('build/img'));
});



/*
 *  ===================================================================
 *  | COFFESCRIPT TASK |
 *
 *  Process files in "coffee/" to "build/js/main.js"
 *  ===================================================================
 */
gulp.task("coffee", function () {
  exec("coffee --join build/js/main.js --compile coffee/common.coffee coffee/scrollnav.coffee coffee/players.coffee")
});



/*
 *  ===================================================================
 *  | "gulp-grunt" TASKS...RUN GRUNT TASKS VIA GULP!!!! |
 *  ===================================================================
 */

// BOWERCOPY TASKS
// Copy over ALL the Bower Components with "grunt-bowercopy!!!
gulp.task("bowercopy", function () {
  gulp.run("grunt-bowercopy");
});

// Copy over Bootstrap core .css only
gulp.task("bowerbscss", function () {
  gulp.run("grunt-bowercopy:bscss");
});

// Copy over jQuery Cycle2 plugin only
gulp.task("bowercycle", function () {
  gulp.run("grunt-bowercopy:cycle2");
});

// Copy over jQuery v.1.11.1 only
gulp.task("bowerjq", function () {
  gulp.run("grunt-bowercopy:jq");
});

// Copy over scrollNav only
gulp.task("bowerscroll", function () {
  gulp.run("grunt-bowercopy:scroll");
  });

// Serve a website from "build/" and run it on port 8080
gulp.task("connect", function () {
  connect.server({
    root: "build/",
    livereload: true
  });
});

/*
 *  ===================================================================
 *  | STOP "gulp-grunt" TASKS |
 *  ===================================================================
 */



/*
 *  ===================================================================
 *  | START WATCH TASK |
 *
 *  If either pre-processor or "build/" files change and the site
 *  is currently running in the browser, refresh it via
 *  livereload.
 *
 *  Be careful of watching a lot of files because that may eat up
 *  computer memory...at least, it does in Grunt.
 *  ===================================================================
 */

 gulp.task("watch", function () {

  gulp.watch(jadeFiles, ["jade"]);
  gulp.watch(lessFiles, ["buildcss"]);
  gulp.watch(coffeeFiles, ["coffee"]);
  gulp.watch(["build/index.html", "build/css/*.css", "build/js/*.js"]);
});

// Simultaneously run "gulp connect" and "gulp spy"
gulp.task('spy', ['connect', 'watch']);