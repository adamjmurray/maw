Maw.OutputView = Ember.View.extend({
  tagName: 'img',

  classNames: ['output'],

  classNameBindings: ['selected'],

  attributeBindings: ['src', 'title', 'elementId'],

  src:'assets/images/amplifier.png',
  title:'output',
  elementId: 'amplifier',

  selected: false,

  click: function() {
    this.set('selected', !this.get('selected'));
    if (this.get('selected')) {
      play();
    } else {
      stop();
    }
  }

});
