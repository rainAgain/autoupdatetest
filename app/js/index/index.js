// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



const request = require('request');

const $send = document.getElementById('send');
const $url = document.getElementById('url');
const $response = document.getElementById('response');

$send.onclick = function() {
	request($url.value, (error, response, body) => {
	  if (!error && response.statusCode == 200) {
	    $response.innerHTML = body;
	  }
	});
};


const $autoupdate = document.getElementById('autoupdate');

$autoupdate.onclick = function() {
	
};