//
// Bot
//
var Node = require(__dirname + '/../../lib/twitter-node');

var Bot = exports.Bot = function(options) {
  options = this._options = options || {
    node       : {},
    delay      : undefined,
    name       : 'bot',
    activity   : false,
    values     : 10,
    reporter   : false
  };
  options.node.reactor = options.node.reactor || {};
  options.node.reactor.transport = options.node.reactor.transport || {};
  options.node.reactor.transport.reconnect = true;
  options.node.reactor.protocol = require('kadoh').network.protocol.jsonoverxmlrpc;
  this.kadoh = new Node(null, options.node);
};

Bot.prototype.start = function() {
  setTimeout(function(self) {
    console.log(self._options.name + ' connecting');
    self.connect();
  }, this._options.delay || 1, this);
};

Bot.prototype.connect = function() {
  var self = this;
  this.kadoh.connect(function() {
    self.join();
  });
};

Bot.prototype.join = function() {
  var self = this;
  console.log(self._options.name + ' joining');
  this.kadoh.join(function(error) {
    console.log(self._options.name + ' joined', self.kadoh._routingTable.howManyPeers());
    if (self._options.activity) {
      self.randomActivity();
    }
  });
};

Bot.prototype.randomActivity = function() {};