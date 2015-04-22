if (typeof Mapmaker === 'undefined') Mapmaker = {};

Mapmaker.Realtime = (function ($) {

    var realtime = function (webrtc, firebase, socket, $video, myVideoView, room) {

        this.isActiveRoom = false;

        this.webrtc = webrtc;
        this.roomRef = firebase;
        this.room = room;

        this.$myVideo = $video;
        this.myVideo = myVideoView;

        this.messages = new Backbone.Collection();
        var
          mapper = this.room.currentMapper;
        this.chat = new Mapmaker.ChatView(this.mapView, this.messages, mapper, this.room);

        this.socket = socket;
        this.isOpen = false;
        this.changing = false;
        this.mappersOnMap = {};
        this.videos = {};

        this.init();
    }

    realtime.prototype.init = function () {
      var self = this;

      this.roomRef.child('messages').on('child_added', function (snap) {
        self.messages.add(snap.val());
      });

      this.webrtc.webrtc.off('peerStreamAdded');
      this.webrtc.webrtc.off('peerStreamRemoved');
      this.webrtc.on('peerStreamAdded', function (peer) {
        if (self.isActiveRoom) {
            self.addVideo(peer);
        }
      });

      this.webrtc.on('peerStreamRemoved', function (peer) {
        if (self.isActiveRoom) {
            self.removeVideo(peer);
        }
      });

      var sendChatMessage = function (event, data) {
        self.sendChatMessage(data);
      };
      $(document).on(Mapmaker.ChatView.events.message + '-' + this.room.room, sendChatMessage);
    }

    realtime.prototype.videoAdded = function (callback) {
        this._videoAdded = callback;
    }

    realtime.prototype.addVideo = function (peer) {
      var
        id = this.webrtc.getDomId(peer),
        video = attachMediaStream(peer.stream);
        v = new Mapmaker.VideoView(video, null, id, false, { DOUBLE_CLICK_TOLERANCE: 200 });

      if (this._videoAdded) this._videoAdded(v);
      this.videos[peer.id] = v;
    }

    realtime.prototype.removeVideo = function (peer) {
        var id = typeof peer == 'string' ? peer : peer.id;
        this.videos[id].remove();
        delete this.videos[id];
    }

    realtime.prototype.sendChatMessage = function (data) {
        this.roomRef.child('messages').push(data);
    }

    return realtime;

}(jQuery));