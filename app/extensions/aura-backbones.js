define({
  require: {
    paths:  {
      backbone:   'bower_components/backbone/backbone',
      underscore: 'bower_components/underscore/underscore',
      bootbox: 'bower_components/bootbox/bootbox',
      bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
      stickit: 'bower_components/backbone.stickit/backbone.stickit'
    },
    shim:   { backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] },
              bootbox: { exports: 'Bootbox', deps: ['underscore', 'jquery'] },
              stickit: { exports: 'Stickit', deps: ['backbone']}  }
  },

  initialize: function(app) {
    var Backbone = require('backbone');
    app.core.mvc =  Backbone;

    var Views = {};

    // Injecting a Backbone view in the Component just before initialization.
    // This View's class will be built and cached this first time the component is included.
    app.components.before('initialize', function(options) {
      var View = Views[options.ref];
      if (!View) {
        Views[options.ref] = View = Backbone.View.extend(this.View);
      }
      this.view = new View({ el: this.$el });
      this.view.sandbox = this.sandbox;
      this.view.component = this;
    });

    app.components.before('remove', function() {
      this.view && this.view.stopListening();
    });

  }
});
