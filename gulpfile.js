
<<<<<<< HEAD
const gulp          = require('gulp'),
			sass          = require('gulp-sass'),
			browserSync   = require('browser-sync'),
			concat        = require('gulp-concat'),
			uglify        = require('gulp-uglify'),
			cleancss      = require('gulp-clean-css'),
			babel					= require('gulp-babel'),
			// rename        = require('gulp-rename'),
			autoprefixer  = require('gulp-autoprefixer'),
			pipeline      = require('readable-stream').pipeline
			notify        = require('gulp-notify');
			// gutil         = require('gulp-util' ),
			// rsync         = require('gulp-rsync'),
			// imageResize   = require('gulp-image-resize'),
			// imagemin      = require('gulp-imagemin'),
			// del           = require('del');
=======
const   gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		// rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify');
		// gutil         = require('gulp-util' ),
		// rsync         = require('gulp-rsync'),
		// imageResize   = require('gulp-image-resize'),
		// imagemin      = require('gulp-imagemin'),
		// del           = require('del');
>>>>>>> 4edf7116d2cb0e7059e3a95776b59f5ddeafdbea




// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// Sass|Scss Styles
gulp.task('styles', function() {
	return gulp.src('app/sass/main.sass')
<<<<<<< HEAD
	.pipe(sass({ outputStyle: 'compressed' }).on("error", notify.onError()))
=======
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
>>>>>>> 4edf7116d2cb0e7059e3a95776b59f5ddeafdbea
	.pipe(autoprefixer())
	// .pipe(cleancss()) // Opt., comment out when debugging
	.pipe(gulp.dest('app/dist'))
	.pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
		'node_modules/imask/dist/imask.js',
		'node_modules/bootstrap-autocomplete/dist/latest/bootstrap-autocomplete.js',
		'node_modules/bootstrap-validate/dist/bootstrap-validate.js',
<<<<<<< HEAD
		'node_modules/slick-carousel/slick/slick.js',
		'app/js/main.js',
		'app/js/index.js',
	])
	// .pipe(babel({
	// 	presets: ['@babel/env'],
	// 	ignore: [
	// 		'node_modules/jquery/dist/jquery.js',
	// 		'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
	// 		'node_modules/imask/dist/imask.js',
	// 		'node_modules/bootstrap-autocomplete/dist/latest/bootstrap-autocomplete.js',
	// 		'node_modules/bootstrap-validate/dist/bootstrap-validate.js',
	// 		'node_modules/slick-carousel/slick/slick.js',
	// 		'app/js/index.js',
	// 	]
	// }))
=======
		'app/js/main.js',
		'app/js/index.js',
	])
>>>>>>> 4edf7116d2cb0e7059e3a95776b59f5ddeafdbea
	.pipe(concat('main.js'))
	// .pipe(uglify()) // Minify js (opt.)
	.pipe(gulp.dest('app/dist'))
	.pipe(browserSync.reload({ stream: true }))
});

// Images @x1 & @x2 + Compression | Required graphicsmagick (sudo apt update; sudo apt install graphicsmagick)
gulp.task('img1x', function() {
	return gulp.src('app/img/_src/**/*.*')
	.pipe(imageResize({ width: '50%' }))
	.pipe(imagemin())
	.pipe(gulp.dest('app/img/@1x/'))
});

gulp.task('img2x', function() {
	return gulp.src('app/img/_src/**/*.*')
	.pipe(imageResize({ width: '100%' }))
	.pipe(imagemin())
	.pipe(gulp.dest('app/img/@2x/'))
});

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/*.html')
<<<<<<< HEAD
		.pipe(browserSync.reload({ stream: true }))
=======
	.pipe(browserSync.reload({ stream: true }))
>>>>>>> 4edf7116d2cb0e7059e3a95776b59f5ddeafdbea
});

// Img Processing Task for Gulp 4
gulp.task('img', gulp.parallel('img1x', 'img2x'));

<<<<<<< HEAD
// gulp.task('compress', function () {
//   return pipeline(
// 		gulp.src('./app/dist/main.js'),
// 		uglify(),
// 		gulp.dest('./app/dist')
//   );
// });

=======
>>>>>>> 4edf7116d2cb0e7059e3a95776b59f5ddeafdbea
// Watch changes
gulp.task('watch', function() {
	gulp.watch('app/sass/**/*', gulp.parallel('styles'));
	gulp.watch('app/js/**/*.js', gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	// gulp.watch('app/img/_src/**/*', gulp.parallel('img')); // GraphicsMagick watching image sources if allowed.
});

// gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'));
gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
