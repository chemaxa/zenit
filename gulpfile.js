'use strict';
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let scss = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let pug = require('gulp-pug');
let path = require('path');
let clean = require('gulp-clean');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let csso = require('gulp-csso');
let sourcemaps = require('gulp-sourcemaps');

let params = {
    scssPaths: ['./node_modules', './src/scss/blocks', './src/scss/pages'],
    src: 'src',
    build: 'build',
    currentPage: 'complectacia'
};
console.info('CurrentPage: ', params.currentPage);

// Static Server + watching scss/html files
gulp.task('serve', ['clean', 'fonts', 'images', 'pug', 'scss', 'js'], function () {
    browserSync.init({
        server: {
            baseDir: "./" + params.build,
            index: "/html/" + params.currentPage + ".html"
        }
    });
    gulp.watch(params.src + "/pug/**/*.pug", ['pug']);
    gulp.watch(params.src + "/scss/**/*.scss", ['scss']);
});

// Compile scss into CSS & auto-inject into browsers
gulp.task('scss', ['clean'], function () {
    return gulp.src(params.src + "/scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(scss({
            includePaths: params.scssPaths
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'ie 10']
        }))
        .pipe(rename('bundle.css'))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(params.build + '/css/'))
        .pipe(browserSync.stream());
});

gulp.task('pug', ['clean'], function () {
    return gulp.src(params.src + '/pug/pages/' + params.currentPage + '.pug')
        .pipe(pug({
            pretty: true,
            locals: {
                currentPage: params.currentPage
            }
        }))
        .pipe(gulp.dest(params.build + '/html'))
        .pipe(browserSync.stream());
});

gulp.task('js', ['clean'], function () {
    return gulp.src(['./node_modules/jquery/dist/jquery.js', params.src + '/js/**/*'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(params.build + '/js'))
})

gulp.task('images', ['clean'], function () {
    return gulp.src(params.src + '/img/**/*')
        .pipe(gulp.dest(params.build + '/img'))
})

gulp.task('fonts', ['clean'], function () {
    return gulp.src(params.src + '/fonts/**/*')
        .pipe(gulp.dest(params.build + '/fonts'))
})

gulp.task('clean', function () {
    return gulp.src(params.build, {
            read: false
        })
        .pipe(clean());
});

gulp.task('build', ['clean', 'scss', 'pug', 'fonts', 'images', 'js']);
gulp.task('default', ['serve']);