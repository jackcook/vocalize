window.speechRecognition = ( window.speechRecognition || window.webkitSpeechRecognition);

if (!!window.speechRecognition) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.lang = "en-GB";
    recognition.start();

    recognition.onstart = function() { console.log("Speech recognition started."); }
    recognition.onresult = function(event) {
      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          //console.log(event.results[i][0].transcript);
        } else {
          console.log(event.results[i][0].transcript);
        }
      }
    }
    recognition.onerror = function(event) { console.log("Error", event); }
    recognition.onend = function() { console.log("Speech recognition ended"); }
} else {
    console.error("Speech recognition is not available on this device.");
}
