define([
    'backbone',
    'underscore',
    'models/question',
    'collections/options',
    'base/collection'
], function (Backbone, _, QuestionModel, QuestionOptions, BaseCollection) {
    var ExamQuestions = BaseCollection.extend({
        model: QuestionModel,
        initialize: function (models, options) {
            this.doc = options.doc;
        },

        url: function () {
            var url = this.doc.url;
            if (_.isFunction(url)) {
                url = this.doc.url();
            }
            return url + '/questions';// /api/exam/10/questions
        },

        getOptions: function () {
            console.log('getOptions() called from "questions.js"');

            this.each(function (model) {
                model.questions = new ExamQuestions([], {doc: model});
                model.questions.fetch();
            });
        },

        defaultSortField: 'questionText'
    });

    return ExamQuestions;
});

/*
Backbone.Model.prototype._super = function(funcName){
    return this.constructor.prototype[funcName].apply(this, _.rest(arguments));
}


Model = Backbone.model.extend({
    set: function(arg){
        // your code here

        // call the super class function
        this._super('set', arg);
    }
});

*/