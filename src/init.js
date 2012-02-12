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

  var lowPassFilter = Maw.LowPassFilter.create();
  var highPassFilter = Maw.HighPassFilter.create();
  var bandPassFilter = Maw.BandPassFilter.create();

  var filterChoices = Maw.AudioNodeChoice.create({
    nodes: [lowPassFilter, highPassFilter, bandPassFilter],
    typeMap: {
      lowPass: lowPassFilter,
      highPass: highPassFilter,
      bandPass: bandPassFilter
    }
  });

  wavetableChoices.connect(filterChoices);

  Maw.setProperties({

    wavetableChoices: wavetableChoices,

    filterChoices: filterChoices,

    output: output
  });

})();

function play() {
  Maw.get('filterChoices').connect(Maw.get('output'));
}

function stop() {
  Maw.get('filterChoices').disconnect();
}
