define(['backbone'], function (Backbone) {
    "use strict";
    var Router, 
        router;

    Router = Backbone.Router.extend({
        routes: {
            "":                 "home"
            // ":widget/:action/:id":    "employee"
        }
    });

    router = new Router();

    router.on('route:home', function () { console.log('home route'); });

    Backbone.history.start();

    return {
        initialize: function (app) {
            app.sandbox.router = router;
        }
    };
});