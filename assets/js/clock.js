/* Clock */
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function updateClock() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    document.getElementById('clock').innerText = pad(h, 2) + ':' + pad(m, 2);
    if(checkDate) writeDate()
}

var checkDate = false;
function writeDate() {
    var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai','Juin', 'Juillet', 'Août', 'Septembre', 'Octobre','Novembre', 'Décembre'];

    var today = new Date();
    document.getElementById('date').innerText = days[today.getDay()] + ' ' + today.getDate() + ' ' + months[today.getMonth()];
    $('#date').fadeTo("slow" , 1);
}


// Update the clock every 5 seconds
window.setInterval(updateClock, 5000);

// Display the hello message
browser.storage.sync.get('name')
    .then( function(evt) {
        var name = evt.name;
        var hello = "Bonjour";

        var d = new Date();
        var h = d.getHours();
        if( h>18 || h<5 ) hello = "Bonsoir"

        if(name) document.getElementById('date').innerText = hello + " " + name
        else document.getElementById('date').innerText = hello
    });

// Will display the date 4 seconds after this script is loaded
window.setTimeout( function() {
    $('#date').fadeTo( "slow" , 0, function() {
        checkDate = true;
    })
}, 4000);

updateClock();
$('#wrapper').fadeIn();
