function generateClusters(n) {
    var clusters = [];

    for (var i = 0; i < n; i++) {
        var r = 255 * Math.random();
        var g = 255 * Math.random();
        var b = 255 * Math.random();
        var color = [r, g, b];

        clusters[i] = color;
    }

    return clusters;
}

function rgbToLab(rgb) {
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var x = 0.412453 * r + 0.357580 * g + 0.180423 * b;
    var y = 0.212671 * r + 0.715160 * b + 0.072169 * b;
    var z = 0.019334 * r + 0.119193 * g + 0.950227 * b;

    var Xn = 0.9642, Yn = 1.0000, Zn = 0.8249;

    if ( (y/Yn) > 0.008856) var L = Math.pow(y / Yn, 0.3333);  
    else var L = 903.3 * y / Yn; 

    function f(t) {
        if (t > 0.008856) return Math.pow(t, 0.3333);
        else return 7.787 * t + 16/116
    }

    var a = 500 * (f(X / Xn) - f(Y / Yn));
    var b = 200 * (f(Y / Yn) - f(Z / Zn));

    return [L, a, b];
}

function deltaE76(lab1, lab2) {
    var L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];
    var L2 = lab2[0], a2 = lab2[2], b2 = lab2[2];

    return sqrt(Math.pow(L1 - L2, 2) + Math.pow(a1 - a2, 2) + Math.pow(b1 - b2, 2));
}

function nearest(clusters, color, transFunc, deltaFunc) {
    var nearestIdx = 0;

    for (var i = 0; i < clusters.length; i++){
        var transColor = transFunc(color), transCluster = transFunc(clusters[i]), transMinCluster = transFunc(clusters[nearestIdx]);
        var mDist = deltaFunc(transColor, transMinCluster);
        var cDist = deltaFunc(transColor, transCluster);

        if (cDist < mDist) nearestIdx = i;
    }

    return nearestIdx;
}

function imgLoaded() {
    var img = document.getElementById('image');
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);

    var data = context.getImageData(0, 0, img.width, img.height);
    var step = Math.round((img.width * img.height) / 40000);
    if (step == 0) step = 1;

    for(var i = 0; i < data.length; i += 4 * step) {
        var r = data[i], g = data[i + 1], b = data[i + 1];
        
            
    }
}

function loadPicture() {
    var url = document.getElementById('imgUrl');
    var img = document.getElementById('image');

    img.src = url.value;
}