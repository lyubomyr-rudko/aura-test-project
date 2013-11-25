define([
	'backbone',
	'underscore'
], function (Backbone, _) {
	return {
		showDeleteConfirmation: function (recordToDelete, nameForConirmation) {
            var resultElement = this.$el.find('.result-alert');//TODO: add functionalyty to create and append element if neaded

            if (recordToDelete) {
                bootbox.confirm("Are you sure you want to delete the " + nameForConirmation + "?", function(result) {
                    if (result) {
                        recordToDelete.destroy({
                            success: function () {
                                var text = 'Delete was successful';

                                resultElement.find("span").html(text);
                                resultElement.fadeIn().delay(4000).fadeOut();
                            }
                        });
                    }
                });
            }
        }
	};
});