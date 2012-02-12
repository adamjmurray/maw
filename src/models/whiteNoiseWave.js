/**
 * An audio source node that produce a white noise signal
 */
Maw.WhiteNoiseWave = Maw.WavetableOscillator.extend({

  // It doesn't seem to matter how big we make the buffers, it still sounds bad... :(

  baseFrequency: 0.5,

  wavetableSize: 1000000,

  bufferSize: 1000000,

  _generateWavetable: function(wavetable) {
    var length = wavetable.length;
    for (var i=0; i < length; ++i) {
      wavetable[i] = 2 * Math.random() - 1;
    }
  }

});