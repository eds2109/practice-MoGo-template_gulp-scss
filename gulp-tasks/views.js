"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("views", () => {
    return gulp.src(paths.views.src)

        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'ERROR',
                    sound: false,
                    message: err.message
                }
            })
        }))

        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(gulp.dest(paths.views.dist))
        .pipe(browsersync.stream());
});