/**
 * An audio source node that produce a square wave
 */
Maw.SquareWave = Maw.WavetableOscillator.extend({

  _generateWavetable: function(wavetable) {
    var length = wavetable.length;
    var halfLength = length/2;
    for (var i=0; i < length; ++i) {
      wavetable[i] = (i < halfLength ? 1 : -1);
    }
  }

});