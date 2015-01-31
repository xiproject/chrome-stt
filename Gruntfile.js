var package = require('./package.json');

var deps = [];
for (var dep in package.dependencies) {
	deps.push('node_modules/' + dep + '/**');
}

module.exports = function (grunt) {
	grunt.initConfig({
		clean: {
			dist: ['dist']
		},
		copy: {
			dist: {
				files: [
				{
					expand: true,
					src: ['index.js', 'src/**', 'config.json', 'crx/**'],
					dest: 'dist/'
				},
				{
					expand: true,
					src: deps,
					dest: 'dist/'
				}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('build', ['newer:copy']);
}