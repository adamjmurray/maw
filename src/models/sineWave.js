/**
 * An audio source node that produce a sine wave
 */
Maw.SineWave = Maw.WavetableOscillator.extend({

  _generateWavetable: function(wavetable) {
    var length = wavetable.length;
    var step = 2*Math.PI / length;
    for (var i=0; i < length; ++i) {
      wavetable[i] = Math.sin(step * i);
    }
  }

});