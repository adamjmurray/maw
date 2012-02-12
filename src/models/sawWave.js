/**
 * An audio source node that produce a saw wave
 */
Maw.SawWave = Maw.WavetableOscillator.extend({

  _generateWavetable: function(wavetable) {
    var length = wavetable.length;
    for (var i=0; i < length; ++i) {
      var inc = i/length;
      wavetable[i] = 2 * (inc - Math.round(inc));
    }
  }

});