var gulp = require("gulp");
var project = require("../aurelia.json");
var to5 = require("gulp-babel");
var plumber = require("gulp-plumber");
var webdriverUpdate = require("gulp-protractor").webdriver_update;
var webdriverStandalone = require("gulp-protractor").webdriver_standalone;
var protractor = require("gulp-protractor").protractor;
var del = require("del");
var assign = Object.assign || require("object.assign");
var sourcemaps = require("gulp-sourcemaps");
var e2eConfig = project.e2eTestRunner;

let cleanE2E = function() {
  return del(e2eConfig.dist + "*");
};

let buildE2E = function() {
  return gulp
    .src(e2eConfig.source)
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(to5(e2eConfig.transpiler.options))
    .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: "/src" }))
    .pipe(gulp.dest(e2eConfig.dist));
};

let runE2E = function(cb) {
  return gulp
    .src(e2eConfig.dist + "**/*.js")
    .pipe(
      protractor({
        configFile: "protractor.conf.js",
        args: ["--baseUrl", "http://127.0.0.1:9000"]
      })
    )
    .on("end", function() {
      process.exit();
    })
    .on("error", function(e) {
      throw e;
    });
};

let e2e = gulp.series(webdriverUpdate,cleanE2E, buildE2E, runE2E);

export { e2e as default };
