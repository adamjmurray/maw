/**
 * A node that scales the amplitude of the signal.
 */
Maw.Amplifier = Maw.AudioNode.extend({

  /**
   * The amount by which this amplifier scales the signal.
   */
  value: 1.0

  // TODO: wrap the Web Audio API (AudioGainNode?) and scale the signal...
});