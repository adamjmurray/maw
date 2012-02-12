Maw = Ember.Application.create({

  audioContext: null,

  init: function() {
    this.set('audioContext', new webkitAudioContext());
  }

});