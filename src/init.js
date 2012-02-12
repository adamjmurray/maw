
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

  // f = Maw.LowPassFilter.create();
  // c.connect(f);
  // f.connect(o);

  Maw.setProperties({

    wavetableChoices: wavetableChoices,

    output: output
  });

})();

function play() {
  Maw.get('wavetableChoices').connect(Maw.get('output'));
}

function stop() {
  Maw.get('wavetableChoices').disconnect();
}
