(function() {

  var output = Maw.Output.create();

  var sineWave = Maw.SineWave.create();
  var triangleWave = Maw.TriangleWave.create();
  var squareWave = Maw.SquareWave.create();
  var sawWave = Maw.SawWave.create();
  var noiseWave = Maw.WhiteNoiseWave.create();

  var wavetableChoices = Maw.AudioNodeChoice.create({
    nodes: [sineWave, triangleWave, squareWave, sawWave, noiseWave],
    typeMap: {
      sine: sineWave,
      triangle: triangleWave,
      saw: sawWave,
      square: squareWave,
      noise: noiseWave
    }
  });

  var noFilter = Maw.Amplifier.create(); // if we never change the gain on the amplifier, then this does nothing.
  var lowPassFilter = Maw.LowPassFilter.create();
  var highPassFilter = Maw.HighPassFilter.create();
  var bandPassFilter = Maw.BandPassFilter.create();

  var filterChoices = Maw.AudioNodeChoice.create({
    nodes: [noFilter, lowPassFilter, highPassFilter, bandPassFilter],
    typeMap: {
      noFilter: noFilter,
      lowPass: lowPassFilter,
      highPass: highPassFilter,
      bandPass: bandPassFilter
    }
  });

  var globalVolume = Maw.Amplifier.create();
  var dirtyWaveShaper = Maw.Amplifier.create({gain: 10}); // we couldn't get our waveshaper working, so just over-amplify :)  // Maw.WaveShaper.create();
  var cleanWaveShaper = Maw.Amplifier.create();

  var waveShaperChoices = Maw.AudioNodeChoice.create({
    nodes: [cleanWaveShaper, dirtyWaveShaper],
    typeMap: {
      clean: cleanWaveShaper,
      dirty: dirtyWaveShaper
    }
  });

  wavetableChoices.connect(waveShaperChoices);
  waveShaperChoices.connect(filterChoices);
  filterChoices.connect(globalVolume);

  Maw.setProperties({

    wavetableChoices: wavetableChoices,

    filterChoices: filterChoices,

    globalVolume: globalVolume,
    waveShaperChoices: waveShaperChoices,

    output: output
  });

})();

function play() {
  Maw.get('globalVolume').connect(Maw.get('output'));
}

function stop() {
  Maw.get('globalVolume').disconnect();
}
