module.exports = {
	options: {
		banner: '<%= banner %>',
		stripBanners: true,
	},
	dist: {
		src: [
			'bower_components/snap.svg/dist/snap.svg-min.js',
			'bower_components/underscore/underscore.js',
			'bower_components/backbone/backbone.js',
			'bower_components/Countable/Countable.js',
			'bower_components/socket.io-client/dist/socket.io.js',
			'bower_components/typeahead.js/dist/typeahead.bundle.min.js',
			'bower_components/CloudCarousel/cloudcarousel.js',
			'bower_components/embedly/embedly.js',
			'bower_components/hogan/hogan-2.0.0.js',
			'bower_components/famous/dist/famous-global.min.js',
			'lib/JIT.js',
			'lib/utility.js',
			'lib/views/mixins.js',
			'lib/views/juntoView.js',
			'lib/views/videoView.js',
			'lib/views/roomTopicView.js',
			'lib/views/chatView.js',
			'lib/models/mapper.js',
			'lib/modules/control.js',
			'lib/modules/create.js',
			'lib/modules/jit.js',
			'lib/modules/realtime.js',
			'lib/modules/visualize.js',
			'lib/maker.js',
			'lib/junto.js',
			'lib/buildMaker.js',
			'lib/models/collections.js',
		],
		dest: 'dist/metamaps_renderer.js'
	}
};
