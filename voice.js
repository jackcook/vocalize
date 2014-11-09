var language = "python";

if (annyang) {
  var brake = function() {
    editor.insert("\n");
  };

  var call = function(method, library) {
    if (typeof library == "undefined") {
      editor.insert(method + "()");
    } else {
      editor.insert(library + "." + method + "()");
    }

    editor.insert("\n");
  };

  var functoin = function(name, params) {
    switch (language) {
      case "assembly_x86":
        editor.insert("PUBLIC _" + name + "\n_" + name + " PROC");
        break;
      case "javascript":
        if (typeof params == "undefined") {
          editor.insert("function " + name + "() {");
        } else {
          params = params.replace("and ", "");
          editor.insert("function " + name + "(" + params.replace(" ", ", ") + ") {");
        }
        break;
      case "python":
        if (typeof params == "undefined") {
          editor.insert("def " + name + "():");
        } else {
          params = params.replace("and ", "");
          editor.insert("def " + name + "(" + params.replace(" ", ", ") + "):");
        }
        break;
    }

    editor.insert("\n");
  };

  var deleet = function(thing) {
    if (thing == "line") {
      editor.removeToLineStart();
    } else if (thing == "file") {
      editor.destroy();
    }
  };

  // TODO: end function

  var find = function(text) {
    editor.find(text);
  };

  var for_between = function(vra, min, max) {
    switch (language) {
      case "python":
        editor.insert("for " + vra + " in range(" + min + ", " + max + "):");
        break;
    }

    editor.insert("\n");
  };

  var for_in = function(vra, arr) {
    switch (language) {
      case "python":
        editor.insert("for " + vra + " in " + arr + ":");
        break;
    }

    editor.insert("\n");
  };

  var goto = function(line) {
    editor.gotoLine(line);
  };

  var ifs = function(args) {
    args = args.replace("is ", "");
    args = args.replace("than ", "");
    args = args.replace("then ", "");
    args = args.replace("equals", "==");
    args = args.replace("equal to", "==");
    args = args.replace("equal", "==");
    args = args.replace("less", "<");
    args = args.replace("more", ">");
    args = args.replace("greater", ">");

    switch (language) {
      case "assembly":
        editor.insert("movl $0, -8(%rbp)\nmovl $0, -4(%rbp)\n\nmovl -8(%rbp), %eax\ncmpl -4(%rbp), %eax\njge .L2");
        break;
      case "javascript":
        editor.insert("if (" + args + ") {");
        break;
      case "python":
        editor.insert("if " + args + ":");
        break;
    }

    editor.insert("\n");
  };

  var improt = function(library) {
    switch (language) {
      case "python":
        editor.insert("import " + library);
        break;
    }

    editor.insert("\n");
  };

  var improt_method = function(method, library) {
    switch (language) {
      case "python":
        editor.insert("from " + library + " import " + method);
        break;
    }

    editor.insert("\n");
  };

  var set = function(lang) {
    lang = lang.toLowerCase();
    lang = lang.replace("assembly", "assembly_x86");

    editor.getSession().setMode("ace/mode/" + lang);
    language = lang;
  };

  var swtich = function(vra) {
    switch (language) {
      case "python":
        editor.insert("switch " + vra + ":");
        break;
    }

    editor.insert("\n");
  };

  var whiles = function(args) {
    args = args.replace("is ", "");
    args = args.replace("than ", "");
    args = args.replace("then ", "");
    args = args.replace("equals", "==");
    args = args.replace("equal to", "==");
    args = args.replace("equal", "==");
    args = args.replace("less", "<");
    args = args.replace("more", ">");
    args = args.replace("greater", ">");

    switch (language) {
      case "javascript":
        editor.insert("while (" + args + ") {");
        break;
      case "python":
        editor.insert("while " + args + ":");
        break;
    }

    editor.insert("\n");
  };

  var commands = {
    'break': brake,
    'call :method': call,
    'call :method from :library': call,
    'create function :name': functoin,
    'create function :name with parameter *params': functoin,
    'create function :name with parameters *params': functoin,
    'delete this :thing': deleet,
    'find :text': find,
    'for :vra between :min and :max': for_between,
    'for :vra in :arr': for_in,
    'goto line :line': goto,
    'if *args': ifs,
    'import :library': improt,
    'import :method from :library': improt_method,
    'set the language to :lang': set,
    'switch :vra': swtich,
    'well *args': whiles,
    'while *args': whiles
  };

  annyang.addCommands(commands);
  annyang.debug(true);
  annyang.start();
}
