Maw.GlobalVolumeView = Ember.View.extend({
  title: '',
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  unit: '',

  classNames: ['slider'],

  defaultTemplate: SC.Handlebars.compile(
      '<div style="white-space: pre;">volume:&nbsp;<input type="range" {{bindAttr min="min" max="max" step="step" value="value"}}></div>'
  ),

  change: function() {
    Ember.run.once(this, this._updateElementValue);
  },

  _updateElementValue: function() {
    var value = this.$('input').val();
    var gain = value/100;
    var globalVolume = Maw.getPath('globalVolume.node');
    globalVolume.gain.value = gain;
    Ember.set(this, 'value', value);
  }
});