import gulp from 'gulp';
import project from '../aurelia.json';

export default function copyFonts() {
  return gulp.src(project.paths.fontsInput)
    .pipe(gulp.dest(project.paths.fontsOutput));
}

