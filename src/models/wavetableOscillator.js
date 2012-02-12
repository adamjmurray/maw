/**
 * An audio source that produces a signal by looping over a single-cycle waveform (e.g. a sine wave).
 */
Maw.WavetableOscillator = Maw.AudioNode.extend({

  audioContext: function() {
    return Maw.get('audioContext');
  }.property(),

  wavetableSize: 2048,

  bufferSize: function() {
    return this.get('audioContext').sampleRate; // trying to avoid clicks between the last & first sample in the buffer, this seems to do the trick
  }.property(),

  baseFrequency: 440,

  buffer: null,

  init: function() {
    var audioContext = this.get('audioContext');

    var sampleRate = audioContext.sampleRate;
    var bufferSize = this.get('bufferSize');
    var wavetableSize = this.get('wavetableSize');
    var baseFrequency = this.get('baseFrequency');

    var buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
    var sampleBuffer = buffer.getChannelData(0);
    var wavetable = this.get('wavetable');

    var step = wavetableSize * baseFrequency / sampleRate;
    for(var i=0; i<bufferSize; i++) {
      var offset = Math.round(i * step);
      sampleBuffer[i] = wavetable[offset % wavetableSize];
    }

    this.set("buffer", buffer);
  },

  _wavetable: null,

  wavetable: function() {
    var wavetable = this.get('_wavetable');
    if(!wavetable) {
      var wavetableSize = this.get('wavetableSize');
      wavetable = new Array(wavetableSize);
      this._generateWavetable(wavetable);
      this.set('_wavetable', wavetable);
    }
    return wavetable;
  }.property(),

  /**
   * Generate the wavetable array
   * @param wavetable the empty wavetable Array
   * @param step the increment to multiply by the loop index to scale the loop range from 0 - 2*PI
   * @abstract override in subclass to do something useful
   */
  _generateWavetable: function(sampleBuffer) {
    return new Array(this.get('wavetableSize'));
  },

  /**
   * the AudioBufferSourceNode
   */
  _source: null,

  /**
   * Play the wavetable. This will play looped until stop() is called.
   * @param rate scaling factor for playback rate, defaults to 1.0
   * @param gain scaling factor for playback gain, defaults to 1.0
   */
  play: function(rate, gain) {
    if(!rate) rate = 1.0;
    if(!gain) gain = 1.0;
    var source = this.get('_source');
    if(!source) {
      var audioContext = this.get('audioContext');
      source = audioContext.createBufferSource();
      source.loop = true;
      source.buffer = this.get('buffer');
      source.playbackRate.value = rate;
      //source.gain.value = gain;
      this.set('_source', source);
      source.connect(audioContext.destination); // TODO: support connecting to other audio nodes
      source.noteOn(0);
    }
  },

  stop: function() {
    var source = this.get('_source');
    if(source) {
      source.noteOff(0);
      source.disconnect();
      this.set('_source', null);
      // source will need to be re-built and added to the audio graph to play again
      // (see the "I want to play it again, but noteOn() doesn’t do anything" section @ http://updates.html5rocks.com/2012/01/Web-Audio-FAQ)
    }
  }

});