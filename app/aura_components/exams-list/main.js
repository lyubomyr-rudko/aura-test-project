define(['collections/exams', 'module', 'underscore'], function (ExamsCollection, module, _) {
    return {
        templates: ['tpl'],
        View: {
            events: {}
        },
        
        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);

            // debugger;
            this.sandbox.on("examsList.refresh", this.render, this);
        },

        render: function(examsList) {
            this.html(this.renderTemplate('tpl', {exams: examsList || []}));
        }
    };
});