define([
	'underscore',
	'backbone',
	'models/option',
	'collections/options'
], function (_, Backbone, OptionModel, QuestionOptions) {
	'use strict';

	var QuestionModel = Backbone.Model.extend({
		initialize: function () {
			//this.questionOptions = new QuestionOptions();
		} 
	});

	return QuestionModel;
});