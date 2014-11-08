window.speechRecognition = ( window.speechRecognition || window.webkitSpeechRecognition);

// Check access to the speech recogntion object
if(!!window.speechRecognition) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.lang = "en-GB";
    recognition.start();

    recognition.onstart = function() { console.log("Speech recognition started."); }
    recognition.onresult = function(event) {
        // Do something with the result
    }
    recognition.onerror = function(event) { console.log("Error", event); }
    recognition.onend = function() { console.log("Speech recognition ended"); }
} else {
    console.error("Speech recognition is not available on this device.");
}
