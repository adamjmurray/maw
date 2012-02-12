Maw.Filter = Maw.AudioNode.extend({

  filter: null,

  defaultFrequency: 3000,

  defaultQ: 1,

  init: function() {
    this._super();

    var audioContext = this.get('audioContext');
    var filter = audioContext.createBiquadFilter();
    this._setFilterType(filter);
    filter.frequency.value = this.get('defaultFrequency');
    filter.Q.value = this.get('defaultQ');
    this.set('node', filter);
  },

  _setFilterType: function(filter) {
    // example:
    // filter.type = filter.LOWPASS;
  }


});