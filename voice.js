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

var language = "python";

function process_command(command) {
  var args = command.split(" ");

  for (var i = 0; i < args.length; i++) {
    args[i] = args[i].toLowerCase();
  }

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
          editor.insert(call(args[1], args[3]));
        } else {
          editor.insert(call(args[1], ""));
        }
        process_command("break");
        break;
      case "create":
        if (args[1] == "function") {
          if (args[4] == "parameters" || args[4] == "parameter" || args[4] == "perimeter") {
            var params = args.slice(5);
            if (params.length > 1) {
              params.splice(-2, 1);
              editor.insert(func(args[2], params));
            } else {
              editor.insert(func(args[2], args[5]));
            }
          } else {
            editor.insert(func(args[2], ""));
          }
        } else if (args[1] == "string") {
          editor.insert("\"");
        }
        process_command("break");
        break;
      case "delete":
        if (args[2] == "line") {
          editor.removeToLineStart();
        } else if (args[2] == "file") {
          editor.destroy();
        }
        break;
      case "and":
      case "end":
        if (args[1] == "function") {
          editor.insert("\n");
          editor.removeToLineStart();
        } else if (args[1] == "string") {
          editor.insert("\"");
        }
        break;
      case "find":
        editor.find(args[1]);
        break;
      case "for":
        if (args[2] == "between") {
          editor.insert("for " + args[1] + " in range(" + args[3] + ", " + args[5] + "):")
        } else if (args[2] == "in") {
          editor.insert("for " + args[1] + " in " + args[3] + ":")
        }
        process_command("break");
        break;
      case "delta":
      case "goto":
        editor.gotoLine(args[2]);
        break;
      case "import":
        editor.insert("import " + args[1]);
        break;
      case "replace":
        editor.replace(args[1]);
        break;
      case "set":
        if (args[2] == "language") {
          editor.getSession().setMode("ace/mode/" + args[4].toLowerCase());
          language = args[4].toLowerCase();
        }
        break;
      case "switch":
        editor.insert(args[0] + " " + args[1] + ":");
        process_command("break");
        break;
      case "if":
      case "while":
        var keyword = args[0];
        args.shift();
        var argstr = args.join(" ");
        argstr = argstr.replace("is ", "");
        argstr = argstr.replace("than ", "");
        argstr = argstr.replace("then ", "");
        argstr = argstr.replace("equals", "==");
        argstr = argstr.replace("equal to", "==");
        argstr = argstr.replace("equal", "==");
        argstr = argstr.replace("less", "<");
        argstr = argstr.replace("more", ">");
        argstr = argstr.replace("greater", ">");

        editor.insert(ifwhile(keyword, argstr));
        process_command("break");
        break;
      default:
        console.log(args);
    }
  }
}

function call(method, library) {
  if (library == "") {
    return method + "()";
  } else {
    return library + "." + method + "()";
  }
}

function func(name, parameters) {
  switch (language) {
    case "python":
      if (typeof parameters == "string") {
        if (parameters == "") {
          return "def " + name + "():";
        } else {
          return "def " + name + "(" + parameters + "):";
        }
      } else {
        return "def " + name + "(" + parameters.join(", ") + "):";
      }
  }
}

function ifwhile(keyword, args) {
  switch (language) {
    case "javascript":
      return keyword + " (" + args + ") {";
    case "python":
      return keyword + " " + args + ":";
    case "swift":
      return keyword + " " + args + " {";
  }
}
