module.exports = function(grunt) {

    var randomString = date.toGMTString().split(' ').join('').split(',').join('');

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

    });
  
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
  
    // Default task(s).
    grunt.registerTask('default', ['']);
  
  };