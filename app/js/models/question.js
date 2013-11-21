define([
    'underscore',
    'backbone',
    'models/option',
    'collections/options'
], function (_, Backbone, OptionModel, QuestionOptions) {
    'use strict';

    var QuestionModel = Backbone.Model.extend({

        defaults: {
            questionText: ''
        },

        initialize: function () {
            this.questionOptions = new QuestionOptions([], {doc: this});
        },

        addQuestionnOption: function (option) {
            this.questionOptions.create(option);
        },

        fetchQuestionOptions: function () {
            this.questionOptions.fetch();
        },

        validate: function (attr) {
            if (!attr.questionText) {
                return "Question questionText is required";
            }
        }
    });

    return QuestionModel;
});