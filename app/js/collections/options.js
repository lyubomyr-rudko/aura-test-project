define([
	'backbone',
	'underscore',
	'models/option',
	'base/collection'
], function (Backbone, _, OptionModel, BaseCollection) {
	var QuestionOptions = BaseCollection.extend({
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