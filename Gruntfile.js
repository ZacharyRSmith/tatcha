module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'app/**/*.js',
        '!app/lib/**/*.js'
      ],
      options: {
        globals: {
          eqeqeq: true
        }
      }
    },
  });
};
