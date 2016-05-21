var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('default', ['watch'])

gulp.task('sass', () => {
  return gulp.src('scss/styles.scss')
    .pipe(sass({
      includePaths: ['./node_modules']
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('watch', () => {
  gulp.watch('scss/styles.scss', ['sass'])
})
