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
let runSequence = require('run-sequence');
let plumber = require('gulp-plumber');
let fs = require('fs');
let argv = require('yargs').argv;

let params = {
    baseHref: '',
    scssPaths: ['./node_modules', './src/scss', './src/components'],
    pugBase: 'src',
    src: 'src',
    build: 'build',
    currentPage: argv.page || 'index'
};

let pages = fs.readdirSync(__dirname + '/src/pug/pages');
console.info('CurrentPage: ', params.currentPage);

// Compile scss into CSS & auto-inject into browsers
gulp.task('scss', function () {
    return gulp.src(params.src + "/scss/main.scss")
        .pipe(plumber())
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

gulp.task('pug', function () {
    return gulp.src(params.src + '/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            basedir: params.pugBase,
            pretty: true,
            locals: {
                baseHref: params.baseHref,
                pages
            }
        }))
        .pipe(gulp.dest(params.build + '/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src([
            './node_modules/jquery/dist/jquery.js',
            params.src + '/js/**/*'
        ])
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(params.build + '/js'))
        .pipe(browserSync.stream());
})

gulp.task('images', function () {
    return gulp.src(params.src + '/img/**/*')
        .pipe(gulp.dest(params.build + '/img'))
})

gulp.task('fonts', function () {
    return gulp.src([
            './node_modules/font-awesome/fonts/*',
            params.src + '/fonts/**/*'
        ])
        .pipe(gulp.dest(params.build + '/fonts'))
})

gulp.task('clean', function () {
    return gulp.src(params.build, {
            read: false
        })
        .pipe(clean());
});

gulp.task('build', function (done) {
    params.baseHref = 'zenit/build/';
    runSequence('clean', 'scss', 'pug', 'fonts', 'images', 'js', done)
});

// Static Server + watching scss/html files
function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + params.build,
            index: "/" + params.currentPage + ".html"
        }
    });
    gulp.watch(params.src + "/js/**/*.js", ['js']);
    gulp.watch([params.src + "/components/**/*.pug", params.src + "/pug/**/*.pug"], ['pug']);
    gulp.watch([params.src + "/components/**/*.scss", params.src + "/scss/**/*.scss", ], ['scss']);
}

gulp.task('serve', function () {
    runSequence('clean', 'scss', 'pug', 'fonts', 'images', 'js', serve)
});

gulp.task('default', ['serve']);