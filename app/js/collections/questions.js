define([
    'backbone',
    'underscore',
    'models/question'
], function (Backbone, _, QuestionModel) {
    var ExamQuestions = Backbone.Collection.extend({
        model: QuestionModel,
        initialize: function (models, options) {
            this.doc = options.doc;
        },
        url: function () {
            var url = this.doc.url;
            if (_.isFunction(this.doc.url)) {
                url = this.doc.url();
            }
            return url + '/questions';// /api/exam/10/questions
        }
        // url: 'api/options'
    });

    return ExamQuestions;
});