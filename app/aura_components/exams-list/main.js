define(['collections/exams', 'module', 'underscore', 'jquery'], function(ExamsCollection, module, _, $) {
    return {
        templates: ['tpl'],
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

                    this.sandbox.router.navigate('/exams/delete/' + id, {trigger: true});
                }
            }//ExamsCollection.singleInstance.sort();
        },

        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);

            ExamsCollection.singleInstance.on('change reset add remove', this.refreshList, this);

            ExamsCollection.singleInstance.fetch();
        },

        refreshList: function() {
            this.render(ExamsCollection.singleInstance.toJSON());
        },

        render: function(examsList) {
            this.html(this.renderTemplate('tpl', {exams: examsList || []}));
        }
    };
});