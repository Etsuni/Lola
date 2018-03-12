const saveOptions = e => {
	e.preventDefault();

	var links = [];
	var lists = document.querySelectorAll('#links ul');

	for(var i=0; i<lists.length; i++) {
		if(lists[i].children.length > 0) {
			var category = [];

			for(var k=0; k<lists[i].children.length; k++) {
				var value = lists[i].children[k].querySelector('input').value;
				var favicon = lists[i].children[k].querySelector('img').src;

				var object = {
					'url': value,
					'favicon': favicon
				}

				if(value != "") category.push(object);
			}

			links.push(category);
		}
	}

	browser.storage.sync.set({
		name: document.querySelector( '#name' ).value,
		weatherId: document.querySelector( '#weatherId' ).value,
		weatherKey: document.querySelector( '#weatherKey' ).value,
		feedsURL: document.querySelector( '#feedsURL' ).value,
		links: links,
	});
};

const restoreOptions = _ => {
	const gettingItem = browser.storage.sync.get();

	gettingItem.then( res => {
		document.querySelector( '#name' ).value = res.name || '';
		document.querySelector( '#weatherId' ).value = res.weatherId || '';
		document.querySelector( '#weatherKey' ).value = res.weatherKey || '';
		document.querySelector( '#feedsURL' ).value = res.feedsURL || '';

		for(var i=0; i<res.links.length; i++) {
			var category = addCategory();
			var fakeEvt = {'target' : { 'parentNode': category } };

			// First link
			category.querySelector('input').value = res.links[i][0]['url'];
			category.querySelector('img').src = res.links[i][0]['favicon'];

			for(var k=1; k<res.links[i].length; k++) {
				var link = addLink(fakeEvt);
				link.querySelector('input').value = res.links[i][k]['url'];
				link.querySelector('img').src = res.links[i][k]['favicon'];
			}
		}
	});
};

document.addEventListener( 'DOMContentLoaded', restoreOptions );
document.querySelector( 'form' ).addEventListener( 'submit', saveOptions );


/** Links **/

function addCategory(evt = undefined) {
	var section = document.createElement('section');

	var ul = document.createElement('ul');
	section.appendChild(ul);
	addLink( {'target' : { 'parentNode': section } });

	if(evt) {
		document.getElementById('links').insertBefore(section, evt.target.parentNode);

	} else {
		var lastSection = document.getElementById('addCategory').parentNode;
		document.getElementById('links').insertBefore(section, lastSection);
	}

	return section
}

function addLink(evt) {
	var parent = evt.target.parentNode;

	var li = document.createElement('li');

	// Remove
	var a = document.createElement('a');
	var textnode = document.createTextNode("x");
	a.setAttribute('href', '#');
	a.appendChild(textnode);
	a.addEventListener('click', removeLink);
	li.appendChild(a);

	// Favicon
	var img = document.createElement('img');
	img.setAttribute('alt', '');
	img.setAttribute('src', 'img/default_favicon.png');
	img.setAttribute('crossOrigin', 'anonymous');
	img.addEventListener('error', onErrorImg);
	li.appendChild(img);

	// Input
	var input = document.createElement('input');
	input.setAttribute('type', 'url');
	input.setAttribute('placeholder', 'Votre URL');
	input.addEventListener('change', getFavicon);
	li.appendChild(input);

	// Add
	var a = document.createElement('a');
	var textnode = document.createTextNode("+");
	a.setAttribute('href', '#');
	a.appendChild(textnode);
	a.addEventListener('click', addLink);
	li.appendChild(a);

	// If the parent is section
	if( parent.nodeName == "SECTION") {
		parent.children[0].appendChild(li);

	// If the parent is li
	} else {
		parent.parentNode.insertBefore(li, parent.nextSibling);
	}

	return li;
}

function removeLink(evt) {
	var li = evt.target.parentNode;
	li.remove();
}

function getFavicon(evt) {
	var domain = evt.target.value.split("/")[2];
	var faviconProvider = 'http://favicon.yandex.net/favicon/';
	var url = faviconProvider + domain;

	getBase64FromUrl(url, evt.target.previousSibling);
}

function onErrorImg(evt) {
	evt.target.src = "img/default_favicon.png";
}

function getBase64FromUrl(url, image = undefined) {
	var img = new Image();
	img.crossOrigin = 'anonymous';

	img.onload = function (evt) {

		if(img.height < 5 || img.width < 5) {
			return getBase64FromUrl('img/default_favicon.png', image);
		}

		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);

		var data = canvas.toDataURL('image/png');

		canvas = null;

		if(image) image.src = data;

		return data;
	}

	img.src = url;
}

document.getElementById('addCategory').addEventListener('click' , addCategory);
