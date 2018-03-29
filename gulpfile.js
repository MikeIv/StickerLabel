"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require('gulp-svgmin');
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var gcmq = require('gulp-group-css-media-queries');
var sourcemaps = require('gulp-sourcemaps');
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");


gulp.task("clean", function () {
  return del("build");
});

gulp.task("style", function() {
  gulp.src("src/less/style.less")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gcmq())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("posthtml", function () {
  gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("pretty", function () {
  return gulp.src("src/img/**/*.{svg}")
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gulp.dest("build/img"))
});

gulp.task("sprite", function () {
  return gulp.src("src/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/*.{svg,png,jpg,gif}",
    "src/js/*.js",
    "src/*.html"
  ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});


gulp.task("build", function (done) {
  run("clean", "copy", "style", "pretty", "sprite", done);
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
  }) ;

  gulp.watch("src/less/**/*.less", ["style"]);
  gulp.watch("src/*.html", ["posthtml"]);
});
