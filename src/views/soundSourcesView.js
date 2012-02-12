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
    var audioNodeChoices = this.get('model');
    if(target instanceof Maw.SineWaveView) audioNodeChoices.selectByType('sine');
    else if(target instanceof Maw.TriangleWaveView) audioNodeChoices.selectByType('triangle');
    else if(target instanceof Maw.SquareWaveView) audioNodeChoices.selectByType('square');
    else if(target instanceof Maw.SawWaveView) audioNodeChoices.selectByType('saw');
    else if(target instanceof Maw.WhiteNoiseWaveView) audioNodeChoices.selectByType('noise');

    var childViews = this.get('childViews');
    childViews.forEach(function(childView) {
      childView.set('selected', (childView===target));
    });

  }

});