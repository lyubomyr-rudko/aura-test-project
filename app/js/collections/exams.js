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
		}
	});

	ExamsCollection.singleInstance = new ExamsCollection();

	return ExamsCollection;
});