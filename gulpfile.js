"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');
var print = require('gulp-print');
var ts = require('gulp-typescript')
var jspm = require('gulp-jspm-build');
var concat = require('gulp-concat');
var uglyify = require("gulp-uglify");
var minify = require("gulp-minify");

var tsfiles = ['src/app/**/*.ts'];
var htmlfiles = ['src/app/**/*.html'];

/**
 * Compilation of typescript files into javascript
 */
gulp.task('tscompile', function () {
    var tsProject = ts.createProject('./tsconfig.json', {
        typescript: require('typescript')
    });
    var tsResult = tsProject.src(tsfiles)
                            .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('.'));
});

/**
 * Bundles our app with angular components and our components
 */
gulp.task('jspm_bundle', ['tscompile'], function () {
    return jspm({
        bundleOptions: {
            minify: true,
            mangle: false
        },
        bundleSfx: true,
        bundles: [
            { src: './src/app/app.js', dst: 'bundle.min.js'}
        ],
        config: 'config.js'
    })
    .pipe(gulp.dest('build/app'))
});

gulp.task('print', function() {
  gulp.src(htmlfiles)
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
gulp.task("resources", ["server", 'jspm_bundle' , "assets", 'static_resources'], function () {
    console.log("Building resources...");
});

/**
 * Task to copy static resources to the build folder
 * (index.html and other html files)
 */
gulp.task("static_resources", ["index"], function () {
    return gulp.src(htmlfiles)
                .pipe(gulp.dest("build/app"));
});

/* get the index file to the root of the build */
gulp.task("index", function(){
    return gulp.src(["src/index.html"])
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
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js',
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(concat('vender.js'))
        .pipe(gulp.dest("build/libs"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs'], function () {
    console.log("Building the project ...");
});