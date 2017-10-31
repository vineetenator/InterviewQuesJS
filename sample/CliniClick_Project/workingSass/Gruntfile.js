module.exports = function(grunt) {
	var readJSFile = function(data, path) {
		var finalArray = [];
		for (var item in data.main) {
			finalArray.push('<%= responsivePath %>/' + data.main[item].file);
		}
		return finalArray;
	};
	// Project configuration.
	grunt.initConfig({
		responsivePath: 'src/main/resources/static',
		pkg: grunt.file.readJSON('package.json'),
		// Tasks
		watch: { // Compile everything into one task with Watch Plugin
			sass: {
				files: ['<%= responsivePath %>/sass/**/*.{scss,sass}'],
				//tasks: ['sass'],
				tasks: ['sass', 'postcss', 'cssmin']
			},
			// js: {
				// files: '<%= responsivePath %>/js/**/*.js',
				// tasks: ['jshint', 'uglify']
			// }			
		},
	   
		sass: { // Begin Sass Plugin
			dist: {
				options: {
					sourcemap: 'none',
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: '<%= responsivePath %>/sass/',
					src: 'style.scss',
					dest: '<%= responsivePath %>/css/',
					ext: '.css'
				}]
			},
		},
		postcss: { // Begin Post CSS Plugin
			options: {
				map: false,
				processors: [
					//require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
				]
			},
			dist: {
				src: '<%= responsivePath %>/css/style.css'
			}
		},
		cssmin: { // Begin CSS Minify Plugin
			target: {
				files: [{
					expand: true,
					cwd: '<%= responsivePath %>/css',
					src: ['style.css', '!*.min.css'],
					dest: '<%= responsivePath %>/css',
					ext: '.min.css'
				}]
			}
		},
		uglify: { // Begin JS Uglify Plugin
			build: {
				src: ['<%= responsivePath %>/js/**/*.js'],
				dest: '<%= responsivePath %>/js/cliniclick.min.js'
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'<%= responsivePath %>/js/**/*.js'
			]
		}
	});

	// Load Grunt plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register Grunt tasks
	grunt.registerTask('default', ['sass', 'postcss']);
};