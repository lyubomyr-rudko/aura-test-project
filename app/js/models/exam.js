define([
    'underscore',
    'backbone',
    'collections/questions'
], function (_, Backbone, ExamQuestions) {
    'use strict';

    var ExamModel = Backbone.Model.extend({

        defaults: {
            title: ''
        },

        initialize: function () {
            this.questions = new ExamQuestions([], {doc: this});
        },

        addExamQuestion: function (question) {
            this.questions.create(question);
        },

        fetchExamQuestions: function () {
            this.questions.fetch();
        },

        validate: function (attr) {
            if (!attr.title) {
                return "Title is required";
            }
        },
        //it is possible to resive non-standart response (not just an object itself, but something else)
        parse: function (response) {
            return response;
        },
        //also we could control what we send to the server - not necessarily the model's data, but maybe some calculation on the data
        toJSON: function () {
            return this.attributes;
        }

    });

    return ExamModel;

    function validationExample() {
        var e = new ExamModel();
        e.get('title');// => ''
        e.isValid();// => false
        e.set('title', 'Math');// => d <- model returned
        e.isValid();// => true
        e.set('title', '');// => false
        e.get('title');// => Math
        e.set('title', {silent: true});// => d
        e.get('title');// => ''
        e.isValid();// => false

    }
});