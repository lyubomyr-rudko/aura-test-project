console.log('exams.js loaded');

define(['models/exam', 'backbone'], function (ExamModel, Backbone) {
	var ExamsCollection = Backbone.Collection.extend({
		model: ExamModel,
		url: '/api/exams'
	});

	return ExamsCollection;
});