/**
 * Base class for all audio nodes. Contains generic methods for connecting & disconnecting nodes.
 */
Maw.AudioNode = Ember.Object.extend({

  outputs: null,

  init: function() {
    this.set('outputs', []);
  },

  /**
   * Connect the output of this node to another audio node
   */
  connect: function(node) {
    // TODO: validate the node is not already connected?

    this.get('outputs').push(node);
    // TODO: update the Web Audio API node graph
  },

  /**
   * Disconnect an output node.
   */
  disconnect: function(node) {
    this.get('outputs').removeObject(node);
    // TODO: update the Web Audio API node graph
  }
});