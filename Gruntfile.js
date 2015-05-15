module.exports = function(grunt) {

	grunt.initConfig({
		'pkg': grunt.file.readJSON('package.json'),

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
				forceVerbose: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-ftp-deploy');
	
	grunt.registerTask('deploy', ['ftp-deploy']);
};
