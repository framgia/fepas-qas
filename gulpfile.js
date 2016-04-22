var config = {
    jsx: {
        src: 'src',
        dest: 'build',
        get watch() {
            return this.src + '/**/*.jsx'
        }
    },
};
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');
gulp.task('browserify', function() {
    return browserify(config.jsx.src + '/app.jsx', {basedir: __dirname})
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .on("error", function(e) {
            console.log("Error: " + e.message);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest(config.jsx.dest));
});

gulp.task('watch', function() {
    gulp.watch(config.jsx.watch, ['browserify']);
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            host: '127.0.0.1',
            port: 8080,
            livereload: true
        }));
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
