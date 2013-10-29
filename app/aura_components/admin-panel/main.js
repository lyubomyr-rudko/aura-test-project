define({

  templates: ['header'],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.html(this.renderTemplate('header'));
  }
});