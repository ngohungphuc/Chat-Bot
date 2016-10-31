module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.initConfig({
        cssmin: {
            combine:{
                files:{
                    'public/css/web-style.min.css':['public/css/bootstrap-theme.min.css', 'public/css/bootstrap.min.css','public/css/font-awesome.min.css','public/css/style.css'],
                    'public/css/login.min.css':['public/css/bootstrap.min.css', 'public/css/login.css']
                }
            }
        },
        uglify: {
            options:{
                manage:false
            },
            my_target:{
                files:{
                    'public/js/angular-app.min.js':['public/js/angular.min.js', 'public/js/angular-route.min.js'],
                    'public/js/jquery-app.min.js':['public/js/jquery.min.js', 'public/js/bootstrap.min.js'],
                    'public/frontend/app.min.js':['public/frontend/controllers/**/*.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'public/frontend/**/!*.min.js']
        },
        nodemon: {
          dev: {
            script: 'app.js'
        }
    }
});

    grunt.log.write('Grunt is running\n');
    grunt.registerTask('default',['jshint','cssmin','uglify','nodemon']);
};