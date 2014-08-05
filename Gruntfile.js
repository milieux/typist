module.exports = function(grunt){
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            dist: 'dist'
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'app/scripts/',
                    optimize: 'uglify',
                    dir: 'dist/scripts'
                }
            }
        },
        sass: {
            compile: {
                options: {
                    outputStyle: 'compact',
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/styles/',
                    src: ['**/*.scss'],
                    dest: 'dist/styles',
                    ext: '.css'
                }]
            }
        },
        copyto: {
            compile: {
                files: [{
                    cwd: 'app/',
                    src: ['index.html'],
                    dest: 'dist/'
                }, {
                    cwd: 'data/',
                    src: ['*'],
                    dest: 'dist/data/'
                }]
            }
        }
    });

    grunt.registerTask('default', ['clean', 'requirejs', 'sass', 'copyto']);

};
