/**
 * An audio source node that produce a triangle wave
 */
Maw.TriangleWave = Maw.WavetableOscillator.extend({

  _generateWavetable: function(wavetable) {
    var length = wavetable.length;
    for (var i=0; i < length; ++i) {
      var inc = i/length;
      wavetable[i] = 1 - 4 * Math.abs(Math.round(inc) - inc);
    }
  }

});