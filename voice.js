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
    if (args[0] == "") args.shift();
    switch (args[0]) {
      case "break":
        editor.insert("\n");
        break;
      case "call":
        if (args[2] == "from") {
          editor.insert(args[3] + "." + args[1] + "()");
        } else {
          editor.insert(args[1] + "()");
        }
        break;
      case "create":
        if (args[1] == "function") {
          if (args[4] == "parameters" || args[4] == "parameter" || args[4] == "perimeter") {
            var params = args.slice(5);
            if (params.length > 1) {
              params.splice(-2, 1);
              editor.insert("def " + args[2] + "(" + params + "):");
            } else {
              editor.insert("def " + args[2] + "(" + args[5] + "):");
            }
          } else {
            console.log(args[4]);
            editor.insert("def " + args[2] + "():");
          }
        } else if (args[1] == "string") {
          editor.insert("\"");
        }
        break;
      case "end":
        if (args[1] == "function") {
          editor.insert("\n");
          editor.removeToLineStart();
          console.log("endfunction");
        } else if (args[1] == "string") {
          editor.insert("\"");
        }
        break;
      case "import":
        editor.insert("import " + args[1]);
        break;
      default:
        console.log(args);
    }
  }
}
