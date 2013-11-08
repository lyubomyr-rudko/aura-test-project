define(['module', 'underscore'], function(module, _) {
	var moduleUri = module.uri;

	function loadModuleCss (moduleUri) {
		var moduleUriPat,
			folderUri,
			cssFileUri;

		moduleUriParts = moduleUri.split('/');
		moduleUriParts = _.filter(moduleUriParts, function(item) { return item !== '.'; });
		moduleUriParts.pop();
		folderUri = moduleUriParts.join('/');
		cssFileUri = folderUri + '/main.css';

        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = cssFileUri;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    loadModuleCss(moduleUri);

    return {
		templates: ['tpl'],
		initialize: function() {
			this.render();
		},
		render: function() {
			this.html(this.renderTemplate('tpl'));
		}
	};
});