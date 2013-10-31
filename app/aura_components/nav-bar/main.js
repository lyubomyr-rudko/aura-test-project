define({
    templates: ['template'],

    initialize_disabled: function () {
        this.$el.html('Hello World!' + this.options.foo + ' ' + this.options.otherOption);
    },

    View: {
        events: {
            'click input[type=submit]': function (e) {
                var cmp = this.component;
                cmp.doIt(e);
            }
        }
    },

    doIt: function (e) {
        debugger;
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.html(this.renderTemplate('template'));
        return this;
    },

    loadCss: function (url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
});