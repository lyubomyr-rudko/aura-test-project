requirejs.config({
	paths: {
		'models': '/js/models',
		'collections': '/js/collections',
    'base': '/js/base',
    'mixins': '/js/mixins'
	}
});

require(['bower_components/aura/lib/aura'], function(Aura) {
  Aura({
    debug: { enable: true }
  }).use('extensions/aura-backbones')
    .use('extensions/aura-templates')
    .use('extensions/utils')
    .use('extensions/router')
    .start();
});


