/**
 * The view for choosing and controlling a wave shaper
 */
Maw.WaveShapersView = Ember.ContainerView.extend({

  childViews: [
    Maw.WaveShaperCleanView,
    Maw.WaveShaperDirtyView
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
    var waveShaperChoices = this.get('model');
    if(target instanceof Maw.WaveShaperCleanView) waveShaperChoices.selectByType('clean');
    else if(target instanceof Maw.WaveShaperDirtyView) waveShaperChoices.selectByType('dirty');

    var childViews = this.get('childViews');
    childViews.forEach(function(childView) {
      childView.set('selected', (childView===target));
    });


  }

});
