let gulp = require("gulp");
let sass = require("gulp-sass");
let browserify = require("browserify");
let babelify = require('babelify');
let fs = require("fs");

gulp.task("css", function()
{
    "use strict";

    gulp.src("resources/sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./build/css/"));
});

gulp.task("js", function()
{
    "use strict";

    browserify({entries: "resources/js/main.js", debug: true})
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(fs.createWriteStream("./build/js/bejeweled.js"));
});

gulp.task("default", function()
{
    "use strict";

    gulp.watch("resources/sass/**/*.scss", ["css"]);
    gulp.watch("resources/js/**/*.js", ["js"]);
});