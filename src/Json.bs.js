'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Scanf = require("bs-platform/lib/js/scanf.js");
var $$Buffer = require("bs-platform/lib/js/buffer.js");
var Printf = require("bs-platform/lib/js/printf.js");
var $$String = require("bs-platform/lib/js/string.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

function string_of_number(f) {
  var s = f.toString();
  if (Caml_string.get(s, s.length - 1 | 0) === /* "." */46) {
    return $$String.sub(s, 0, s.length - 1 | 0);
  } else {
    return s;
  }
}

function $pipe$bang(o, d) {
  if (o !== undefined) {
    return Caml_option.valFromOption(o);
  } else {
    return Pervasives.failwith(d);
  }
}

function $pipe$question(o, d) {
  if (o !== undefined) {
    return Caml_option.valFromOption(o);
  } else {
    return d;
  }
}

function $pipe$question$great(o, fn) {
  if (o !== undefined) {
    return Curry._1(fn, Caml_option.valFromOption(o));
  }
  
}

function $pipe$question$great$great(o, fn) {
  if (o !== undefined) {
    return Caml_option.some(Curry._1(fn, Caml_option.valFromOption(o)));
  }
  
}

function fold(o, d, f) {
  if (o !== undefined) {
    return Curry._1(f, Caml_option.valFromOption(o));
  } else {
    return d;
  }
}

var Infix = {
  $pipe$bang: $pipe$bang,
  $pipe$question: $pipe$question,
  $pipe$question$great: $pipe$question$great,
  $pipe$question$great$great: $pipe$question$great$great,
  fold: fold
};

function $$escape(text) {
  var ln = text.length;
  var buf = $$Buffer.create(ln);
  var loop = function (_i) {
    while(true) {
      var i = _i;
      if (i >= ln) {
        return ;
      }
      var c = Caml_string.get(text, i);
      if (c !== 34) {
        if (c !== 92) {
          if (c >= 14) {
            $$Buffer.add_char(buf, c);
          } else {
            switch (c) {
              case 8 :
                  $$Buffer.add_string(buf, "\\b");
                  break;
              case 9 :
                  $$Buffer.add_string(buf, "\\t");
                  break;
              case 10 :
                  $$Buffer.add_string(buf, "\\n");
                  break;
              case 0 :
              case 1 :
              case 2 :
              case 3 :
              case 4 :
              case 5 :
              case 6 :
              case 7 :
              case 11 :
                  $$Buffer.add_char(buf, c);
                  break;
              case 12 :
                  $$Buffer.add_string(buf, "\\f");
                  break;
              case 13 :
                  $$Buffer.add_string(buf, "\\r");
                  break;
              
            }
          }
        } else {
          $$Buffer.add_string(buf, "\\\\");
        }
      } else {
        $$Buffer.add_string(buf, "\\\"");
      }
      _i = i + 1 | 0;
      continue ;
    };
  };
  loop(0);
  return $$Buffer.contents(buf);
}

function stringify(t) {
  if (typeof t === "number") {
    switch (t) {
      case /* True */0 :
          return "true";
      case /* False */1 :
          return "false";
      case /* Null */2 :
          return "null";
      
    }
  } else {
    switch (t.TAG | 0) {
      case /* String */0 :
          return "\"" + ($$escape(t._0) + "\"");
      case /* Number */1 :
          return string_of_number(t._0);
      case /* Array */2 :
          return "[" + ($$String.concat(", ", List.map(stringify, t._0)) + "]");
      case /* Object */3 :
          return "{" + ($$String.concat(", ", List.map((function (param) {
                              return "\"" + ($$String.escaped(param[0]) + ("\": " + stringify(param[1])));
                            }), t._0)) + "}");
      
    }
  }
}

function unwrap(message, t) {
  if (t !== undefined) {
    return Caml_option.valFromOption(t);
  } else {
    return Pervasives.failwith(message);
  }
}

function split_by(keep_emptyOpt, is_delim, str) {
  var keep_empty = keep_emptyOpt !== undefined ? keep_emptyOpt : false;
  var len = str.length;
  var _acc = /* [] */0;
  var _last_pos = len;
  var _pos = len - 1 | 0;
  while(true) {
    var pos = _pos;
    var last_pos = _last_pos;
    var acc = _acc;
    if (pos === -1) {
      if (last_pos === 0 && !keep_empty) {
        return acc;
      } else {
        return {
                hd: $$String.sub(str, 0, last_pos),
                tl: acc
              };
      }
    }
    if (Curry._1(is_delim, Caml_string.get(str, pos))) {
      var new_len = (last_pos - pos | 0) - 1 | 0;
      if (new_len !== 0 || keep_empty) {
        var v = $$String.sub(str, pos + 1 | 0, new_len);
        _pos = pos - 1 | 0;
        _last_pos = pos;
        _acc = {
          hd: v,
          tl: acc
        };
        continue ;
      }
      _pos = pos - 1 | 0;
      _last_pos = pos;
      continue ;
    }
    _pos = pos - 1 | 0;
    continue ;
  };
}

function fail(text, pos, message) {
  var pre = $$String.sub(text, 0, pos);
  var lines = split_by(undefined, (function (c) {
          return c === /* "\n" */10;
        }), pre);
  var count = List.length(lines);
  var last = count > 0 ? List.nth(lines, count - 1 | 0) : "";
  var col = last.length + 1 | 0;
  var line = List.length(lines);
  return Pervasives.failwith(Curry._4(Printf.sprintf(/* Format */{
                      _0: {
                        TAG: /* String_literal */11,
                        _0: "Error \"",
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: {
                            TAG: /* String_literal */11,
                            _0: "\" at ",
                            _1: {
                              TAG: /* Int */4,
                              _0: /* Int_d */0,
                              _1: /* No_padding */0,
                              _2: /* No_precision */0,
                              _3: {
                                TAG: /* Char_literal */12,
                                _0: /* ":" */58,
                                _1: {
                                  TAG: /* Int */4,
                                  _0: /* Int_d */0,
                                  _1: /* No_padding */0,
                                  _2: /* No_precision */0,
                                  _3: {
                                    TAG: /* String_literal */11,
                                    _0: " -> ",
                                    _1: {
                                      TAG: /* String */2,
                                      _0: /* No_padding */0,
                                      _1: {
                                        TAG: /* Char_literal */12,
                                        _0: /* "\n" */10,
                                        _1: /* End_of_format */0
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      _1: "Error \"%s\" at %d:%d -> %s\n"
                    }), message, line, col, last));
}

function skipToNewline(text, _pos) {
  while(true) {
    var pos = _pos;
    if (pos >= text.length) {
      return pos;
    }
    if (Caml_string.get(text, pos) === /* "\n" */10) {
      return pos + 1 | 0;
    }
    _pos = pos + 1 | 0;
    continue ;
  };
}

function stringTail(text) {
  var len = text.length;
  if (len > 1) {
    return $$String.sub(text, 1, len - 1 | 0);
  } else {
    return "";
  }
}

function skipToCloseMultilineComment(text, _pos) {
  while(true) {
    var pos = _pos;
    if ((pos + 1 | 0) >= text.length) {
      return Pervasives.failwith("Unterminated comment");
    }
    if (Caml_string.get(text, pos) === /* "*" */42 && Caml_string.get(text, pos + 1 | 0) === /* "/" */47) {
      return pos + 2 | 0;
    }
    _pos = pos + 1 | 0;
    continue ;
  };
}

function skipWhite(text, _pos) {
  while(true) {
    var pos = _pos;
    if (!(pos < text.length && (Caml_string.get(text, pos) === /* " " */32 || Caml_string.get(text, pos) === /* "\t" */9 || Caml_string.get(text, pos) === /* "\n" */10 || Caml_string.get(text, pos) === /* "\r" */13))) {
      return pos;
    }
    _pos = pos + 1 | 0;
    continue ;
  };
}

function parseString(text, pos) {
  var buffer = $$Buffer.create(text.length);
  var ln = text.length;
  var loop = function (_i) {
    while(true) {
      var i = _i;
      if (i >= ln) {
        return fail(text, i, "Unterminated string");
      }
      var c = Caml_string.get(text, i);
      if (c === 34) {
        return i + 1 | 0;
      }
      if (c !== 92) {
        $$Buffer.add_char(buffer, c);
        _i = i + 1 | 0;
        continue ;
      }
      if ((i + 1 | 0) >= ln) {
        return fail(text, i, "Unterminated string");
      }
      var match = Caml_string.get(text, i + 1 | 0);
      if (match !== 47) {
        if (match !== 102) {
          $$Buffer.add_string(buffer, Scanf.unescaped($$String.sub(text, i, 2)));
          _i = i + 2 | 0;
          continue ;
        }
        $$Buffer.add_char(buffer, /* "\012" */12);
        _i = i + 2 | 0;
        continue ;
      }
      $$Buffer.add_char(buffer, /* "/" */47);
      _i = i + 2 | 0;
      continue ;
    };
  };
  var $$final = loop(pos);
  return [
          $$Buffer.contents(buffer),
          $$final
        ];
}

function parseDigits(text, pos) {
  var len = text.length;
  var _i = pos + 1 | 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return i;
    }
    var match = Caml_string.get(text, i);
    if (match > 57 || match < 48) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function parseWithDecimal(text, pos) {
  var pos$1 = parseDigits(text, pos);
  if (pos$1 < text.length && Caml_string.get(text, pos$1) === /* "." */46) {
    return parseDigits(text, pos$1 + 1 | 0);
  } else {
    return pos$1;
  }
}

function parseNumber(text, pos) {
  var pos$1 = parseWithDecimal(text, pos);
  var ln = text.length;
  if (!(pos$1 < (ln - 1 | 0) && (Caml_string.get(text, pos$1) === /* "E" */69 || Caml_string.get(text, pos$1) === /* "e" */101))) {
    return pos$1;
  }
  var match = Caml_string.get(text, pos$1 + 1 | 0);
  var pos$2 = match !== 43 && match !== 45 ? pos$1 + 1 | 0 : pos$1 + 2 | 0;
  return parseDigits(text, pos$2);
}

function parseNegativeNumber(text, pos) {
  var $$final = Caml_string.get(text, pos) === /* "-" */45 ? parseNumber(text, pos + 1 | 0) : parseNumber(text, pos);
  return [
          {
            TAG: /* Number */1,
            _0: Caml_format.caml_float_of_string($$String.sub(text, pos, $$final - pos | 0))
          },
          $$final
        ];
}

function expect($$char, text, pos, message) {
  if (Caml_string.get(text, pos) !== $$char) {
    return fail(text, pos, "Expected: " + message);
  } else {
    return pos + 1 | 0;
  }
}

function parseComment(text, pos, next) {
  if (Caml_string.get(text, pos) !== /* "/" */47) {
    if (Caml_string.get(text, pos) === /* "*" */42) {
      return Curry._2(next, text, skipToCloseMultilineComment(text, pos + 1 | 0));
    } else {
      return Pervasives.failwith("Invalid syntax");
    }
  } else {
    return Curry._2(next, text, skipToNewline(text, pos + 1 | 0));
  }
}

function maybeSkipComment(text, pos) {
  if (pos < text.length && Caml_string.get(text, pos) === /* "/" */47) {
    if ((pos + 1 | 0) < text.length && Caml_string.get(text, pos + 1 | 0) === /* "/" */47) {
      return skipToNewline(text, pos + 1 | 0);
    } else if ((pos + 1 | 0) < text.length && Caml_string.get(text, pos + 1 | 0) === /* "*" */42) {
      return skipToCloseMultilineComment(text, pos + 1 | 0);
    } else {
      return fail(text, pos, "Invalid synatx");
    }
  } else {
    return pos;
  }
}

function skip(text, _pos) {
  while(true) {
    var pos = _pos;
    if (pos === text.length) {
      return pos;
    }
    var n = maybeSkipComment(text, skipWhite(text, pos));
    if (n <= pos) {
      return n;
    }
    _pos = n;
    continue ;
  };
}

function parse(text, _pos) {
  while(true) {
    var pos = _pos;
    if (pos >= text.length) {
      return fail(text, pos, "Reached end of file without being done parsing");
    }
    var match = Caml_string.get(text, pos);
    if (match >= 92) {
      if (match >= 111) {
        if (match !== 116) {
          if (match !== 123) {
            return fail(text, pos, "unexpected character");
          } else {
            return parseObject(text, pos + 1 | 0);
          }
        } else if ($$String.sub(text, pos, 4) === "true") {
          return [
                  /* True */0,
                  pos + 4 | 0
                ];
        } else {
          return fail(text, pos, "unexpected character");
        }
      } else if (match !== 102) {
        if (match >= 110 && $$String.sub(text, pos, 4) === "null") {
          return [
                  /* Null */2,
                  pos + 4 | 0
                ];
        } else {
          return fail(text, pos, "unexpected character");
        }
      } else if ($$String.sub(text, pos, 5) === "false") {
        return [
                /* False */1,
                pos + 5 | 0
              ];
      } else {
        return fail(text, pos, "unexpected character");
      }
    }
    if (match >= 14) {
      var switcher = match - 32 | 0;
      if (switcher > 25 || switcher < 0) {
        if (switcher >= 59) {
          return parseArray(text, pos + 1 | 0);
        } else {
          return fail(text, pos, "unexpected character");
        }
      }
      if (switcher >= 16) {
        return parseNegativeNumber(text, pos);
      }
      switch (switcher) {
        case 0 :
            break;
        case 2 :
            var match$1 = parseString(text, pos + 1 | 0);
            return [
                    {
                      TAG: /* String */0,
                      _0: match$1[0]
                    },
                    match$1[1]
                  ];
        case 13 :
            return parseNegativeNumber(text, pos);
        case 1 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 8 :
        case 9 :
        case 10 :
        case 11 :
        case 12 :
        case 14 :
            return fail(text, pos, "unexpected character");
        case 15 :
            return parseComment(text, pos + 1 | 0, parse);
        
      }
    } else if (match >= 11) {
      if (match < 13) {
        return fail(text, pos, "unexpected character");
      }
      
    } else if (match < 9) {
      return fail(text, pos, "unexpected character");
    }
    _pos = skipWhite(text, pos);
    continue ;
  };
}

function parseArrayValue(text, pos) {
  var pos$1 = skip(text, pos);
  var match = parse(text, pos$1);
  var value = match[0];
  var pos$2 = skip(text, match[1]);
  var match$1 = Caml_string.get(text, pos$2);
  if (match$1 !== 44) {
    if (match$1 !== 93) {
      return fail(text, pos$2, "unexpected character");
    } else {
      return [
              {
                hd: value,
                tl: /* [] */0
              },
              pos$2 + 1 | 0
            ];
    }
  }
  var pos$3 = skip(text, pos$2 + 1 | 0);
  if (Caml_string.get(text, pos$3) === /* "]" */93) {
    return [
            {
              hd: value,
              tl: /* [] */0
            },
            pos$3 + 1 | 0
          ];
  }
  var match$2 = parseArrayValue(text, pos$3);
  return [
          {
            hd: value,
            tl: match$2[0]
          },
          match$2[1]
        ];
}

function parseArray(text, pos) {
  var pos$1 = skip(text, pos);
  var match = Caml_string.get(text, pos$1);
  if (match === 93) {
    return [
            {
              TAG: /* Array */2,
              _0: /* [] */0
            },
            pos$1 + 1 | 0
          ];
  }
  var match$1 = parseArrayValue(text, pos$1);
  return [
          {
            TAG: /* Array */2,
            _0: match$1[0]
          },
          match$1[1]
        ];
}

function parseObjectValue(text, pos) {
  var pos$1 = skip(text, pos);
  if (Caml_string.get(text, pos$1) !== /* "\"" */34) {
    return fail(text, pos$1, "Expected string");
  }
  var match = parseString(text, pos$1 + 1 | 0);
  var key = match[0];
  var pos$2 = skip(text, match[1]);
  var pos$3 = expect(/* ":" */58, text, pos$2, "Colon");
  var match$1 = parse(text, pos$3);
  var value = match$1[0];
  var pos$4 = skip(text, match$1[1]);
  var match$2 = Caml_string.get(text, pos$4);
  if (match$2 !== 44) {
    if (match$2 === 125) {
      return [
              {
                hd: [
                  key,
                  value
                ],
                tl: /* [] */0
              },
              pos$4 + 1 | 0
            ];
    }
    var match$3 = parseObjectValue(text, pos$4);
    return [
            {
              hd: [
                key,
                value
              ],
              tl: match$3[0]
            },
            match$3[1]
          ];
  }
  var pos$5 = skip(text, pos$4 + 1 | 0);
  if (Caml_string.get(text, pos$5) === /* "}" */125) {
    return [
            {
              hd: [
                key,
                value
              ],
              tl: /* [] */0
            },
            pos$5 + 1 | 0
          ];
  }
  var match$4 = parseObjectValue(text, pos$5);
  return [
          {
            hd: [
              key,
              value
            ],
            tl: match$4[0]
          },
          match$4[1]
        ];
}

function parseObject(text, pos) {
  var pos$1 = skip(text, pos);
  if (Caml_string.get(text, pos$1) === /* "}" */125) {
    return [
            {
              TAG: /* Object */3,
              _0: /* [] */0
            },
            pos$1 + 1 | 0
          ];
  }
  var match = parseObjectValue(text, pos$1);
  return [
          {
            TAG: /* Object */3,
            _0: match[0]
          },
          match[1]
        ];
}

var Parser = {
  split_by: split_by,
  fail: fail,
  skipToNewline: skipToNewline,
  stringTail: stringTail,
  skipToCloseMultilineComment: skipToCloseMultilineComment,
  skipWhite: skipWhite,
  parseString: parseString,
  parseDigits: parseDigits,
  parseWithDecimal: parseWithDecimal,
  parseNumber: parseNumber,
  parseNegativeNumber: parseNegativeNumber,
  expect: expect,
  parseComment: parseComment,
  maybeSkipComment: maybeSkipComment,
  skip: skip,
  parse: parse,
  parseArrayValue: parseArrayValue,
  parseArray: parseArray,
  parseObjectValue: parseObjectValue,
  parseObject: parseObject
};

function parse$1(text) {
  var match = parse(text, 0);
  var pos = skip(text, match[1]);
  if (pos < text.length) {
    return Pervasives.failwith("Extra data after parse finished: " + $$String.sub(text, pos, text.length - pos | 0));
  } else {
    return match[0];
  }
}

function bind(v, fn) {
  if (v !== undefined) {
    return Curry._1(fn, Caml_option.valFromOption(v));
  }
  
}

function get(key, t) {
  if (typeof t === "number") {
    return ;
  }
  if (t.TAG !== /* Object */3) {
    return ;
  }
  try {
    return List.assoc(key, t._0);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return ;
    }
    throw exn;
  }
}

function nth(n, t) {
  if (typeof t === "number") {
    return ;
  }
  if (t.TAG !== /* Array */2) {
    return ;
  }
  var items = t._0;
  if (n < List.length(items)) {
    return List.nth(items, n);
  }
  
}

function string(t) {
  if (typeof t === "number" || t.TAG) {
    return ;
  } else {
    return t._0;
  }
}

function number(t) {
  if (typeof t === "number" || t.TAG !== /* Number */1) {
    return ;
  } else {
    return t._0;
  }
}

function array(t) {
  if (typeof t === "number" || t.TAG !== /* Array */2) {
    return ;
  } else {
    return t._0;
  }
}

function obj(t) {
  if (typeof t === "number" || t.TAG !== /* Object */3) {
    return ;
  } else {
    return t._0;
  }
}

function bool(t) {
  if (typeof t !== "number") {
    return ;
  }
  switch (t) {
    case /* True */0 :
        return true;
    case /* False */1 :
        return false;
    case /* Null */2 :
        return ;
    
  }
}

function $$null(t) {
  if (typeof t === "number" && t >= 2) {
    return Caml_option.some(undefined);
  }
  
}

function parsePath(_keyList, _t) {
  while(true) {
    var t = _t;
    var keyList = _keyList;
    if (!keyList) {
      return t;
    }
    var value = get(keyList.hd, t);
    if (value === undefined) {
      return ;
    }
    _t = value;
    _keyList = keyList.tl;
    continue ;
  };
}

function getPath(path, t) {
  var keys = split_by(undefined, (function (c) {
          return c === /* "." */46;
        }), path);
  return parsePath(keys, t);
}

exports.string_of_number = string_of_number;
exports.Infix = Infix;
exports.$$escape = $$escape;
exports.stringify = stringify;
exports.unwrap = unwrap;
exports.Parser = Parser;
exports.parse = parse$1;
exports.bind = bind;
exports.get = get;
exports.nth = nth;
exports.string = string;
exports.number = number;
exports.array = array;
exports.obj = obj;
exports.bool = bool;
exports.$$null = $$null;
exports.parsePath = parsePath;
exports.getPath = getPath;
/* Scanf Not a pure module */