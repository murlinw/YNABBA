"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');
var print = require('gulp-print');
var ts = require('gulp-typescript')

var tsfiles = ['src/app/**/*.ts'];

/**
 * Compilation of typescript files into javascript
 */
gulp.task('tscompile', function () {
    var tsProject = ts.createProject('./tsconfig.json', {
        typescript: require('typescript'),
        outFile: 'app.js'
    });

    var tsResult = tsProject.src(tsfiles)
                            .pipe(ts(tsProject));

    return tsResult.js
            .pipe(print(function(filepath) {
                return "build: " + filepath;
            }))
            .pipe(gulp.dest('./build/app'));
});

gulp.task('systemjs', function () {
    return gulp.src('./systemjs.config.js')
               .pipe(gulp.dest('./build'))
});

gulp.task('print', function() {
  gulp.src(tsfiles)
    .pipe(print(function(filepath) {
      return "built: " + filepath;
    }))
});

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "tscompile", "assets", "systemjs"], function () {
    console.log("Building resources...");
});

/* get the index file to the root of the build */
gulp.task("index", function(){
    return gulp.src(["index.html"])
        .pipe(gulp.dest("build"));
});
/* copy node server to build folder */
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json"], { cwd: "src/server/**" })
        .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function(){
    return gulp.src(["styles.css"])
        .pipe(gulp.dest("build"));
});
/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        // 'es6-shim/es6-shim.min.js',
        'systemjs/dist/system-polyfills.js',
        // 'angular2/bundles/angular2-polyfills.js',
        // 'angular2/es6/dev/src/testing/shims_for_IE.js',
        'systemjs/dist/system.src.js',
        'rxjs/bundles/Rx.js',
        // 'angular2/bundles/angular2.dev.js',
        // 'angular2/bundles/router.dev.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/node_modules"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs'], function () {
    console.log("Building the project ...");
});