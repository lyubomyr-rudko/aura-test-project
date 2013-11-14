define([
    'collections/exams',
    'module',
    'underscore',
    'jquery'
    //'Bootbox' //TODO: add bootbox dependancy here - why it does not work?
], function(ExamsCollection, module, _, $) {
    return {
        templates: 'tpl',
        View: {
            events: {
                'click a[data-exam-edit-id]': function (e) {
                    var button = $(e.currentTarget),
                        id = button.attr('data-exam-edit-id');

                    this.sandbox.router.navigate('/exams/edit/' + id, {trigger: true});
                },
                'click a[data-exam-delete-id]': function (e) {
                    var button = $(e.currentTarget),
                        id = button.attr('data-exam-delete-id');

                    this.component.showDeleteConfirmation(id);
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
        showDeleteConfirmation: function (id) {
            var deleteRecord = ExamsCollection.singleInstance.get(id),
                resultElement = this.$el.find('.result-alert');

            console.log('initDelete called on examsDeleteForm');

            if (deleteRecord) {
                bootbox.confirm("Are you sure you want to delete the " + deleteRecord.get('titel') + "?", function(result) {
                    if (result) {
                        deleteRecord.destroy({
                            success: function () {
                                var text = 'Delete was successful';

                                resultElement.find("span").html(text);
                                resultElement.fadeIn().delay(4000).fadeOut();
                            }
                        });
                    }
                });
            }
        },

        refreshList: function() {
            this.render(ExamsCollection.singleInstance.toJSON());
        },

        render: function(examsList) {
            this.html(this.renderTemplate('tpl', {exams: examsList || []}));
        }
    };
});