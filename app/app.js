requirejs.config({
	paths: {
		'models': '../js/models',
		'collections': '../js/collections'
	}
});

require(['bower_components/aura/lib/aura'], function(Aura) {
  Aura({
    debug: { enable: true }
  }).use('extensions/aura-backbones')
    .use('extensions/aura-templates')
    .use('extensions/utils')
    .start();
});


