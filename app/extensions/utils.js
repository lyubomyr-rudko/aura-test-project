define({
    initialize: function (app) {
        function loadCssForModule (module) {
            var moduleUri = module.uri,
                moduleUriParts,
                folderUri,
                cssFileUri;

            moduleUriParts = moduleUri.split('/');
            moduleUriParts = _.filter(moduleUriParts, function (item) { return item !== '.'; });
            moduleUriParts.pop();
            folderUri = moduleUriParts.join('/');
            cssFileUri = folderUri + '/main.css';

            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = cssFileUri;
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        app.sandbox.utils = {
            loadCssForModule: loadCssForModule
        };
    }
});