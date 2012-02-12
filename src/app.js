Maw = Ember.Application.create({

  audioContext: null,

  init: function() {
    this._super();
    this.set('audioContext', new webkitAudioContext());
  }

});