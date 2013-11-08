define(['collections/exams', 'module', 'underscore'], function(ExamsCollection, module, _) {
    return {
        templates: ['tpl'],
        View: {
            events: {}
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