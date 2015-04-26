module.exports =
{
	options: {
		banner: '<%= banner %>'
	},
	dist: {
		src: '<%= concat.dist.dest %>',
		dest: 'dist/junto.min.js'
	}
};
