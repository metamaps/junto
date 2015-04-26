module.exports = {
	init: {
		files: [{
			src: 'bower_components/**/*',
			expand: true,
			dest: 'serve/js/'
		}]
	},
	serve: {
		files: [{
			src: 'dist/*',
			expand: true,
			dest: 'serve/js/',
			nonull: true,
			flatten: true,
			filter: 'isFile'
		}, {
			src: 'css/*',
			expand: true,
			dest: 'serve/css/',
			nonull: true,
			flatten: true,
			filter: 'isFile'
		}, {
			src: 'img/**/*',
			expand: true,
			dest: 'serve/img',
			nonull: true,
			flatten: true,
			filter: 'isFile'
		}]
	},
	deploy: {
		files: [{
			src: 'lib/**/*',
			expand: true,
			dest: 'deploy/junto/static/js/',
			flatten: true,
			nonull: true,
			filter: 'isFile'
		}, {
			src: 'css/*',
			expand: true,
			dest: 'deploy/junto/static/css/',
			flatten: true,
			nonull: true,
			filter: 'isFile'
		}, {
			src: 'img/*',
			expand: true,
			dest: 'deploy/junto/static/img/',
			flatten: true,
			nonull: true,
			filter: 'isFile'
		}, {
			src: 'dist/junto.js',
			dest: 'deploy/junto/static/js/dist/junto.js'
		}]
	}
};
