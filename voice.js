var language = "python";

if (annyang) {
  var brake = function() {
    editor.insert("\n");
  };

  var call = function(method, library) {
    switch (language) {
      case "javascript":
        if (typeof library == "undefined") {
          editor.insert(method + "();");
        } else {
          editor.insert(library + "." + method + "();");
        }
        break;
      case "lua":
      case "python":
        if (typeof library == "undefined") {
          editor.insert(method + "()");
        } else {
          editor.insert(library + "." + method + "()");
        }
        break;
    }

    editor.insert("\n");
  };

  var callp = function(method, library, params) {
    params = params.split("and ").join("").split("& ").join("").split(" ").join(", ");

    switch (language) {
      case "javascript":
        if (typeof library == "undefined") {
          editor.insert(method + "(" + params + ");");
        } else {
          editor.insert(library + "." + method + "(" + params + ");");
        }
        break;
      case "lua":
      case "python":
        if (typeof library == "undefined") {
          editor.insert(method + "(" + params + ")");
        } else {
          editor.insert(library + "." + method + "(" + params + ")");
        }
        break;
    }

    editor.insert("\n");
  }

  var functoin = function(name, params) {
    switch (language) {
      case "assembly_x86":
        editor.insert("PUBLIC _" + name + "\n_" + name + " PROC");
        break;
      case "javascript":
        if (typeof params == "undefined") {
          editor.insert("function " + name + "() {");
        } else {
          params = params.split("and ").join("").split(" ").join(", ");
          editor.insert("function " + name + "(" + params + ") {");
        }
        break;
      case "lua":
        if (typeof params == "undefined") {
          editor.insert(name + " = function ()");
        } else {
          params = params.split("and ").join("").split(" ").join(", ");
          editor.insert(name + " = function (" + params + ")");
        }
      case "python":
        if (typeof params == "undefined") {
          editor.insert("def " + name + "():");
        } else {
          params = params.split("and ").join("").split(" ").join(", ");
          editor.insert("def " + name + "(" + params + "):");
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

  var end = function() {
    switch (language) {
      case "javascript":
        editor.insert("}");
        editor.insert("\n");
        break;
      case "lua":
        editor.insert("end");
        editor.insert("\n");
        break;
      case "python":
        editor.removeToLineStart();
        editor.indent();
        break;
    }
  };

  var elsa = function() {
    switch (language) {
      case "javascript":
        editor.insert("} else {");
        break;
      case "lua":
        editor.insert("else");
        break;
      case "python":
        editor.insert("else:");
        break;
    }

    editor.insert("\n");
  };

  var elsaif = function(args) {
    args = conditionalize(args);

    switch (language) {
      case "javascript":
        editor.insert("} else if (" + args + ") {");
        break;
      case "lua":
        editor.insert("elseif " + args + " then");
        break;
      case "python":
        editor.insert("elif " + args + ":");
        break;
    }

    editor.insert("\n");
  };

  var find = function(text) {
    editor.find(text);
  };

  var for_between = function(vra, min, max) {
    switch (language) {
      case "javascript":
        editor.insert("for (int i = 0; i < " + arr + ".length; i++) {");
        break;
      case "lua":
        editor.insert("for i=" + min + "," + max + " do");
        break;
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
    args = conditionalize(args);

    switch (language) {
      case "assembly":
        editor.insert("movl $0, -8(%rbp)\nmovl $0, -4(%rbp)\n\nmovl -8(%rbp), %eax\ncmpl -4(%rbp), %eax\njge .L2");
        break;
      case "javascript":
        editor.insert("if (" + args + ") {");
        break;
      case "lua":
        editor.insert("if " + args + " then");
        break;
      case "python":
        editor.insert("if " + args + ":");
        break;
    }

    editor.insert("\n");
  };

  var improt = function(library) {
    switch (language) {
      case "lua":
        editor.insert("requre \"" + library + "\"");
        break;
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
      case "javascript":
        editor.insert("switch (" + vra + ") {");
        break;
      case "python":
        editor.insert("switch " + vra + ":");
        break;
    }

    editor.insert("\n");
  };

  var variable = function(name, value) {
    var val = string_to_num(value);

    switch (language) {
      case "javascript":
        if (typeof val == "string") {
          editor.insert("var " + name + " = \"" + val + "\";");
        } else if (typeof val == "number") {
          editor.insert("var " + name + " = " + val + ";");
        }
        break;
      case "lua":
      case "python":
        if (typeof val == "string") {
          editor.insert(name + " = \"" + val + "\"");
        } else if (typeof val == "number") {
          editor.insert(name + " = " + val);
        }
        break;
    }

    editor.insert("\n");
  }

  var whiles = function(args) {
    args = conditionalize(args);

    switch (language) {
      case "javascript":
        editor.insert("while (" + args + ") {");
        break;
      case "lua":
        editor.insert("while " + args + " do");
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
    'call :method with parameter *params': callp,
    'call :method with parameters *params': callp,
    'call :method from :library with parameter *params': callp,
    'call :method from :library with parameters *params': callp,
    'create (a) function (called) :name': functoin,
    'create (a) function (called) :name with parameter *params': functoin,
    'create (a) function (called) :name with parameters *params': functoin,
    'create (a) variable (called) :name (that is) equal to :value': variable,
    'delete this :thing': deleet,
    'else': elsa,
    'else if *args': elsaif,
    'end': end,
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

  setInterval(function() {
    localStorage.setItem("code", editor.getValue());
  }, 1000);
}

function conditionalize(str) {
  str = str.replace("is ", "");
  str = str.replace("than ", "");
  str = str.replace("then ", "");
  str = str.replace("equals", "==");
  str = str.replace("equal to", "==");
  str = str.replace("equal", "==");
  str = str.replace("less", "<");
  str = str.replace("more", ">");
  str = str.replace("greater", ">");
  return str;
}

function string_to_num(str) {
  str = str.toLowerCase();
  if (str == "0" || str == "zero") return 0;
  if (str == "1" || str == "one") return 1;
  if (str == "2" || str == "two") return 2;
  if (str == "3" || str == "three") return 3;
  if (str == "4" || str == "four" || str == "for") return 4;
  if (str == "5" || str == "five") return 5;
  if (str == "6" || str == "six") return 6;
  if (str == "7" || str == "seven") return 7;
  if (str == "8" || str == "eight") return 8;
  if (str == "9" || str == "nine") return 9;
  return str
}
