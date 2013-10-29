define({

  templates: ['form'],

  View: {
    events: {
      'click input[type=submit]': function (e) {
        return false;
      },
      'keyup input': function (e) {
        if (e.which === 13) {
          var usernameField = this.$el.find('input[name=username]'),
            passwordField = this.$el.find('input[name=password]'),
            username,
            password,
            loginEventObj;

          debugger;

          loginEventObj = {
            username: username,
            password: password,
            onSuccess: function () {
              this.sandbox.emit('user.showInfo', loginEventObj);
            },
            onFailure: function () {
              //show failure message
            }
          };
          usernameField.val('');
          passwordField.val('');
        }
      }
    }
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.html(this.renderTemplate('form'));
  }
});