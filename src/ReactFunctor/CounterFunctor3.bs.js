'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var BlinkingGreeting$ReactFunctor = require("../BlinkingGreeting/BlinkingGreeting.bs.js");

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
  var CounterFunctor3$Make = function (Props) {
    var value = Props.value;
    var match = React.useReducer((function (param, a) {
            return a;
          }), {
          count: value
        });
    var dispatch = match[1];
    var state = match[0];
    return React.createElement("div", {
                style: containerStyle
              }, React.createElement("div", undefined, Param.name, React.createElement(BlinkingGreeting$ReactFunctor.make, {
                        children: null
                      }, "Count: ", Curry._1(Param.toString, state.count))), React.createElement("div", undefined, React.createElement("button", {
                        style: leftButtonStyle,
                        onClick: (function (param) {
                            return Curry._1(dispatch, {
                                        count: Curry._2(Param.dec, state.count, 1)
                                      });
                          })
                      }, "-"), React.createElement("button", {
                        style: rightButtonStyle,
                        onClick: (function (param) {
                            return Curry._1(dispatch, {
                                        count: Curry._2(Param.inc, state.count, 1)
                                      });
                          })
                      }, "+")));
  };
  return {
          useState: useState,
          make: CounterFunctor3$Make
        };
}

function useState(initial) {
  return React.useReducer((function (param, a) {
                return a;
              }), initial);
}

function CounterFunctor3$Make(Props) {
  var value = Props.value;
  var match = React.useReducer((function (param, a) {
          return a;
        }), {
        count: value
      });
  var dispatch = match[1];
  var state = match[0];
  return React.createElement("div", {
              style: containerStyle
            }, React.createElement("div", undefined, "Counter Functor V3", React.createElement(BlinkingGreeting$ReactFunctor.make, {
                      children: null
                    }, "Count: ", String(state.count))), React.createElement("div", undefined, React.createElement("button", {
                      style: leftButtonStyle,
                      onClick: (function (param) {
                          return Curry._1(dispatch, {
                                      count: state.count - 1 | 0
                                    });
                        })
                    }, "-"), React.createElement("button", {
                      style: rightButtonStyle,
                      onClick: (function (param) {
                          return Curry._1(dispatch, {
                                      count: state.count + 1 | 0
                                    });
                        })
                    }, "+")));
}

var IntValue = {
  useState: useState,
  make: CounterFunctor3$Make
};

function CounterFunctor3(Props) {
  return React.createElement(CounterFunctor3$Make, {
              value: 5
            });
}

var make = CounterFunctor3;

exports.leftButtonStyle = leftButtonStyle;
exports.rightButtonStyle = rightButtonStyle;
exports.containerStyle = containerStyle;
exports.Make = Make;
exports.IntValue = IntValue;
exports.make = make;
/* react Not a pure module */
