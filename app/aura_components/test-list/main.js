define(['module', 'underscore'], function (module, _) {
    return {
		templates: ['tpl'],
		
		initialize: function() {
			this.render();
			this.sandbox.utils.loadCssForModule(module);
		},
		
		render: function() {
			this.html(this.renderTemplate('tpl'));
		}
	};
});