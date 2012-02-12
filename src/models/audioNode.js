/**
 * Base class for all audio nodes. Contains generic methods for connecting & disconnecting nodes.
 */
Maw.AudioNode = Ember.Object.extend({

  audioContext: function() {
    return Maw.get('audioContext');
  }.property('Maw.audioContext'),

  /**
   * The Web Audio API AudioNode object wrapped by this class.
   */
  node: null,

  outputs: null,

  connections: null,

  init: function() {
    this.set('outputs', []);
    this.set('connections', {} );
  },

  /**
   * Connect the output of this node to another audio node
   */
  connect: function(mawNode, outputIndex, inputIndex) {
    var thisNode = this.get('node');
    var destNode = mawNode.get('node');
    thisNode.connect(destNode, outputIndex, inputIndex);

    this.get('outputs').pushObject(mawNode);
    this.get('connections')[mawNode] = {out:outputIndex, in:inputIndex};
  },

  /**
   * Reconnect this node to all its outputs.
   * Useful in cases where AudioBufferSourceNodes need to be recreated to replay a buffer after a noteOff()
   * @see http://updates.html5rocks.com/2012/01/Web-Audio-FAQ
   */
  reconnect: function() {
    var thisNode = this.get('node');
    var connections = this.get('connections');
    var outputs = this.get('outputs');
    if(outputs) {
      outputs.forEach(function(mawNode) {
        var destNode = mawNode.get('node');
        var io = connections[mawNode];
        thisNode.connect(destNode, io.out, io.in);
      });
    }
  },

  /**
   * Disconnect an output node.
   */
  disconnect: function(outputIndex) {
    var thisNode = this.get('node');
    thisNode.disconnect(outputIndex);

    var connections = this.get('connections');
    var outputs = this.get('outputs');
    if(Ember.empty(outputIndex)) {
      while(outputs.length) outputs.removeObject(outputs[0]);
      for(var prop in connections) delete connections[prop];
    }
    else {
      var mawNode = outputs[outputIndex];
      outputs.removeObject(mawNode);
      delete connections[mawNode];
    }
  }
});