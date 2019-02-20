let gulp = require('gulp');
let uglify = require('gulp-uglify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let babelify = require('babelify');
let sourcemaps = require('gulp-sourcemaps');
let browserify = require('browserify');
let browserSync = require('browser-sync');


gulp.task('jsmin', function(){

    return browserify({
        entries: ['./src/js/main.js'],
        transform: [
            babelify.configure({
                presets: ['@babel/preset-env']
            })
        ]
    })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));

});


gulp.task('scripts', function() {
   return browserify({
        entries: ['./src/js/main.js'],
        transform: [
            babelify.configure({
                presets: ['@babel/preset-env']
            })
        ]
    })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/js/'));
});


gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('images', function () {
   return gulp.src('./src/**/*.png').pipe(gulp.dest('./dist/'))
});

gulp.task('dev', function() {
    browserSync.init({

        proxy : '127.0.0.1:9090'
    });
    gulp.series('build');

    gulp.watch('./src/**/*.js', gulp.series('scripts', 'reload'));
    gulp.watch('./src/*.html', gulp.series('html', 'reload'));
});

gulp.task('reload', function (done) {
   browserSync.reload();
   done();
});

gulp.task('watch', gulp.series('dev'));
gulp.task('build', gulp.parallel('html', 'jsmin', 'images'));