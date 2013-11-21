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
                    this.sandbox.router.navigate('/exams/' + this.component.examRecord.get('id') + '/questions', {trigger: true});
                    this.component.resetForm();
                }
            }
        },

        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);
            this.sandbox.on('questions-edit-form:new', this.initNew, this);
            this.sandbox.on('questions-edit-form:edit', this.initEdit, this);
            this.sandbox.emit('viewport:triggerEventCallback', 'questions-edit-form:new', this.initNew, this);
            this.sandbox.emit('viewport:triggerEventCallback', 'questions-edit-form:edit', this.initEdit, this);
        },

        render: function() {
            this.html(this.renderTemplate('tpl', {title: 'Hello'}));
        },

        initNew: function (conf) {
            var id = conf.id;

            console.log('initNew called on questions-edit-form');

            this.resetForm();

            ExamsCollection.singleInstance.fetchIf(_.bind(function () {
                var examRecord = ExamsCollection.singleInstance.get(id),
                    formTitleElement = this.$el.find('h3[class=panel-title]'),
                    formTitle = 'Create New Question';

                this.examRecord = examRecord;
                this.questions = examRecord.getExamQuestions();//TODO: add here fetchExamQeuestions(cb) call

                formTitleElement.html(formTitle);
            }, this));

        },

        initEdit: function (conf) {
            var examId = conf.id,
                questionId = conf.qid;

            console.log('initEdit called on questions-edit-form');

            ExamsCollection.singleInstance.fetchIf(_.bind(function () {
                var examRecord = ExamsCollection.singleInstance.get(examId);

                this.questions = examRecord.getExamQuestions();
                this.examRecord = examRecord;

                if (examRecord) {
                    this.questions.fetchIf(_.bind(function () {
                            editedRecord = this.questions.get(questionId),
                            questionTextField = this.$el.find('input[name=questionText]'),
                            formTitleElement = this.$el.find('h3[class=panel-title]');

                        console.log('initEdit called on questions-edit-form');

                        if (editedRecord) {
                            questionTextField.val(editedRecord.get('questionText'));
                            formTitleElement.html('<small> editing </small>' + editedRecord.get('questionText'));
                            this.editedRecord = editedRecord;
                        }
                    }, this));
                }
            }, this));
        },

        onSubmit: function(e) {
            var that = this,
                questionTextField = this.$el.find('input[name=questionText]'),
                questionText = questionTextField.val(),
                question = {
                    questionText: questionText
                };

            if (!question.questionText) {
                questionTextField.parent().addClass('has-error').prop('title', 'This field is required');
                return;
            } else {
                questionTextField.parent().removeClass('has-error');
            }

            if (this.editedRecord) {
                this.editedRecord.set(question);
                this.editedRecord.save();
            } else {
                this.questions.create(question);
            }

            this.questions.once('sync', function (model, response, collection) {
                if (response.id) {
                    that.resetForm();
                    that.sandbox.router.navigate('/exams/' + that.examRecord.get('id') + '/questions', {trigger: true});
                }
            });
        },

        resetForm: function() {
            var examTitleField = this.$el.find('input[name=questionText]');

            examTitleField.val('');
            this.editedRecord = null;
        }
    };
});