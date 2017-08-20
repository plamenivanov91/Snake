function Field(mWidth, mHeight, interval) {

	PIXI.Container.call(this);
	this.matrixWidth = mWidth;
	this.matrixHeight = mHeight;
	this.startPositions = [];
	this.headCol = 12;
	this.headRow = 10;
	this.tailCol = this.headCol;
	this.tailRow = this.headRow;

	for (var i = 0; i < 10; i++) {
		this.startPositions.push([this.headCol + i, this.headRow]);
	};
	this.tailCol += i - 1;
	this.availableFoodSquares = [];
	this.generateField();
	that = this;
	this.x = 10;
	this.y = 10;
	this.snakeLength = 10;
	this.intervalAnimation(false, interval);
	this.headDirection = "left";
	this.changeDirectionComplete = true;

}

Field.prototype = Object.create(PIXI.Container.prototype);
Field.prototype.constructor = Field;

Field.prototype.generateField = function() {
	var index = 0;
	var square;
	this.matrix = new Array();
	for (i = 0; i < this.matrixHeight; i++) {
		this.matrix[i] = new Array();
		for (j = 0; j < this.matrixWidth; j++) {

			square = new Square(13 * i, 13 * j, false, index);
			index++;
			this.matrix[i][j] = square;
			this.addChild(this.matrix[i][j]);
		}
	}
	for (var i = 0; i < this.startPositions.length; i++) {
		this.matrix[this.startPositions[i][0]][this.startPositions[i][1]].isOn(true);
	};

	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i].isOn() == true) {
			continue;
		} else {
			this.availableFoodSquares.push(this.children[i].parentIndex);
		}
	};

	this.generateFood();
}


window.addEventListener("keydown", function checkKey(e) {
	e = e || window.event;

	if (e.keyCode == '38' && that.headDirection != "down" && that.changeDirectionComplete == true) { //  && that.headDirection != "up"
		that.changeDirectionComplete = false;
		that.headDirection = "up";
	} else if (e.keyCode == '40' && that.headDirection != "up" && that.changeDirectionComplete == true) { //  && that.headDirection != "down"
		that.changeDirectionComplete = false;
		that.headDirection = "down";
	} else if (e.keyCode == '37' && that.headDirection != "right" && that.changeDirectionComplete == true) { // && that.headDirection != "left"
		that.changeDirectionComplete = false;
		that.headDirection = "left";
	} else if (e.keyCode == '39' && that.headDirection != "left" && that.changeDirectionComplete == true) { // && that.headDirection != "right"
		that.changeDirectionComplete = false;
		that.headDirection = "right";
	}

})


Field.prototype.generateFood = function() {

	var cell = this.children[this.availableFoodSquares[Math.floor(Math.random() * this.availableFoodSquares.length)]];
	cell.isOn(true);
	cell.isFood(true);
};

Field.prototype.tailDirection = function() {
	this.matrix[this.tailCol][this.tailRow].isOn(false);
	this.availableFoodSquares.push(this.matrix[this.tailCol][this.tailRow].parentIndex);
	switch (this.matrix[this.tailCol][this.tailRow].direction) {
		case "up":
			this.tailRow--;
			break;
		case "down":
			this.tailRow++;
			break;
		case "left":
			this.tailCol--;
			break;
		case "right":
			this.tailCol++;
			break;
	}

}

Field.prototype.intervalAnimation = function(stop, interval) {
	var start = new Date;

	if (stop == true) {
		clearInterval(this.secondsInterval);
		stop = false;
		return;
	}

	this.secondsInterval = setInterval(function() {

		var head = that.headDirection;
		var n = that.availableFoodSquares.indexOf(that.matrix[that.headCol][that.headRow].parentIndex);
		that.availableFoodSquares.splice(n, 1);
		if (head == "up") {
			that.matrix[that.headCol][that.headRow].direction = "up";
			that.headRow--;
		} else if (head == "down") {
			that.matrix[that.headCol][that.headRow].direction = "down";
			that.headRow++;
		} else if (head == "left") {
			that.matrix[that.headCol][that.headRow].direction = "left";
			that.headCol--;
		} else if (head == "right") {
			that.matrix[that.headCol][that.headRow].direction = "right";
			that.headCol++;
		}



		if ((that.headRow > that.matrixWidth - 1) || (that.headCol > that.matrixHeight - 1) || (that.headCol < 0) || (that.headRow < 0)) {
			console.log("Out Of Bounds");
			that.gameOver();
			return;
		};

		if (that.matrix[that.headCol][that.headRow].isFood() != true && that.matrix[that.headCol][that.headRow].isOn() == true) {
			console.log("I ate my tale");
			that.gameOver();
		} else if (that.matrix[that.headCol][that.headRow].isOn() == true && that.matrix[that.headCol][that.headRow].isFood() == true) { //&& that.snakeArr[that.headCol][that.headRow] != undefined) {
			that.snakeLength++;
			console.log("I ate an apple, my length is " + that.snakeLength + " squares.");

			that.matrix[that.headCol][that.headRow].isFood(false);
			that.generateFood();
			that.changeDirectionComplete = true;
		} else {
			that.matrix[that.headCol][that.headRow].isOn(true);
			that.tailDirection();
			that.changeDirectionComplete = true;
		}

	}, interval);

}

Field.prototype.gameOver = function() {
	console.log("Game Over");
	this.intervalAnimation(true, 100);
};