'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
requireDir('./gulp-tasks');

var exec = require('child_process').exec;


//dev tasks
gulp.task('dev-build', function(){
	runSequence(['css-lint', 'devCopyJS', 'handlebarsCompileDev'],
              function() {
    		//watcher task for JS changes
			gulp.watch(["./web/webroot/WEB-INF/_ui-src/responsive/simon-fe-source/js/**/*.js"], ['devCopyJS', function(event) {
			  console.log('JS changes done. Proceed with Testing.');
			}]);
			//watcher task for Templates changes
			gulp.watch(["./web/webroot/WEB-INF/_ui-src/responsive/simon-fe-source/templates/**/*.html"], ['handlebarsCompileDev', function(event) {
			  console.log('Templates changes done. Proceed with Testing.');
			}]);
			//watcher task for CSS changes
			gulp.watch(["./web/webroot/WEB-INF/_ui-src/responsive/simon-fe-source/scss/**/*.scss"], ['sass', function(){
				console.log('CSS changes done. Proceed with Testing.');
			}]);
			
			console.log('watching changes - CSS, JS, and handlebar templates');
			
		});
	});

//the dev task above times out on the child process, hence the inclusion of two builds.

gulp.task('prod-build', function(callback){
	runSequence('optimizeJSProd');
	runSequence('prodCopy');
});