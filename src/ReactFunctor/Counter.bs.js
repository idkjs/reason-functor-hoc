'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

var leftButtonStyle = {
  width: "48px",
  borderRadius: "4px 0px 0px 4px"
};

var rightButtonStyle = {
  width: "48px",
  borderRadius: "0px 4px 4px 0px"
};

var containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

function Make(Param) {
  var useState = function (initial) {
    return React.useReducer((function (param, a) {
                  return a;
                }), initial);
  };
  var Counter$Make = function (Props) {
    var value = Props.value;
    var match = React.useReducer((function (param, a) {
            return a;
          }), {
          value: value
        });
    var state = match[0];
    var countMsg = "Count: " + Curry._1(Param.toString, state.value);
    return React.createElement("div", {
                style: {
                  fontSize: "32px"
                }
              }, React.createElement("p", undefined, Param.name), React.createElement("p", undefined, countMsg), Curry._1(Param.render, state.value));
  };
  return {
          useState: useState,
          make: Counter$Make
        };
}

function useState(initial) {
  return React.useReducer((function (param, a) {
                return a;
              }), initial);
}

function Counter$Make(Props) {
  var value = Props.value;
  var match = React.useReducer((function (param, a) {
          return a;
        }), {
        value: value
      });
  var state = match[0];
  var countMsg = "Count: " + String(state.value);
  return React.createElement("div", {
              style: {
                fontSize: "32px"
              }
            }, React.createElement("p", undefined, "Int"), React.createElement("p", undefined, countMsg), String(state.value));
}

var IntValue = {
  useState: useState,
  make: Counter$Make
};

function Counter(Props) {
  return React.createElement(Counter$Make, {
              value: 2
            });
}

var make = Counter;

exports.leftButtonStyle = leftButtonStyle;
exports.rightButtonStyle = rightButtonStyle;
exports.containerStyle = containerStyle;
exports.Make = Make;
exports.IntValue = IntValue;
exports.make = make;
/* react Not a pure module */
