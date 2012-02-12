Maw.WaveShaper = Maw.AudioNode.extend({

  curveSize: 2048,

  bufferSize: 2048,

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

    // WTF, this isn't working. So we tried this instead, but it doesn't work either!
//    var distortNode = audioContext.createJavaScriptNode(bufferSize,1,1);
//    distortNode.onaudioprocess = function(audioProcessingEvent) {
//      var input = audioProcessingEvent.inputBuffer.getChannelData(0);
//      var output = audioProcessingEvent.outputBuffer.getChannelData(0);
//      for(var i=0,len=input.length; i<len; i++) {
//        output[i] = input[i];  // if we get pass-through working, then it should be easy to implement distortion
//      }
//    };


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
