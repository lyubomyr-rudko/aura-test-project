define([
    'backbone',
    'underscore',
    'models/question',
    'collections/options'
], function (Backbone, _, QuestionModel, QuestionOptions) {
    var ExamQuestions = Backbone.Collection.extend({
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

        comparator: function (a, b) {
            var defaultSortField = 'title',
                res = a.get(this.sortField || defaultSortField) < b.get(this.sortField || defaultSortField) ? -1 : 1;

                if (this.sortAscending) {
                    res = -res;
                }

                return res;
        },

        customSort: function (conf) {
            this.sortField = conf.field;
            this.sortAscending  = conf.ascending ;

            this.sort();
        },

        fetchIf: function (cb) {
            if (this.fetched) {
                cb.call();
            } else if (this.fetchInProgress) {
                this.onFetchCompleate = this.onFetchCompleate || [];
                this.onFetchCompleate.push(cb);
            } else {
                this.fetch({success: function () {
                    cb.call();
                }});
            }
        },

        fetch: function (conf) {
            conf = conf || {};
            var success = conf.success,
                error = conf.error,
                c = _.clone(conf),
                that = this;

            this.fetchInProgress = true;

            c.success = function (collection, response, options) {
                that.fetched = true;
                that.fetchInProgress = false;
                if (success && success.call) {
                    success.call(this, collection, response, options);
                }
                if (that.onFetchCompleate && that.onFetchCompleate.length) {
                    _.compose.apply(_, that.onFetchCompleate).call(this);
                    that.onFetchCompleate = [];
                }
            };

            c.error = function  (collection, response, options) {
                that.fetched = false;
                that.fetchInProgress = false;
                if (error && error.call) {
                    error.call(this, collection, response, options);
                }
            };

            Backbone.Collection.prototype.fetch.call(this, c);
        }
    });

    return ExamQuestions;
});