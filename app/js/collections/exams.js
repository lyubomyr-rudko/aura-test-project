console.log('exam.js loaded');

define([
	'models/exam',
	'collections/questions',
	'backbone'
], function (ExamModel, ExamQuestions, Backbone) {
	var ExamsCollection = Backbone.Collection.extend({
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

        comparator_v2: function (model) {
            return model.get('title');
        },

        comparator: function (a, b) {
            return a.get('id') - b.get('id');
        }
	});

	ExamsCollection.singleInstance = new ExamsCollection();

	return ExamsCollection;
});