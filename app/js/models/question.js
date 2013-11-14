define([
    'underscore',
    'backbone',
    'models/option',
    'collections/options'
], function (_, Backbone, OptionModel, QuestionOptions) {
    'use strict';

    var QuestionModel = Backbone.Model.extend({

        defaults: {
            text: ''
        },

        initialize: function () {
            this.questionOptions = new QuestionOptions([], doc: this);
        },

        addQuestionnOption: function (option) {
            this.questionOptions.create(option);
        },

        fetchQuestionOptions: function () {
            this.questionOptions.fetch();
        },

        validate: function (attr) {
            if (!attr.text) {
                return "Question text is required";
            }
        }
    });

    return QuestionModel;
});