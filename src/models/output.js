/**
 * The output node, which sends an audible signal to the speakers.
 */
Maw.Output = Maw.AudioNode.extend({

  init: function() {
    this._super();
    var audioContext = this.get('audioContext');
    this.set('node', audioContext.destination);
  }

});
