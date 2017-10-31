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
    watch: {
        less: {
            files: ['src/main/resources/static/less/**/*.less'],
            tasks: ['less:dev'],
        },
		sass: {
            files: ['src/main/resources/static/less/**/*.{scss,sass}'],
            tasks: ['sass:dev'],
        }
        
    },
    less: {
        dev: {
			options: {
				compress: false
			},
            files: [
                {
                    expand: true,
                    cwd: 'src/main/resources/static/',
                    src: 'less/style.less',
                    dest: 'src/main/resources/static/',
                    ext: '.css',
                    rename:function(dest,src){
                       var nsrc = src.replace(new RegExp("less"),"css");
                       return dest+nsrc;
                    }
                }
            ]
        },
    },
	sass: {
        dist: {
			options: {
				sourcemap: 'none'
			},
            files: [{
				expand: true,
				cwd: 'src/main/resources/static/sass/',
				src: 'style.scss',
				dest: 'src/main/resources/static/css/',
				ext: '.css'
            }]
        },
    },
    /*postcss: { // Begin Post CSS Plugin
		options: {
			map: false,
			processors: [
				require('autoprefixer')({
					browsers: ['last 2 versions']
				})
			]
		},
		dist: {
			src: 'src/main/resources/static/css/style.css'
		}
	},*/
    jshint: {
        all: ['Gruntfile.js',
            'src/main/resources/static/js/application/*.js',

        ]
    },

    clean: {
        deletecss: ['<%= responsivePath %>/css']
    }
});

	// Plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	//grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	//grunt.loadNpmTasks('grunt-postcss');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-contrib-uglify');

  
  
  // Default task(s).
  grunt.registerTask('default', ['less']);
  //grunt.registerTask('default', ['sass']);
};