/**
 * A group of audio nodes where exactly one is active at a time.
 * Acts like a single node within the graph, where the underlying node can change based on the current choice.
 */
Maw.AudioNodeChoice = Maw.AudioNode.extend({

  /**
   * The available nodes in this audio node choice group
   */
  nodes: null,

  /**
   * The selected Maw node object
   */
  selectedNode: null,

  typeMap: null,

  inputNode: null,

  outputNode: null,

  /**
   * The underlying Web Audio API node for the selected node
   */
//  node: function() {
//    var mawNode = this.get('selectedNode');
//    return (mawNode ? mawNode.get('node') : null);
//  }.property('selectedNode'),


  init: function() {
    this._super();
    var audioContext = this.get('audioContext');

    var inputNode = audioContext.createGainNode();
    this.set('inputNode', inputNode);

    var outputNode = audioContext.createGainNode();
    this.set('outputNode', outputNode);

    var nodes = this.get('nodes');
    if(!nodes) {
      this.set('nodes', []);
    }
    else {
      nodes.forEach(function(mawNode) {
        var node = mawNode.get('node');
        if(node.numberOfInputs > 0) inputNode.connect(mawNode.get('node'));
      });
    }
    if(!this.get('selectedNode') && nodes.length > 0) this.select(nodes[0]);
  },

  select: function(mawNode) {
    var oldMawNode = this.get('selectedNode');
    if(oldMawNode) oldMawNode.get('node').disconnect();

    this.set('selectedNode', mawNode);
    var outputNode = this.get('outputNode');
    mawNode.get('node').connect(outputNode);
  },

  selectByType: function(type) {
    var typeMap = this.get('typeMap');
    if(typeMap) {
      var target = typeMap[type];
      if(target) this.select(target);
    }
  },

  setPlaybackRateOfSelectedWavetable: function(rate) {
    var node = this.getPath('selectedNode.node');
    if(node && node.playbackRate) node.playbackRate.value = rate;
  }

});
