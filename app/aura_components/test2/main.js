define({

  templates: ['template'],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.html(this.renderTemplate('template'));
  }
});