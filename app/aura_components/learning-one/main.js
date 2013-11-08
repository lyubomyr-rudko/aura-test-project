define({
    templates: ['template'],

    initialize_disabled: function() {
        this.$el.html('Hello World!' + this.options.foo + ' ' + this.options.otherOption);
    },

    View: {
        events: {
            'click input[type=submit]': function(e) {
                var cmp = this.component;
                cmp.doIt(e);
            }
        }
    },

    doIt: function(e) {
        debugger;
    },
    initialize: function() {
        this.render();
    },

    render: function() {
        this.html(this.renderTemplate('template'));
        return this;
    }
});