console.log('exam.js loaded');

define([
    'models/exam',
    'collections/questions',
    'base/collection',
    'backbone',
    'underscore'
], function (ExamModel, ExamQuestions, BaseCollection, Backbone, _) {
    var ExamsCollection = BaseCollection.extend({
        model: ExamModel,
        url: '/api/exams',
        initialize: function () {

        },

        getQuestions: function () {
            console.log('getQuestions() called from "exam.js"');

            this.each(function (model) {
                model.questions = new ExamQuestions([], {doc: model});
                model.questions.fetch();
            });
        },

        defaultSortField: 'text'
    });

    ExamsCollection.singleInstance = new ExamsCollection();

    return ExamsCollection;
});