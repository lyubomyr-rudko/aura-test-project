define(['collections/exams', 'module', 'underscore'], function(ExamsCollection, module, _) {
    return {
        templates: ['tpl'],
        View: {
            events: {
                'click input[type=submit]': function(e) {
                    this.component.onSubmit(e);
                    return false;
                },
                'click a[data-action=cancel]': function(e) {
                    this.component.resetForm();
                }
            }
        },
        
        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);
        },
        
        render: function() {
            this.html(this.renderTemplate('tpl', {title: 'Hello'}));
        },

        onSubmit: function(e) {
            var that = this,
                examTitleField = this.$el.find('input[name=title]'),
                examDescriptionField = this.$el.find('input[name=title]'),
                examTitle = examTitleField.val(),
                examDescription = examDescriptionField.val(),
                exam = {
                    title: examTitle,
                    description: examDescription
                };

            if (!exam.title) {
                examTitleField.parent().addClass('has-error').prop('title', 'This field is required');
                return;
            } else {
                examTitleField.parent().removeClass('has-error');
            }

            ExamsCollection.singleInstance.create(exam).once('sync', function (model, response, collection) {
                if (response.id) {
                    //for on-success - clear form data
                    that.resetForm();

                    that.sandbox.router.navigate('/exams', {trigger: true});
                }
            });
        },

        resetForm: function() {
            var examTitleField = this.$el.find('input[name=title]'),
                examDescriptionField = this.$el.find('input[name=title]');

            examTitleField.val('');
            examDescriptionField.val('');
        }
    };
});