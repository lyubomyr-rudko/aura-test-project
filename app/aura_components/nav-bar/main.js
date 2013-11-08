define(['module', 'underscore'], function(module, _) {
    return {
        templates: ['tpl'],

        initialize_disabled: function() {
            this.$el.html('Hello World!' + this.options.foo + ' ' + this.options.otherOption);
        },

            
        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);
        },
        
        render: function() {
            this.html(this.renderTemplate('tpl', {title: 'Hello'}));
        }
    };
});