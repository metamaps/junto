if (typeof Mapmaker === 'undefined') Mapmaker = {};

Mapmaker.Room = (function($, famous) {

  var room = function(opts) {
    var self = this;

    this.topic = null;
    this.webrtc = opts.webrtc;
    this.roomRef = opts.firebase;
    this.room = opts.room;
    this.config = opts.config;
    this.currentMapper = new Backbone.Model({ name: opts.username });
    this.peopleCount = 0;
    this.Realtime = new Mapmaker.Realtime(opts.webrtc, opts.firebase, opts.socket, opts.$video, opts.myVideoView, this);
    this.topic = new Mapmaker.RoomTopicView(this);

    this.roomRef.child('topic').on('value', function(snap) {
      self.setTopic(snap.val());
    });

    $(document).on(Mapmaker.RoomTopicView.events.change + '-' + this.room, function(event, topic) {
      self.roomRef.child('topic').set(topic);
    });
  };

  room.prototype.join = function(cb) {
    this.isActiveRoom = true;
    this.Realtime.isActiveRoom = true;
    this.Realtime.webrtc.joinRoom(this.room, cb);
  }

  room.prototype.leave = function() {
    for (var id in this.Realtime.videos) {
      this.Realtime.removeVideo(id);
    }
    this.isActiveRoom = false;
    this.Realtime.isActiveRoom = false;
    this.Realtime.webrtc.leaveRoom();
  }

  room.prototype.setPeopleCount = function(count) {
    this.peopleCount = count;
  }

  room.prototype.setTopic = function(topic) {
    this.topic.setTopic(topic);
  }

  return room;
})(jQuery, famous);