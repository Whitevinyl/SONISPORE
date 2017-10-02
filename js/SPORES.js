
var sporeSettings = {
    speed: 1.6,
    fluctuation: 0.2,
    small: 1,
    large: 4,
    variation: 34,
    color: 'snow',
    highlight: 'coral',
    soundAttack: 0.02,
    soundRelease: 0.12,
    soundVolume: 0.5
};

//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------

function Spore(x1, y1, x2, y2) {
    this.settings = sporeSettings;

    // randomise position //
    this.position = new Point(tombola.range(x1, x2), tombola.range(y1, y2));

    // randomise other properties //
    this.size = tombola.rangeFloat(this.settings.small, this.settings.large);
    this.speedX = tombola.rangeFloat(-this.settings.speed, this.settings.speed);
    this.speedY = tombola.rangeFloat(-this.settings.speed, this.settings.speed);
    this.variant = tombola.percent(this.settings.variation);
}


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

Spore.prototype.update = function() {

    // Randomly increase or decrease horizontal & vertical speeds //
    this.speedX += tombola.rangeFloat(-this.settings.fluctuation, this.settings.fluctuation);
    this.speedY += tombola.rangeFloat(-this.settings.fluctuation, this.settings.fluctuation);

    // Cap the max speed so it doesn't get out of control //
    this.speedCap();

    // Update the position by adding the speed to it //
    this.position.x += this.speedX;
    this.position.y += this.speedY;

    // Wrap around the screen boundaries //
    screenWrap(this);
};


//-------------------------------------------------------------------------------------------
//  SPEED CAP
//-------------------------------------------------------------------------------------------

Spore.prototype.speedCap = function() {
    this.speedX = Math.min(this.speedX,this.settings.speed);
    this.speedX = Math.max(this.speedX,-this.settings.speed);
    this.speedY = Math.min(this.speedY,this.settings.speed);
    this.speedY = Math.max(this.speedY,-this.settings.speed);
};


//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

Spore.prototype.draw = function() {
    ctx.fillStyle = this.settings.color;
    ctx.strokeStyle = this.settings.highlight;
    ctx.lineWidth = 4 * scale;
    var s = this.size;

    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    if (this.variant) {
        s *= 2;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s, 0);
        ctx.closePath();
        ctx.stroke();
    } else {
        ctx.fillRect(-s / 2, -s / 2, s, s);
    }

    ctx.restore();
};

//-------------------------------------------------------------------------------------------
//  WRAP
//-------------------------------------------------------------------------------------------

Spore.prototype.wrap = function() {
};

//-------------------------------------------------------------------------------------------
//  KILL
//-------------------------------------------------------------------------------------------

Spore.prototype.kill = function() {
    removeFromArray(this, spores);
    generateVisual(this.position, this.size);
    soundEvent(this.settings.soundVolume, this.settings.soundAttack, this.settings.soundRelease);
};
