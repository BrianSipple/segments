/*global -$*/
'use strict';

var
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),

    config = {
        paths: {
            srcImages: 'img'
        },
        opts: {
            images: {
                progressive: true,
                interlaced: true,
                // don't remove IDs from SVGs -- we want them
                // as hooks for embedding and styling
                svgoPlugins: [ { cleanupIDs: false } ]
            }
        }
    };

gulp.task('images', function () {

    return gulp.src(config.paths.srcImages + '/**/*.{gif,jpg,png,svg}')
        .pipe($.imagemin(config.opts.images))
        .pipe(gulp.dest(config.paths.srcImages));
});



