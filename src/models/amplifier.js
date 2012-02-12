/**
 * A node that scales the amplitude of the signal.
 */
Maw.Amplifier = Maw.AudioNode.extend({

  /**
   * The amount by which this amplifier scales the signal.
   */
  gain: 1.0,

  init: function() {
    this._super();
    var audioContext = this.get('audioContext');
    var node = audioContext.createGainNode();
    node.gain.value = this.get('gain');
    this.set('node', node);
  }

});