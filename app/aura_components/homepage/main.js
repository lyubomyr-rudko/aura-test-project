define(['module', 'underscore'], function(module, _) {
    return {
		templates: ['tpl'],
		View: {
			events: {
				'click a[data-toggle=tab]': function(e) {
					var currentBtn = $(e.currentTarget).parent(),
						currentTab = this.$el.find($(e.currentTarget).attr('href')),
						activeBtn = this.$el.find('li.active'),
						activeTab = this.$el.find('div.tab-pane.active'),
						isActive = currentBtn.hasClass('active');

					if (!isActive) {
						//mark active button as not active
						activeBtn.toggleClass('active');
						activeTab.toggleClass('active');
						//mark current button as active
						currentBtn.toggleClass('active');
						currentTab.toggleClass('active');
					}
				}
			}
		},
		initialize: function() {
			this.render();
			this.sandbox.utils.loadCssForModule(module);
		},
		render: function() {
			this.html(this.renderTemplate('tpl'));
		}
	};
});