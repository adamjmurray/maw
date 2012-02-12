Maw.WaveShaper = Maw.AudioNode.extend({

  curveSize: 2048,

  wsCurve: null,

  init: function() {
    this._super();

    var audioContext = this.get('audioContext');
    //var curve = audioContext.
    //this._setCurve(curve);
    //var filter = audioContext.createBiquadFilter();
    //this._setFilterType(filter);
    //filter.frequency.value = this.get('defaultFrequency');
    //filter.Q.value = this.get('defaultQ');
    this.set('wsCurve', new Float32Array(2048));
    this.createWSCurve(.5, this.get('curveSize'));
    var distortNode = audioContext.createWaveShaper();
    distortNode.curve = this.get('wsCurve');
    this.set('node', distortNode);
  },

  createWSCurve: function(amount, curveSize) {
    // taken from http://stackoverflow.com/questions/7840347/web-audio-api-waveshapernode
    var wsCurve = this.get('wsCurve')
    if ((amount >= 0) && (amount < 1)) {
      dist = amount;
      var k = 2 * dist / (1 - dist);
      for (var i = 0; i < curveSize; i+=1) {
        // LINEAR INTERPOLATION: x := (c - a) * (z - y) / (b - a) + y
        // a = 0, b = 2048, z = 1, y = -1, c = i
        var x = (i - 0) * (1 - (-1)) / (curveSize - 0) + (-1);
        wsCurve[i] = (1 + k) * x / (1+ k * Math.abs(x));
      }
    }
  }

});
