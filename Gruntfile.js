module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      task : {
        files: {
         "temp/less/temp.css" : "project/src/less/**/*.less"
       }
      }
    },
    concat: {
      options: {
          separator: ' '
      },
      js : {
        src: ['project/src/**/*.js'],
        dest: 'debug/js/script_<%= pkg.version %>.js'
      },

      lib_js : {
        src: ['project/lib/**/*.js'],
        dest: 'debug/lib/js/lib_<%= pkg.version %>.js'
      },

      css : {
        src: ["project/src/css/*.css","temp/css/*.css","temp/less/**/*.css"],
        dest: "debug/css/style_<%= pkg.version %>.css"
      },

      lib_css : {
        src: ["project/lib/**/*.css"],
        dest: "debug/lib/css/lib_<%= pkg.version %>.css"
      }
    },
    dataUri: {
      dist: {
        // src file
        src: ['project/src/img/embedded.css'],
        // output dir
        dest: "temp/css/",
        options: {
          // specified files are only encoding
        target: ['project/src/img/embed/*.*'],
          // adjust relative path?
        fixDirLevel: true
          // img detecting base dir
          // baseDir: './'
        }
      }
    },
      /*
    concat_css: {
      all: {
        src: ["project/src/css/*.css","temp/css/*.css"],
        dest: "debug/css/style_<%= pkg.version %>.css"
      }
    },  */
    
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [
          { expand: true, cwd: 'project/src', dest: 'release', src: '**/*.jade', ext: '.html' },
          { expand: true, cwd: 'project/src', dest: 'debug', src: '**/*.jade', ext: '.html' }
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      release: {
        files: {
          'release/js/script_<%= pkg.version %>.js': ['debug/js/script_<%= pkg.version %>.js'],
          'release/lib/js/lib_<%= pkg.version %>.js': ['debug/lib/js/lib_<%= pkg.version %>.js']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'project/src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd : 'debug/css/',
        src: ['*.css'],
        dest: 'release/css/'
      },
      minify_lib: {
        expand: true,
        cwd : 'debug/lib/css/',
        src: ['*.css'],
        dest: 'release/lib/css/'
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 version', '> 1%', 'ie 8']
        },
        files: {
          'debug/css/style_<%= pkg.version %>.css': ['debug/css/style_<%= pkg.version %>.css']
        }
      }
    },

    copy: {
      img: {
        files: [
          {expand: true, cwd: 'project/src/img/',src: ['**/*.png','**/*.jpeg','**/*.jpg','**/*.gif'], dest: 'release/img'},
          {expand: true, cwd: 'project/src/img/', src: ['**/*.png','**/*.jpeg','**/*.jpg','**/*.gif'], dest: 'debug/img'}
        ]
      },
      lib: {
        files: [
          {expand: true, cwd: 'project/lib/to_copy', src: ['**/*.*'], dest: 'debug/lib'},
          {expand: true, cwd: 'project/lib/to_copy', src: ['**/*.*'], dest: 'release/lib'}
        ]
      },
      others: {
        files: [
          {expand: true, cwd: 'project/src/to_copy', src: ['**/*.*'], dest: 'debug/'},
          {expand: true, cwd: 'project/src/to_copy', src: ['**/*.*'], dest: 'release/'}
        ]
      }
    },
    
    clean: ["debug/", "release/","temp/"],

    watch: {
      files: ['project/src/**/*'],
      tasks:  ['clean', 'jade','jshint', 'dataUri', 'less', 'concat', 'autoprefixer', 'copy', 'replace']
    },

    exec:{
      server: {
        cmd: "node app.js"
      }
    },

    concurrent: {
      debug: {
            tasks: ['exec', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
     
    },

    replace: {
      release: {
        options: {
          variables: {
            'version': '<%= pkg.version %>'
          },
          prefix: '@@'
        },
        files: [
          {expand: true, src: ['debug/*.html']},
          {expand: true, src: ['release/*.html']}
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin'); 
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-data-uri');
  grunt.loadNpmTasks('grunt-autoprefixer');


  grunt.registerTask('default', ['clean', 'jade','jshint', 'dataUri', 'less', 'concat', 'autoprefixer', 'uglify', 'cssmin','copy', 'replace']);
  grunt.registerTask('debug', ['clean', 'jade','jshint', 'dataUri', 'less', 'concat', 'autoprefixer','copy', 'replace']);
  grunt.registerTask('server', ['debug','concurrent:debug']);
};