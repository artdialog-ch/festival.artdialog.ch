module.exports = function(grunt) {

	grunt.initConfig({
		'pkg' : grunt.file.readJSON('package.json'),

		'ftp-deploy' : {
			build : {
				auth : {
					host : 'ftp.artdialog.ch',
					port : 21,
					authKey : 'ftp.artdialog'
				},
				src : './www',
				dest : '/festival.artdialog.ch',
				exclusions : [],
				forceVerbose : true
			}
		},
		jshint : {
			files : [ 'Gruntfile.js', 'www/assets/js/*.js' ],
			options : {
				globals : {
					jQuery : true
				}
			}
		},
		watch : {			
			files : [ '<%= jshint.files %>' ],
			tasks : [ 'jshint' ]
		},
	});

	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('deploy', [ 'ftp-deploy' ]);
};
