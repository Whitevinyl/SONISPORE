var visualSettings = {
    color: 'lightCoral'
}

//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------

function Visual(x, y, size) {
    this.settings = visualSettings;
    this.position = new Point(x, y);
    this.size = size * scale;
    this.alpha = 100;
}

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

Visual.prototype.update = function() {
    // fade and grow //
    this.alpha -= 2;
    this.size++;

    // destroy when fully faded //
    if (this.alpha <= 0) {
        removeFromArray(this, visuals);
    }
};

//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

Visual.prototype.draw = function() {
    ctx.globalAlpha = this.alpha/100;
    ctx.strokeStyle = this.settings.color;
    ctx.lineWidth = 4 * scale;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, TAU);
    ctx.moveTo(this.position.x + this.size + 10, this.position.y);
    ctx.arc(this.position.x, this.position.y, this.size + 10, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
};
