/* gulpfile.js */

// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
//var stylus = require('gulp-stylus');  // To compile Stylus CSS.

// Define some paths.
var paths = {
    app_js: ['./src/module/myTestBankApp.js']
};

var index = 1;

// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function () {

    try {
        // Browserify/bundle the JS.
        browserify(paths.app_js)
            .transform(reactify)
            .bundle()
            .pipe(source('myTestBank.js'))
            .pipe(gulp.dest('../edu-platform-webapp20151204/src/main/webapp/js/'));

        index++;
        console.log("重新编译打包:" + index + "==============");
    } catch (err) {
        console.log(err);
        console.log('go on:=== :-)');
    }
});

gulp.task('watch', function () {
    "use strict";
    gulp.watch('./src/**/*.js', ['js']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['js', 'watch']);