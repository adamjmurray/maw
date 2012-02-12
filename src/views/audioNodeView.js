/**
 * Superclass for all audio node views
 */
Maw.AudioNodeView = Ember.View.extend({

  tagName: 'img',

  classNames: ['node'],

  attributeBindings: ['src', 'alt', 'draggable'],

  src:'',
  alt:'wave',
  draggable:true,

  didInsertElement: function(){

    function handleDragStart() {
      console.log('aoeu');
      this.style.opacity = '0.4';
    }

    this.get('element').addEventListener('dragstart', handleDragStart, false);

  }

});
