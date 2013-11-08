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
			this.on('change reset add remove', this.getQuestions, this);
			this.getQuestions();
		},

		getQuestions: function () {
			console.log('getQuestions() called from "exam.js"');

			this.each(function (model) {
				model.questions = new ExamQuestions([], {doc: model});
				console.log(model.questions.url);
				// debugger;
				model.questions.fetch();
			});
		}
	});

	ExamsCollection.singleInstance = new ExamsCollection();

	return ExamsCollection;
});