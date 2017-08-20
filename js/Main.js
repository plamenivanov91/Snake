$(document).ready(function() {
	var stage, renderer, target;

	var loader = new PIXI.loaders.Loader();

	loader.add('sprites', "src/sprites.json");
	loader.on('complete', onAssetsLoaded, this);
	loader.load();

	function onAssetsLoaded() {

		stage = new PIXI.Container();
		renderer = new PIXI.autoDetectRenderer(800, 600);
		document.body.appendChild(renderer.view);
		requestAnimationFrame(animate);

		field = new Field(30, 30, 70);
		stage.addChild(field);

	}

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(stage);
	}

});