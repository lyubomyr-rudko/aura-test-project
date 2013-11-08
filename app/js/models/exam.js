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

        getExamQuestions: function () {
            this.questions.fetch();    
        },

        validate: function (attr) {
            if (!attr.title) {
                return "Title is a required field";
            }
        }

        // url: 'api/exams'
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