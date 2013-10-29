define({

  templates: ['tpl'],

  initialize: function() {
    this.render();
  },

  render: function() {
    this.html(this.renderTemplate('tpl'));
  }
});