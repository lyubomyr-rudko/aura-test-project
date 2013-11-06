define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ExamModel = Backbone.Model.extend({

        defaults: {
            title: ''
        }
    });

    return ExamModel;
});