Maw.OutputView = Ember.View.extend({
  tagName: 'img',

  classNames: ['output'],

  attributeBindings: ['src', 'title'],

  src:'assets/images/amplifier.png',
  title:'output'

});
