/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

'use strict';

var SRC = './src/';

var _BUILT = './built';
var BUILT = _BUILT.concat('/');
var BUILT_TEST = _BUILT.concat('.test/');
var BUILT_TYPINGS = _BUILT.concat('/typings/');

var DST = './dist/';

var gulp = require('gulp');
var del = require('del');
var merge = require('merge2');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function (done) {
    del([BUILT, BUILT_TEST, DST]).then(paths => done());
});

gulp.task('build', function () {
    var result = gulp.src(SRC.concat('**/*.ts'))
        .pipe(tsProject(ts.reporter.defaultReporter()));

    return merge([
        result.js.pipe(gulp.dest(BUILT)),
        result.dts.pipe(gulp.dest(BUILT_TYPINGS)),
        gulp.src(SRC.concat('pxtcloud.d.ts')).pipe(gulp.dest(BUILT_TYPINGS)),
    ]);
});

var glob = require('glob');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('bundle', function () {
    var bundle = browserify(
        {
            entries: glob.sync(BUILT.concat('**/*.js')),
            standalone: 'PxtCloud',
        }).bundle();

    var result = bundle
        .pipe(source('pxtcloud.js'))
        .pipe(buffer())
        .pipe(gulp.dest(DST))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(DST));

    return merge([
        result,
        gulp.src(BUILT_TYPINGS.concat('**')).pipe(gulp.dest(DST)),
    ]);
});

gulp.task('default', gulp.series('clean', 'build', 'bundle'));