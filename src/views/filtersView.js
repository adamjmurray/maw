/**
 * The view for choosing and controlling a filter
 */
Maw.FiltersView = Ember.ContainerView.extend({

  childViews: [
    Maw.LowpassFilterView,
    Maw.HighpassFilterView,
    Maw.BandpassFilterView
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
