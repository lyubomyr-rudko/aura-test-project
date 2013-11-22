define([
	'backbone'
], function (Backbone) {
	var Collection = Backbone.Collection.extend({
		comparator: function (a, b) {
            var defaultSortField = this.defaultSortField || 'text',//TODO: get this field frm model
                res = a.get(this.sortField || defaultSortField) < b.get(this.sortField || defaultSortField) ? -1 : 1;

                if (this.sortAscending) {
                    res = -res;
                }

                return res;
        },

        customSort: function (conf) {
            this.sortField = conf.field;
            this.sortAscending  = conf.ascending ;

            this.sort();
        },

		fetchIf: function (cb) {
            if (this.fetched) {
                cb.call();
            } else if (this.fetchInProgress) {
                this.onFetchCompleate = this.onFetchCompleate || [];
                this.onFetchCompleate.push(cb);
            } else {
                this.fetch({success: function () {
                    cb.call();
                }});
            }
        },

        fetch: function (conf) {
            conf = conf || {};
            var success = conf.success,
                error = conf.error,
                c = _.clone(conf),
                that = this;

            this.fetchInProgress = true;

            c.success = function (collection, response, options) {
                that.fetched = true;
                that.fetchInProgress = false;
                if (success && success.call) {
                    success.call(this, collection, response, options);
                }
                if (that.onFetchCompleate && that.onFetchCompleate.length) {
                    _.compose.apply(_, that.onFetchCompleate).call(this);
                    that.onFetchCompleate = [];
                }
            };

            c.error = function  (collection, response, options) {
                that.fetched = false;
                that.fetchInProgress = false;
                if (error && error.call) {
                    error.call(this, collection, response, options);
                }
            };

            Backbone.Collection.prototype.fetch.call(this, c);
        }
	});

	return Collection;
});