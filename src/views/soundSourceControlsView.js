Maw.SoundSourceControlsView = Ember.View.extend({
  title: '',
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  unit: '',

  classNames: ['slider'],

  defaultTemplate: SC.Handlebars.compile(
      '<div style="white-space: pre;">frequency:&nbsp;<input type="range" {{bindAttr min="min" max="max" step="step" value="value"}}></div>'
  ),

  change: function() {
    Ember.run.once(this, this._updateElementValue);
  },

  _updateElementValue: function() {
    var value = this.$('input').val();
    var rate = value/50 + 0.1;
    Maw.get('wavetableChoices').setPlaybackRateOfSelectedWavetable(rate);
    Ember.set(this, 'value', value);
  }
});