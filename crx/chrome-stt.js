document.getElementById('select_dialect').value = "en-IN";

var startButton = document.getElementById('start_button');
var startImg = document.getElementById('start_img');
var finalSpan = document.getElementById('final_span');
var interimSpan = document.getElementById('interim_span');

var lastFinalTranscript = '';

console.log('chrome-stt plugin loaded');

function updateFinalTranscript() {
    if (finalSpan.textContent.length > 0 &&
	lastFinalTranscript !== finalSpan.textContent) {
	lastFinalTranscript = lastFinalTranscript.replace(/\*/g, '\\*');
	var lft = new RegExp("^" + lastFinalTranscript);
        var stt = finalSpan.textContent.replace(lft, '').trim();
	console.log("sending a message now...");
	$.get("http://localhost:9876", {'stt': stt}, function(response) {
            console.log("response: ", response);
	});
	lastFinalTranscript = finalSpan.textContent;
    }
}

function keepListening() {
    if (startImg.src === "https://www.google.com/intl/en/chrome/assets/common/images/content/mic.gif") {
	updateFinalTranscript();
	lastFinalTranscript = '';
        console.log("Clicking button");
	startButton.click();
    }
}

var lastInterimTranscript = '';

function useInterimTranscript() {
    if (lastInterimTranscript.length > 0 && interimSpan.textContent === lastInterimTranscript) {
	console.log("using interim transcript");
	startButton.click();
	updateFinalTranscript();
	startButton.click();
    }
    else
	lastInterimTranscript = interimSpan.textContent;
}

setInterval(keepListening, 1000);
setInterval(updateFinalTranscript, 1000);
setInterval(useInterimTranscript, 1000);
