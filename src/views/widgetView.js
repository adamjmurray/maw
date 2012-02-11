// just testing out inline SVG an a view
Maw.WidgetView = Ember.View.extend({

  tagName: 'svg',

  templateName: 'widget',

  fill: 'red',

  click: function() {
    this.set('fill', 'green');
  }

});