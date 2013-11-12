define(['module', 'underscore', 'backbone'], function(module, _, Backbone) {
    //crate reference to exams list and exam edit form

    //subscribe to the events of the router, and provide navigatio between list and form

    return {
        templates: ['tpl'],

        initialize: function() {
            this.render();
            this.addRouterActions(this.sandbox.router);
            this.sandbox.utils.loadCssForModule(module);
            this.sandbox.on('viewport:triggerEventCallback', function (event, cb, scope) {
                if (this.componentActionEvent === event) {
                    cb.apply(scope, this.componentActionEventParams);
                }
            }, this);
        },

        render: function() {
            this.html(this.renderTemplate('tpl'));
        },

        addRouterActions: function(router) {
            var that = this;

            router.on('route:home', function onHomeRoute () {
                console.log('home route');
                that.showLayoutItem('homepage');
            })

            router.on('route:admin', function onAdminRoute (model, action, id) {
                if (model === 'exams' && !action && !id) {
                    that.triggerAdminRouteEvent('exams-list');
                } else if (model === 'exams' && (action === 'new' || action === 'edit')) {
                    that.triggerAdminRouteEvent('exams-edit-form', action, id);
                } else if (model === 'exams' && action === 'delete') {
                    that.triggerAdminRouteEvent('exams-delete-form', null, id);
                }
            });

            this.itemsCache = {};
            Backbone.history.start();
        },

        triggerAdminRouteEvent: function (component, action, id) {
            var componentActionEvent = component + (action ? ':' + action : '');

            this.showLayoutItem(component);
            this.sandbox.emit(componentActionEvent, id);

            this.componentActionEvent = componentActionEvent;
            this.componentActionEventParams = [id];
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