if (typeof Mapmaker === 'undefined') Mapmaker = {};

Mapmaker.ChatView = (function($) {

    var Private = {
        addMessage: function(message) {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            var m = _.clone(message.attributes);

            var today = new Date();
            m.timestamp = new Date(m.timestamp);

            var date = (m.timestamp.getMonth() + 1) + '/' + m.timestamp.getDate();

            if (today.getDate() == m.timestamp.getDate() && today.getMonth() == m.timestamp.getMonth() && today.getFullYear() == m.timestamp.getFullYear()) {
                date += " " + addZero(m.timestamp.getHours()) + ":" + addZero(m.timestamp.getMinutes());
            }
            m.timestamp = date;
            var html = this.messageTemplate.render(m);
            this.$messages.append(html);
        },
        initialMessages: function() {
            var messages = this.messages.models;
            for (var i = 0; i < messages.length; i++) {
                Private.addMessage.call(this, messages[i]);
            }
        },
        handleInputMessage: function() {
            var message = {
                message: this.$messageInput.val(),
                timestamp: Date.now(),
                user: this.mapper.get('name')
            };
            //this.add(message);
            this.$messageInput.val('');
            $(document).trigger(Mapmaker.ChatView.events.message + '-' + this.room.room, [message]);
        }
    };

    var Handlers = {
        buttonClick: function() {
            if (this.isOpen) this.close();
            else this.open();
            this.isOpen = !this.isOpen;
        },
        keyUp: function(event) {
            switch(event.which) {
                case 13: // enter
                  Private.handleInputMessage.call(this);
                  break;
            }
        }
    };

    var chatView = function(view, messages, mapper, room) {
        var self = this;

        this.room = room;
        this.mapper = mapper;
        this.messages = messages; // backbone collection
        // add the event listener so that when
        // the realtime module adds messages to the collection
        // from other mappers, it will update the UI
        this.messages.on('add', function (message) {
            Private.addMessage.call(self, message);
        });

        this.isOpen = true;

        var html = document.getElementById("messageTemplate").innerHTML;
        this.messageTemplate = Hogan.compile(html);
        
        this.$button = $('<div class="chat-button"></div>');
        this.$messageInput = $('<textarea placeholder="Send a message..." class="chat-input"></textarea>');
        this.$messages = $('<div class="chat-messages"></div>');

        this.$button.on('click', function () {
            Handlers.buttonClick.call(self);
        });
        this.$messageInput.on('keyup', function (event) {
            Handlers.keyUp.call(self, event);
        });

        this.$container = $('<div class="chat-box"></div>');
        this.$container.append(this.$messageInput);
        this.$container.append(this.$button);
        this.$container.append(this.$messages);

        Private.initialMessages.call(this);
    };

    chatView.prototype.add = function (message) {
        this.messages.add(message);
    }

    chatView.prototype.open = function () {
        this.$container.css({
            right: '0'
        });
        this.$messageInput.focus();
    }

    chatView.prototype.close = function () {
        this.$container.css({
            right: '-230px'
        });
        this.$messageInput.blur();
    }

    chatView.prototype.remove = function () {
        this.$button.off();
        this.$container.remove();
    }

    return chatView;
}(jQuery));

/**
 * @class
 * @static
 */
Mapmaker.ChatView.events = {
    message: 'Mapmaker:ChatView:message'
};