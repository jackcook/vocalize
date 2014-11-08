window.speechRecognition = (window.speechRecognition || window.webkitSpeechRecognition);

if (!!window.speechRecognition) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.start();

  recognition.onstart = function() { console.log("Speech recognition started."); }
  recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        process_command(event.results[i][0].transcript);
      }
    }
  }
  recognition.onerror = function(event) { console.log("Error", event); }
  recognition.onend = function() { console.log("Speech recognition ended"); }
} else {
  console.error("Speech recognition is not available on this device.");
}

function process_command(command) {
  var args = command.split(" ");

  if (args[0].substr(args[0].length - 1) == ".") {
    editor.insert(args[0] + args[1] + "()");
  } else {
    switch (args[0]) {
      case "break":
        editor.insert("break\ntest");
      case "call":
        editor.insert(args[3] + "." + args[1] + "()");
      case "import":
        editor.insert("import " + args[1]);
    }
  }
}
