define([
	'backbone', 
	'underscore',
	'models/option'
], function (Backbone, _, OptionModel) {
	var QuestionOptions = Backbone.Collection.extend({
		model: OptionModel,
		initialize: function (models, options) {
			this.doc = options.doc;
		},
		url: function () {
			return this.doc.url + '/options'; // /api/question/10/options
		}
	});

	return QuestionOptions;
});