'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function useState(initial) {
  return React.useReducer((function (param, a) {
                return a;
              }), initial);
}

function usePromise(fn) {
  var match = React.useReducer((function (param, a) {
          return a;
        }), undefined);
  var setValue = match[1];
  React.useEffect((function () {
          Curry._1(fn, undefined).then(function (value) {
                Curry._1(setValue, Caml_option.some(value));
                return Promise.resolve(undefined);
              });
          
        }), [fn]);
  return match[0];
}

exports.useState = useState;
exports.usePromise = usePromise;
/* react Not a pure module */
