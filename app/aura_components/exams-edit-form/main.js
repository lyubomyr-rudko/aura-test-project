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
            this.sandbox.on('exams-edit-form:new', this.resetForm, this);
            this.sandbox.on('exams-edit-form:edit', this.initEdit, this);
            this.sandbox.emit('viewport:triggerEventCallback', 'exams-edit-form:edit', this.initEdit, this);
        },

        render: function() {
            this.html(this.renderTemplate('tpl'));
        },

        initEdit: function (id) {
            ExamsCollection.singleInstance.fetchIf(_.bind(function () {
                var editedRecord = ExamsCollection.singleInstance.get(id),
                    examTitleField = this.$el.find('input[name=title]'),
                    examDescriptionField = this.$el.find('textarea[name=description]'),
                    formTitleElement = this.$el.find('h3[class=panel-title]');

                console.log('initEdit called on examsEditForm');

                if (editedRecord) {
                    examDescriptionField.val(editedRecord.get('description'));
                    examTitleField.val(editedRecord.get('title'));
                    formTitleElement.html('<small> editing </small>' + editedRecord.get('title'));
                    this.editedRecord = editedRecord;
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

            if (this.editedRecord) {
                this.editedRecord.set(exam);
                this.editedRecord.save();
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
                examDescriptionField = this.$el.find('textarea[name=description]'),
                formTitle = 'Create New Exam ',
                formTitleElement = this.$el.find('h3[class=panel-title]');

            examTitleField.val('');
            examDescriptionField.val('');
            formTitleElement.html(formTitle);
            this.editedRecord = null;
        }
    };
});