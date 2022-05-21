
var gulp = require("gulp"),
	webserver = require('gulp-webserver');

gulp.task('default', ['webserver']);

gulp.task('webserver',function(){
	gulp.src('./')
	.pipe(webserver({
		livereload : true,
		open : true,
		port : 9494
	}));
});