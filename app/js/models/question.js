define([
	'underscore',
	'backbone',
	'models/option'
], function (_, Backbone, OptionModel) {
	'use strict';

	var QuestionModel = Backbone.Model.extend({
		//questionText String
		//rightOptions Array

	});

	var QuestionOptions = Backbone.Collection.extend({
		model: OptionModel,
		initialize: function (models, options) {
			this.doc = options.doc;
		},
		url: function () {
			return this.doc.url + '/options'; // /api/question/10/options
		}
	});

	return QuestionModel;
});