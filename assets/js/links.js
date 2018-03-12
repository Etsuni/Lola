$(document).ready(function(){
    initLinks();
});

const initLinks = _ => {
	browser.storage.sync.get('links')
        .then( displayLinks );
};

const displayLinks = ({links}) => {
    if(links) {
        for(var i=0; i<links.length; i++) {
            var ul = '<ul>';

            for(var j=0; j<links[i].length; j++) {
                ul += '<li><a href="' + links[i][j]['url'] + '" title="' + links[i][j]['url'] + '" ><img src="' + links[i][j]['favicon'] + '" alt="" /></a></li>';
            }

            ul += '</ul>';
            $('#links').append(ul);
        }
    }
}
