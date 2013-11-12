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
            loadCssForModule: loadCssForModule,
            waitForSubscriberAndTriggerEvent: waitForSubscriberAndTriggerEvent
        };

        function waitForSubscriberAndTriggerEvent (eventName, id, that) {
            var i, len, events = that.sandbox._events;
            //that.sandbox.on('examsEditForm:initEdit', function (id) {debugger;});
            //that.sandbox.emit('examsEditForm:initEdit', id);
            if (events && events.length) {
                for (i = 0, len = events.length; i < len; i += 1) {


                }
            }
        }

        // that.sandbox.utils.waitForSubscriberAndTriggerEvent('examsEditForm:initEdit', id, that);
    }
});