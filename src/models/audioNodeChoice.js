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

  /**
   * The underlying Web Audio API node for the selected node
   */
  node: function() {
    var mawNode = this.get('selectedNode');
    return (mawNode ? mawNode.get('node') : null);
  }.property('selectedNode'),


  init: function() {
    this._super();
    var nodes = this.get('nodes');
    if(!nodes) this.set('nodes', []);
    if(!this.get('selectedNode') && nodes.length > 0) this.select(nodes[0]);
  },


  select: function(target) {
    var node = this.get('node');
    if(node) node.disconnect();
    this.set('selectedNode', target);
    this.reconnect();
  },

  selectByType: function(type) {
    var typeMap = this.get('typeMap');
    if(typeMap) {
      var target = typeMap[type];
      if(target) this.select(target);
    }
  }

});