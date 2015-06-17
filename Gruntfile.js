'use strict';

module.exports = function (grunt) {
  
  var importOnce = require('node-sass-import-once');

    // Project configuration.
    grunt.initConfig({

        clean: {
            css: ['css'],
            bower: ['bower_components'],
            reports: ['reports'],
            test: ['bower_components/test']
        },

        copy: {
            test: {
                files: [
                    {
                        cwd: '',
                        expand: true,
                        src: [
                            '*.html'
                        ],
                        dest: 'bower_components/test'
                    }
                ]
            }
        },

        sass: {
            options: {
                sourceMap: false, //no source maps b/c web-components inline css anyway...
                importer: importOnce,
                importOnce: {
                  index: true,
                  bower: true
                }
            },
            card: {
                files: {
                    'css/noprefix/px-card-sketch.css': 'sass/px-card-sketch.scss',
                    'css/noprefix/px-card.css': 'sass/px-card-predix.scss'
                }
            },
            controls: {
                files: {           
                    'css/noprefix/px-card-controls-sketch.css': 'sass/px-card-controls-sketch.scss',
                    'css/noprefix/px-card-controls.css': 'sass/px-card-controls-predix.scss'
                }
            },
            header: {
                files: {
                    'css/noprefix/px-card-header-sketch.css': 'sass/px-card-header-sketch.scss',
                    'css/noprefix/px-card-header.css': 'sass/px-card-header-predix.scss'
                }
            }
        },
        
        autoprefixer: {
          options: {
            browsers: ['last 2 version']
          },
          multiple_files: {
            expand: true,
            flatten: true,
            src: 'css/noprefix/*.css',
            dest: 'css'
          }
        },

        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            bower: {
                command: 'bower install'
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'js/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    interrupt: true
                }
            }
        },

        depserve: {
            options: {
                open: '<%= depserveOpenUrl %>'
            }
        },

        webdriver: {
            options: {
                specFiles: ['test/*spec.js']
            },
            local: {
                webdrivers: ['chrome']
            }
        },

        // Karma Unit configuration
        karma: {
            runner: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // Default task.
    grunt.registerTask('default', 'Basic build', [
        'sass', 'autoprefixer'
    ]);

    // First run task.
    grunt.registerTask('firstrun', 'Basic first run', function() {
        grunt.config.set('depserveOpenUrl', '/index.html');
        grunt.task.run('default');
        grunt.task.run('depserve');
    });

    // Default task.
    grunt.registerTask('test', 'Test', [
        'jshint',
        'clean:test',
        'copy:test',
        'karma'
    ]);

    grunt.registerTask('release', 'Release', [
        'clean',
        'shell:bower',
        'default',
        'test'
    ]);

};
