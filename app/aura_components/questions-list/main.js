define([
    'collections/questions',
    'collections/exams',
    'mixins/component',
    'module',
    'underscore',
    'jquery'
    //'Bootbox' //TODO: add bootbox dependancy here - why it does not work?
], function(ExamQuestions, ExamsCollection, componentMixin, module, _, $) {

    var componentConfig,
        res;

    componentConfig = {
        templates: 'tpl',
        View: {
            events: {
                'click a[data-question-edit-id]': function (e) {
                    var button = $(e.currentTarget),
                        id = button.attr('data-question-edit-id'),
                        examId = this.component.examModel.get('id');

                    this.sandbox.router.navigate('/exams/' + examId + '/questions/' + id + '/edit', {trigger: true});
                },
                'click a[data-question-delete-id]': function (e) {
                    var button = $(e.currentTarget),
                        id = button.attr('data-question-delete-id');

                    this.component.deleteQuestion(id);
                },
                'click a[data-action=title-sort]': function (e) {
                    var element;

                    this.sortInfo = this.sortInfo || {};
                    this.sortInfo.field = 'questionText';
                    this.sortInfo.ascending  = !this.sortInfo.ascending;
                    this.component.collection.customSort(this.sortInfo);
                    this.component.refreshList();

                    element = this.$el.find('a[data-action=title-sort] span');
                    element.toggleClass('caret-up', this.sortInfo.ascending);
                }
            }//ExamQuestions.singleInstance.sort();
        },

        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);
            this.sandbox.on('questions-list', this.init, this);
            this.sandbox.emit('viewport:triggerEventCallback', 'questions-list', this.init, this);
        },

        init: function (id) {
            var examModel = ExamsCollection.singleInstance.get(id);

            if (id === this.examId) {
                return;
            }

            this.examId = id;
            if (!examModel) {
                ExamsCollection.singleInstance.fetchIf(_.bind(this.initAfterExamsFetch, this));
            } else {
                this.initAfterExamsFetch();
            }
        },

        initAfterExamsFetch: function () {
            var id = this.examId,
                examModel = ExamsCollection.singleInstance.get(id);

            if (examModel) {
                this.examModel = examModel;
                this.collection = this.examModel.getExamQuestions();
                //TODO: check if events are not triggered twice or more times

                this.collection.on('change reset add remove', this.refreshList, this);
                this.collection.reset([]);
                this.examModel.fetchExamQuestions();
            }
        },

        deleteQuestion: function (id) {
            var recordToDelete = this.collection.get(id),
                nameForConirmation = recordToDelete.get('questionText');

            this.showDeleteConfirmation(recordToDelete, nameForConirmation);
        },

        refreshList: function() {
            this.render(this.examModel.toJSON(), this.collection.toJSON());
        },

        render: function(exam, questions) {
            console.log('render called on question list');

            this.html(this.renderTemplate('tpl', {exam: exam || {}, questions: questions || []}));
        }
    };

    res = _.extend({}, componentMixin);
    res = _.extend(res, componentConfig);

    return res;
});