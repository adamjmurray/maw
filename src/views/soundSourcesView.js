/**
 * The view for choosing and controlling a sound source
 */
Maw.SoundSourcesView = Ember.ContainerView.extend({

  childViews: [
    Maw.SineWaveView,
    Maw.TriangleWaveView,
    Maw.SquareWaveView,
    Maw.SawWaveView,
    Maw.WhiteNoiseWaveView
  ],

  didInsertElement: function() {
    var self = this;
    var childViews = this.get('childViews');
    childViews.forEach(function(childView) {
      childView.set('selectionManager', self);
    });
    childViews[0].set('selected', true);
  },

  select: function(target) {
    var childViews = this.get('childViews');
    childViews.forEach(function(childView) {
      childView.set('selected', (childView===target));
    });
  }

});