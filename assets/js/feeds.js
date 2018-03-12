$(document).ready(function(){
    initFB();
});

const initFB = _ => {
	browser.storage.sync.get('feedsURL')
        .then( getNotificationsFB );
};

const getNotificationsFB = ({feedsURL}) => {

    // Get the data
    $.getJSON(feedsURL, function(result){

        for(var i=0; i<result.length; i++) {
            var notif = result[i];

            var list = $('#feeds ul');
            var li = '<li><a href="' + notif['url'] + '"><img src="' + notif['img'] +'"" alt="" />' + notif['content'] + '</a></li>';
            list.append(li);
        }

        $('#feeds, #feeds ul').fadeIn(1000);

    });
}
