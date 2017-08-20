function Square(x, y, onOffState, parentIndex) {

	PIXI.Sprite.call(this);
	this.width = 12;
	this.height = 12;

	this.interactive = true;
	this.x = x;
	this.y = y;
	this._isOn = onOffState;
	this._isFood = false;
	this.texture = PIXI.Texture.fromImage("grey.png");
	this.toLive = false;
	this.direction = "left";
	this.parentIndex = parentIndex;
}

Square.prototype = Object.create(PIXI.Sprite.prototype);
Square.prototype.constructor = Square;

Square.prototype.isOn = function(value) {
	if (value == undefined) {
		return this._isOn;
	}

	this._isOn = value;
	if (value == false) {
		this.texture = PIXI.Texture.fromImage("grey.png");
	} else if (value == true) {
		this.texture = PIXI.Texture.fromImage("yellow.png");
	};

}

Square.prototype.isFood = function(value) {
	if (value == undefined) {
		return this._isFood;
	}
	this._isFood = value;
}