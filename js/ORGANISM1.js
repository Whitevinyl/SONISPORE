var org1Settings = {
    speed: 3.5,
    minSpeed: 1.8,
    fluctuation: (TAU/360) * 12,
    rotationSpeed: 12,
    small: 16,
    large: 22,
    tail: 17,
    breedRange: 420,
    breedEnergy: 8,
    breedProximity: 20,
    feedRange: 260,
    feedCap: 20,
    feedProximity: 16,
    color: 'coral',
    soundAttack: 0.1,
    soundRelease: 2.5,
    soundVolume: 0.2
};

//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------

function Organism1(x1, y1, x2, y2) {
    this.settings = org1Settings;

    // randomise position //
    this.position = new Point(tombola.range(x1, x2), tombola.range(y1, y2));
    this.lastPositions = [];

    // randomise angle //
    this.angle = tombola.rangeFloat(0, TAU);
    this.angleDest = this.angle;

    // randomise other properties //
    this.size = tombola.rangeFloat(this.settings.small, this.settings.large);
    this.speed = tombola.rangeFloat(this.settings.minSpeed, this.settings.speed);
    this.energy = tombola.rangeFloat(7,8);
}


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

Organism1.prototype.update = function() {


    // BREEDING //
    if (this.energy > this.settings.breedEnergy) {
        var partner = null;
        var range = this.settings.breedRange;
        for (j=0; j<org1.length; j++) {
            var organism = org1[j];
            if (organism!== this && organism.energy > this.settings.breedEnergy && distanceBetweenPoints(this.position, organism.position) < range ) {
                partner = organism;
                range = distanceBetweenPoints(this.position, organism.position);
            }
        }
        if (partner) {
            // point towards partner //
            this.angleDest = angleBetweenPoints(this.position, partner.position);
            if (this.speed < partner.speed) {
                this.speed -= this.settings.fluctuation;
            } else {
                this.speed += this.settings.fluctuation;
            }

            // if close enough to partner, breed! //
            if (distanceBetweenPoints(this.position, partner.position) < this.settings.breedProximity) {
                var area = 10 * scale;
                generateOrganism1(1, this.position.x - area, this.position.y - area, this.position.x + area, this.position.y + area);
                generateVisual(this.position, this.size);
                soundEvent(this.settings.soundVolume, this.settings.soundAttack, this.settings.soundRelease);
                this.energy -= 5;
                partner.energy -= 5;
            }
        }
    }


    // FEEDING //
    if (!partner && this.energy < this.settings.feedCap) {
        var target = null;
        var range = this.settings.feedRange;
        for (j=0; j<spores.length; j++) {
            var organism = spores[j];
            if (organism.variant && distanceBetweenPoints(this.position, organism.position) < range ) {
                target = organism;
                range = distanceBetweenPoints(this.position, organism.position);
            }
        }
        if (target) {

            // point towards target //
            this.angleDest = angleBetweenPoints(this.position, target.position);

            // if close enough to target, eat it! //
            if (distanceBetweenPoints(this.position, target.position) < this.settings.feedProximity) {
                this.energy += (target.size * 1.5);
                target.kill();
            }
        }
    }


    // ENERGY //
    this.energy -= 0.005;
    if (this.energy <= 0) {
        this.kill();
    }


    // MOVEMENT //
    // Store a memory of previous positions //
    this.lastPositions.push( this.position.clone() );
    if (this.lastPositions.length > this.settings.tail) {
        this.lastPositions.shift();
    }

    // Randomly increase or decrease rotation & speed //
    this.angle = normaliseAngle(this.angle);
    this.angleDest += tombola.rangeFloat(-this.settings.fluctuation, this.settings.fluctuation);
    if ((this.angleDest - this.angle) > (TAU/2)) {
        this.angleDest -= TAU;
    }
    if ((this.angleDest - this.angle) < -(TAU/2)) {
        this.angleDest += TAU;
    }

    // smoothly transition to angle //
    this.angle = lerp(this.angle, this.angleDest, this.settings.rotationSpeed);
    this.speed += tombola.rangeFloat(-this.settings.fluctuation, this.settings.fluctuation);

    // Cap the max speed so it doesn't get out of control //
    this.speedCap();

    // Update the position by adding the seed to it //
    this.position.x += (this.speed * Math.cos(this.angle));
    this.position.y += (this.speed * Math.sin(this.angle));

    // Wrap around the screen boundaries //
    screenWrap(this);
};


//-------------------------------------------------------------------------------------------
//  SPEED CAP
//-------------------------------------------------------------------------------------------

Organism1.prototype.speedCap = function() {
    this.speed = Math.min(this.speed,this.settings.speed);
    this.speed = Math.max(this.speed,this.settings.minSpeed);
};


//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

Organism1.prototype.draw = function() {
    // set color //
    ctx.fillStyle = this.settings.color;
    ctx.strokeStyle = this.settings.color;

    // set scale //
    ctx.lineWidth = 4 * scale;
    var s = this.size;


    // tail //
    if (this.lastPositions.length) {
        ctx.beginPath();
        ctx.moveTo(this.lastPositions[0].x, this.lastPositions[0].y);
        for (var j=0; j<this.lastPositions.length; j+=4) {
            ctx.lineTo(this.lastPositions[j].x, this.lastPositions[j].y);
        }
        ctx.stroke();
    }

    // head //
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);

    ctx.beginPath();
    ctx.moveTo(s * 0.75, s/2);
    ctx.lineTo(0, s * 1.25);
    ctx.moveTo(s * 0.75, -s/2);
    ctx.lineTo(0, -s * 1.25);

    ctx.moveTo(0, s/2);
    ctx.lineTo(s/2, 0);
    ctx.lineTo(0, -s/2);

    ctx.stroke();
    ctx.restore();
};

//-------------------------------------------------------------------------------------------
//  WRAP
//-------------------------------------------------------------------------------------------

Organism1.prototype.wrap = function() {
    this.lastPositions = [];
}


//-------------------------------------------------------------------------------------------
//  KILL
//-------------------------------------------------------------------------------------------

Organism1.prototype.kill = function() {
    removeFromArray(this, org1);
    var area = 30 * scale;
    generateSpores(this.size * 0.72, this.position.x - area, this.position.y - area, this.position.x + area, this.position.y + area);
    generateVisual(this.position, this.size);
    soundEvent(this.settings.soundVolume, this.settings.soundAttack, this.settings.soundRelease);
};
