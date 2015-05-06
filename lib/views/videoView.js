C("VideoView", ["require", "exports", "module"], function (require, exports, module) {

    var videoView;

    var Private = {
        cancelClick: function() {
            this.mouseIsDown = false;

            if (this.hasMoved) {
                
            }

            $(document).trigger(videoView.events.dragEnd);
        }
    };

    var Handlers = {
        mousedown: function(event) {
            this.mouseIsDown = true;
            this.hasMoved = false;
            this.mouseDownOffset = {
                x: event.offsetX,
                y: event.offsetY
            };

            $(document).trigger(videoView.events.mousedown);
        },
        mouseup: function(event) {
            $(document).trigger(videoView.events.mouseup, [this]);

            var storedTime = this.lastClick;
            var now = Date.now();
            this.lastClick = now;

            if (now - storedTime < this.config.DOUBLE_CLICK_TOLERANCE) {
                $(document).trigger(videoView.events.doubleClick, [this]);
            }
        },
        mousemove: function(event) {
            if (this.$parent) {
                var
                  offset = this.$parent.offset();

                if (this.mouseIsDown) {
                    if (!this.hasMoved) this.hasMoved = true;
                    this.$container.css({
                        top: event.pageY - offset.top - this.mouseDownOffset.y,
                        left: event.pageX - offset.left - this.mouseDownOffset.x
                    });
                }
            }
        },
        audioControlClick: function() {
            if (this.audioStatus) {
                this.$audioControl.addClass('active');
                // mute it
            } else {
                this.$audioControl.removeClass('active');
                // unmute it
            }
            this.audioStatus = !this.audioStatus;
        },
        videoControlClick: function() {
            if (this.videoStatus) {
                this.$videoControl.addClass('active');
                // change the video feed to an avatar
            } else {
                this.$videoControl.removeClass('active');
                // change the avatar to the video feed
            }
            this.videoStatus = !this.videoStatus;
        }
    };

    var videoView = function(video, $parent, id, isMyself, config) {
        var self = this;

        this.$parent = $parent; // mapView

        this.video = video;
        this.id = id;

        this.config = config;

        this.mouseIsDown = false;
        this.mouseDownOffset = { x: 0, y: 0 };
        this.lastClick = null;
        this.hasMoved = false;

        this.audioStatus = true;
        this.videoStatus = true;

        this.$container = $('<div></div>');
        this.$container.addClass('collaborator-video' + (isMyself ? ' my-video' : ''));
        this.$container.attr('id', 'container_' + id);
        

        var $vidContainer = $('<div></div>');
        $vidContainer.addClass('video-cutoff');
        $vidContainer.append(this.video);
        this.$container.append($vidContainer);

        this.$container.on('mousedown', function (event) {
            Handlers.mousedown.call(self, event);
        });
        this.$audioControl = $('<div class="video-audio"></div>');
        this.$videoControl = $('<div class="video-video"></div>');

        this.$audioControl.on('click', function () {
            Handlers.audioControlClick.call(self);
        });

        this.$videoControl.on('click', function () {
            Handlers.videoControlClick.call(self);
        });

        this.$container.append(this.$audioControl);
        this.$container.append(this.$videoControl);

        // suppress contextmenu
        this.video.oncontextmenu = function () { return false; };

        if (this.$parent) this.setParent(this.$parent);
    };
    
    videoView.prototype.setParent = function($parent) {
        var self = this;
        this.$parent = $parent;
        this.$parent.off('.video' + this.id);
        this.$parent.on('mouseup.video' + this.id, function (event) {
            Handlers.mouseup.call(self, event);
            Private.cancelClick.call(self);
        });
        this.$parent.on('mousemove.video' + this.id, function (event) {
            Handlers.mousemove.call(self, event);
        });
    }

    videoView.prototype.remove = function () {
        this.$container.off();
        if (this.$parent) this.$parent.off('.video' + this.id);
        this.$container.remove();
    }

    /**
     * @class
     * @static
     */
    videoView.events = {
        mousedown: "VideoView:mousedown",
        mouseup: "VideoView:mouseup",
        doubleClick: "VideoView:doubleClick",
        dragEnd: "VideoView:dragEnd",
    };

    module.e = videoView;
});

    