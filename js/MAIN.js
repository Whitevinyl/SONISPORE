

// INIT //
var canvas;
var ctx;


// METRICS //
var width = 0;
var height = 0;
var ratio = 1;
var scale = 1;
var TAU = 2 * Math.PI;


// INTERACTION //
var mouseX = 0;
var mouseY = 0;
var mouseIsDown = false;


// ECO SYSTEM //
var visuals = [];
var spores = [];
var org1 = [];
var org2 = [];


//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------

function init() {

    // SETUP CANVAS //
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    // SET CANVAS & DRAWING POSITIONS //
    metrics();

    // INITIALISE THINGS //
    setupInteraction();
    setupAudio();

    // GENERATE ORGANISMS//
    generateSpores(60, 0, 0, width, height);
    generateOrganism1(8, 0, 0, width, height);
    generateOrganism2(4, 0, 0, width, height);

    //BEGIN //
    loop();
}


//-------------------------------------------------------------------------------------------
//  GENERATE
//-------------------------------------------------------------------------------------------


function generateSpores(n, x1, y1, x2, y2) {
    for (var i=0; i<n; i++) {
        spores.push( new Spore(x1, y1, x2, y2) );
    }
}

function generateOrganism1(n, x1, y1, x2, y2) {
    for (var i=0; i<n; i++) {
        org1.push( new Organism1(x1, y1, x2, y2) );
    }
}

function generateOrganism2(n, x1, y1, x2, y2) {
    for (var i=0; i<n; i++) {
        org2.push( new Organism2(x1, y1, x2, y2) );
    }
}

function generateVisual(position, size) {
    visuals.push( new Visual(position.x, position.y, size * 2) );
}


//-------------------------------------------------------------------------------------------
//  MAIN LOOP
//-------------------------------------------------------------------------------------------


function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

function update() {

    // LOOP THROUGH ALL SPORES AND UPDATE THEIR POSITIONS //
    for (var i=0; i<spores.length; i++) {
        spores[i].update();
    }

    // LOOP THROUGH ALL ORGANISM1 AND UPDATE THEIR POSITIONS //
    for (var i=0; i<org1.length; i++) {
        org1[i].update();
    }

    // LOOP THROUGH ALL ORGANISM2 AND UPDATE THEIR POSITIONS //
    for (var i=0; i<org2.length; i++) {
        org2[i].update();
    }

    // LOOP THROUGH ALL VISUALS AND ANIMATE THEM //
    for (var i=0; i<visuals.length; i++) {
        visuals[i].update();
    }
}


//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

function draw() {

    // FILL BACKGROUND COLOR //
    ctx.fillStyle = '#111133';
    ctx.fillRect(0, 0, width, height);

    // LOOP THROUGH ALL SPORES AND DRAW THEM //
    for (var i=0; i<spores.length; i++) {
        spores[i].draw();
    }

    // LOOP THROUGH ALL ORGANISM1 AND DRAW THEM //
    for (var i=0; i<org1.length; i++) {
        org1[i].draw();
    }

    // LOOP THROUGH ALL ORGANISM2 AND DRAW THEM //
    for (var i=0; i<org2.length; i++) {
        org2[i].draw();
    }

    // LOOP THROUGH ALL VISUALS AND DRAW THEM //
    for (var i=0; i<visuals.length; i++) {
        visuals[i].draw();
    }

    // DRAW TITLE //
    ctx.fillStyle = 'snow';
    ctx.textAlign = 'center';
    ctx.font = '400 ' + (35 * scale) + 'px Open Sans';
    ctx.fillText('S O N I S P O R E', width/2, height - (70 * scale));
}

//-------------------------------------------------------------------------------------------
//  SCREEN WRAP
//-------------------------------------------------------------------------------------------

function screenWrap(instance) {
    var margin = 50;
    if (instance.position.x > (width + margin)) {
        instance.position.x = -margin;
        instance.wrap();
    }
    if (instance.position.x < -margin) {
        instance.position.x = width + margin;
        instance.wrap();
    }
    if (instance.position.y > (height + margin)) {
        instance.position.y = -margin;
        instance.wrap();
    }
    if (instance.position.y < -margin) {
        instance.position.y = height + margin;
        instance.wrap();
    }
}
