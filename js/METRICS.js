

//-------------------------------------------------------------------------------------------
//  METRICS
//-------------------------------------------------------------------------------------------

function metrics() {

    // GET DISPLAY DIMENSIONS //
    ratio = getPixelRatio();
    width = window.innerWidth * ratio;
    height = window.innerHeight * ratio;
    scale = ratio/2;



    // SET CANVAS DIMENSIONS //
    canvas.width  = width;
    canvas.height = height;
}


//-------------------------------------------------------------------------------------------
//  PIXEL RATIO
//-------------------------------------------------------------------------------------------

function getPixelRatio() {
    var dpr = window.devicePixelRatio || 1;
    var bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
}

//-------------------------------------------------------------------------------------------
//  SCALE SETTINGS
//-------------------------------------------------------------------------------------------

// a cheap scaling of certain settings, relative to pixel ratio //
function scaleSettings() {
    sporeSettings.speed *= scale;
    sporeSettings.fluctuation *= scale;
    sporeSettings.small *= scale;
    sporeSettings.large *= scale;

    org1Settings.speed *= scale;
    org1Settings.minSpeed *= scale;
    org1Settings.small *= scale;
    org1Settings.large *= scale;
    org1Settings.breedRange *= scale;
    org1Settings.feedRange *= scale;

    org2Settings.speed *= scale;
    org2Settings.minSpeed *= scale;
    org2Settings.small *= scale;
    org2Settings.large *= scale;
    org2Settings.breedRange *= scale;
    org2Settings.feedRange *= scale;
}
