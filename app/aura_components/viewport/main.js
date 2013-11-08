define(['module', 'underscore', 'backbone'], function(module, _, Backbone) {
    //crate reference to exams list and exam edit form

    //subscribe to the events of the router, and provide navigatio between list and form

    return {
        templates: ['tpl'],
        
        initialize: function() {
            this.render();
            this.addRouterActions(this.sandbox.router);
            this.sandbox.utils.loadCssForModule(module);
        },
        
        render: function() {
            this.html(this.renderTemplate('tpl'));
        },

        addRouterActions: function(router) {
            var that = this;

            router.on('route:home', function onHomeRoute () {
                console.log('home route');
                that.showLayoutItem('homepage');
            });

            router.on('route:admin', function onAdminRoute (model, action, id) {
                console.log('admin route', model, action, id);

                if (model === 'exams' && !action && !id) {
                    that.showLayoutItem('exams-list');
                } else if (model === 'exams' && action === 'new' && !id) {
                    that.showLayoutItem('exams-edit-form');
                } else if (model === 'exams' && action === 'edit' && id) {
                    console.log('edit is not implemented');
                    that.showLayoutItem('homepage');
                }
            });

            this.itemsCache = {};
            Backbone.history.start();
        },

        showLayoutItem: function (item) {
            var itemToShow = this.itemsCache[item] || this.$el.find('div[data-aura-component=' + item + ']'),
                aciteItemClass = 'active';

            this.itemsCache[item] = itemToShow;

            if (this.currentlyShownLayoutItem) {
                this.currentlyShownLayoutItem && this.currentlyShownLayoutItem.toggleClass && this.currentlyShownLayoutItem.toggleClass(aciteItemClass);
            }

            itemToShow && itemToShow.toggleClass && itemToShow.toggleClass(aciteItemClass);
            this.currentlyShownLayoutItem = itemToShow;

        }
    };
});