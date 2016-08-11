module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-usebanner');

	var basePaths = {
		src: 'src/',
		dest: 'dist/',
		example: 'example/'
	};

	var paths = {
		scripts: {
			src:basePaths.src+'*.js',
			dest:basePaths.dest,
			example: basePaths+'lib/'
		},
		styles: {
			src: basePaths.src+'*.css',
			dest: basePaths.dest,
			example: basePaths+'lib/'
		}
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
			' * BootstrapSelection v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
			' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
			' */\n',
	    usebanner: {
	    	options: {
	    		banner: "<%= banner %>",
	    		position: 'top'
	    	},
	    	files: {
	    		src: ['dist/*','example/lib/<%= pkg.name %>/*','!dist/*.json','!example/lib/<%= pkg.name %>/*.json']
	    	}
	    },
		copy: {
			files: {
				expand: true,
				cwd: basePaths.src,
				src: '**',
				dest: basePaths.dest,
				filter: 'isFile'
			},
			example: {
				expand: true,
				cwd: basePaths.dest,
				src: '**',
				dest: basePaths.example+'lib/<%= pkg.name %>/',
				filter: 'isFile'
			}
		},
		uglify: {
			dist: {
				expand :true,
				cwd: basePaths.src,
				src: '*.js',
				dest: paths.scripts.dest,
				ext: '.min.js'
			}
		},
		cssmin: {
			dist: {
				expand :true,
				cwd: basePaths.src,
				src: '*.css',
				dest: paths.styles.dest,
				ext: '.min.css'
			}
		},
		watch: {
			scripts: {
				files: [paths.scripts.src],
				tasks: ['uglify','copy','usebanner']
			},
			styles: {
				files: [paths.styles.src],
				tasks: ['cssmin','copy','usebanner']
			},
			options: {
				livereload: true
			}
		},
		connect: {
			server: {
				options: {
					hostname: '127.0.0.1',
					port: 8871,
					base: 'example',
					livereload: true
				}
			}
		},
		bower: {
			all: {
				dest: basePaths.example+'lib/',
				options: {
					packageSpecific: {
						bootstrap: {
							keepExpandedHierarchy: false
						}
					},
					expand: true
				}
			}
		}
	});

	grunt.registerTask('serve',['connect','watch']);
	grunt.registerTask('bluid',['uglify','cssmin','copy','usebanner']);
};