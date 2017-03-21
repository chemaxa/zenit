'use strict';
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let pug = require('gulp-pug');
let sassPaths = ['./node_modules/sass-mediaqueries', './sass/blocks'];
let path = require('path');

let currentPage = 'complectacia';
console.info('CurrentPage: ', currentPage);

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: "./html",
            index: currentPage + ".html"
        }
    });
    gulp.watch("./pug/**/*.pug", ['pug']);
    gulp.watch("./sass/**/*.sass", ['sass']);
    gulp.watch("./html/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./sass/*.sass")
        .pipe(sass({
            includePaths: sassPaths
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'ie 10']
        }))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('pug', function () {
    return gulp.src('pug/pages/' + currentPage + '.pug')
        .pipe(pug({
            pretty: true,
            locals: {
                currentPage
            }
        }))
        .pipe(gulp.dest('html'))
});

gulp.task('default', ['serve']);