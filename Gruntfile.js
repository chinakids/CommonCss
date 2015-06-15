module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
		concat: {
		    module: {
		      options: {
		        banner: '/*\n<%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd HH:MM") %>)\n */\n'
		      },
		      src: [
		      	'js/**/*.js'
		      ],
		      dest: '.temp/js/common.js'
		    }
		},
		uglify: {
    	min:{
      	options: {
            	banner: '/*\n<%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd HH:MM") %>)\n */\n',
            	sourceMap: true
          },
          files: {
            'dest/js/common.min.js': ['.temp/js/common.js']
          }
      }
	  },
	  watch: {
	  	js:{
	  		files:[
	  			'js/**/*.js'
	  		],
	  		tasks:['concat','uglify']
	  	},
		  less: {
		    files: [
		        'less/**/*.less'
		    ],
		    tasks: ['less']
		  }
		},
		less: {
      options: {
        compress: true,
        yuicompress: false,
        sourceMap:true
      },
      core: {
        files: {
          "dest/css/core/common.min.css": "less/core/common.less",
        }
      },
      style:{
        files: [{
          expand: true,
          cwd: 'less',
          src: ['*.less','!{head,foot}.less'],
          dest: '<%= pkg.web %>/css',
          ext: '.min.css'
        }]
      }
    }
	});

    // 注冊任务
    grunt.registerTask('default', [
      'concat',
    	'uglify',
    	'less',
    	]);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('image', ['imagemin']);
    grunt.event.on('watch', function(action, filepath, target) {
	  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};