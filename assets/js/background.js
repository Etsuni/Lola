function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// Change the background
var background = (Math.floor(Math.random() * 14) + 1);

$('#wrapper').css('background-image', 'url("img/backgrounds/' + pad(background, 2) + '.jpg")');
