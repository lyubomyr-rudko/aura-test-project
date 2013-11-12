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
            this.sandbox.on('exams-delete-form', this.initDelete, this);
            this.sandbox.emit('viewport:triggerEventCallback', 'exams-delete-form', this.initDelete, this);
        },

        render: function() {
            this.html(this.renderTemplate('tpl', {title: 'Hello'}));
        },

        initDelete: function (id) {
            ExamsCollection.singleInstance.fetchIf(_.bind(function () {
                var deletedRecord = ExamsCollection.singleInstance.get(id),
                    confirmationTextEl = this.$el.find('span[data-placeholder=title]');

                console.log('initDelete called on examsDeleteForm');

                if (deletedRecord) {
                    confirmationTextEl.html(deletedRecord.get('title'));
                    this.deletedRecord = deletedRecord;
                }
            }, this));
        },

        onSubmit: function(e) {
            var that = this,
                examTitleField = this.$el.find('input[name=title]'),
                examDescriptionField = this.$el.find('textarea[name=description]'),
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

            if (this.deletedRecord) {
                this.deletedRecord.set(exam);
                this.deletedRecord.save();
            } else {
                ExamsCollection.singleInstance.create(exam);
            }

            ExamsCollection.singleInstance.once('sync', function (model, response, collection) {
                if (response.id) {
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
            this.deletedRecord = null;
        }
    };
});