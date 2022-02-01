const gulp = require('gulp')
const gulpless = require('gulp-less')
const postcss = require('gulp-postcss')
const debug = require('gulp-debug')
var csso = require('gulp-csso')
const autoprefixer = require('autoprefixer')
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
const NpmImportPlugin = require('less-plugin-npm-import')

gulp.task('less', function () {
  const plugins = [autoprefixer()]

  return gulp
  .src('./src/style/themes/*-theme.less')
  .pipe(debug({title: 'Less files:'}))
  .pipe(
    gulpless({
      javascriptEnabled: true,
      plugins: [new NpmImportPlugin({prefix: '~'})],
    }),
  )
  .pipe(postcss(plugins))
  .pipe(
    csso({
      debug: true,
    }),
  )
  .pipe(gutil.env.env === 'prod' ? minifyCss() : gutil.noop())
  .pipe(gulp.dest(gutil.env.env === 'prod' ? './dist':'./public'));
})