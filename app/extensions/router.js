define(['backbone'], function (Backbone) {
    "use strict";
    var Router, 
        router;

    Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            ':model(/:action)(/:id)': 'admin'

            // ":widget/:action/:id":    "employee"
        }
    });

    router = new Router();

    // Backbone.history.start();

    return {
        initialize: function (app) {
            app.sandbox.router = router;
        }
    };
});