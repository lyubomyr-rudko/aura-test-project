define(['collections/exams', 'module', 'underscore'], function (ExamCollection, module, _) {
    return {
        templates: ['tpl'],
        View: {
            events: {
                'click input[type=submit]': function(e) {
                    this.component.onSubmit(e);
                    return false;
                }
            }
        },
        
        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);
        },
        
        render: function() {
            // this.html(this.renderTemplate('tpl', this.model.toJSON()));
            this.html(this.renderTemplate('tpl', {title: 'Hello'}));
            this.examsCollection = new ExamCollection();
            this.examsCollection.on('add', this.onAddExam, this);
        },

        onAddExam: function () {
            this.sandbox.emit('examsList.refresh', this.examsCollection.toJSON());
        },

        onSubmit: function(e) {
            var examTitleField = this.$el.find('input[name=title]'),
                examDescriptionField = this.$el.find('input[name=title]'),
                examTitle = examTitleField.val(),
                examDescription = examDescriptionField.val(),
                exam = {
                    title: examTitle,
                    description: examDescription
                };

            this.examsCollection.create(exam);
        }
    };
});