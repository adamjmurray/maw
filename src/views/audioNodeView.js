/**
 * Superclass for all audio node views
 */
Maw.AudioNodeView = Ember.View.extend({

  tagName: 'svg',

  attributeBindings: ['width', 'height'],

  width: 100,
  height: 100

});