define([
    'collections/exams',
    'mixins/component',
    'module',
    'underscore',
    'jquery'
    //'Bootbox' //TODO: add bootbox dependancy here - why it does not work?
], function(ExamsCollection, componentMixin, module, _, $) {
    var componentConfig,
        res;

    componentConfig = {
        templates: 'tpl',
        View: {
            events: {
                'click a[data-exam-edit-id]': function (e) {
                    var button = $(e.currentTarget),
                        id = button.attr('data-exam-edit-id');

                    this.sandbox.router.navigate('/exams/' + id + '/edit', {trigger: true});
                },
                'click a[data-exam-delete-id]': function (e) {
                    var button = $(e.currentTarget),
                        id = button.attr('data-exam-delete-id');

                    this.component.showDeleteConfirmation(id);
                },
                'click a[data-exam-questions-id]': function (e) {
                    var button = $(e.currentTarget),
                        id = button.attr('data-exam-questions-id');

                    this.sandbox.router.navigate('/exams/' + id + '/questions', {trigger: true});
                },
                'click a[data-action=title-sort]': function (e) {
                    var element;

                    this.sortInfo = this.sortInfo || {};
                    this.sortInfo.field = 'title';
                    this.sortInfo.ascending  = !this.sortInfo.ascending;
                    ExamsCollection.singleInstance.customSort(this.sortInfo);
                    this.component.refreshList();

                    element = this.$el.find('a[data-action=title-sort] span');
                    element.toggleClass('caret-up', this.sortInfo.ascending);
                }
            }//ExamsCollection.singleInstance.sort();
        },

        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);

            ExamsCollection.singleInstance.on('change reset add remove', this.refreshList, this);

            ExamsCollection.singleInstance.fetch();
        },

        //TODO: move this logic to a separate component
        deleteExam: function (id) {
            var recordToDelete = ExamsCollection.singleInstance.get(id),
                nameForConirmation = recordToDelete.get('title');

            console.log('deleteExam called on ');

            this.showDeleteConfirmation(recordToDelete, nameForConirmation);
        },

        deleteQuestion: function (id) {
            var recordToDelete = this.collection.get(id),
                nameForConirmation = recordToDelete.get('questionText');

            this.showDeleteConfirmation(recordToDelete, nameForConirmation);
        },

        refreshList: function() {
            this.render(ExamsCollection.singleInstance.toJSON());
        },

        render: function(examsList) {
            this.html(this.renderTemplate('tpl', {exams: examsList || []}));
        }
    };

    res = _.extend({}, componentMixin);
    res = _.extend(res, componentConfig);

    return res;
});