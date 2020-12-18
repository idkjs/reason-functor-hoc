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
  var reducer = function (state, action) {
    if (action) {
      return {
              count: Curry._2(Param.dec, state.count, 1)
            };
    } else {
      return {
              count: Curry._2(Param.inc, state.count, 1)
            };
    }
  };
  var CounterFunctor2$Make = function (Props) {
    var value = Props.value;
    var match = React.useReducer(reducer, {
          count: value
        });
    var dispatch = match[1];
    return React.createElement("main", {
                style: containerStyle
              }, React.createElement("div", undefined, React.createElement(BlinkingGreeting$ReactFunctor.make, {
                        children: null
                      }, "Count: ", Curry._1(Param.toString, match[0].count))), React.createElement("div", undefined, React.createElement("button", {
                        style: rightButtonStyle,
                        onClick: (function (param) {
                            return Curry._1(dispatch, /* Decrement */1);
                          })
                      }, "-"), React.createElement("button", {
                        style: leftButtonStyle,
                        onClick: (function (param) {
                            return Curry._1(dispatch, /* Increment */0);
                          })
                      }, "+")));
  };
  return {
          reducer: reducer,
          make: CounterFunctor2$Make
        };
}

function reducer(state, action) {
  if (action) {
    return {
            count: state.count - 1 | 0
          };
  } else {
    return {
            count: state.count + 1 | 0
          };
  }
}

function CounterFunctor2$Make(Props) {
  var value = Props.value;
  var match = React.useReducer(reducer, {
        count: value
      });
  var dispatch = match[1];
  return React.createElement("main", {
              style: containerStyle
            }, React.createElement("div", undefined, React.createElement(BlinkingGreeting$ReactFunctor.make, {
                      children: null
                    }, "Count: ", String(match[0].count))), React.createElement("div", undefined, React.createElement("button", {
                      style: rightButtonStyle,
                      onClick: (function (param) {
                          return Curry._1(dispatch, /* Decrement */1);
                        })
                    }, "-"), React.createElement("button", {
                      style: leftButtonStyle,
                      onClick: (function (param) {
                          return Curry._1(dispatch, /* Increment */0);
                        })
                    }, "+")));
}

var IntValue = {
  reducer: reducer,
  make: CounterFunctor2$Make
};

function CounterFunctor2(Props) {
  return React.createElement(CounterFunctor2$Make, {
              value: 23
            });
}

var make = CounterFunctor2;

exports.leftButtonStyle = leftButtonStyle;
exports.rightButtonStyle = rightButtonStyle;
exports.containerStyle = containerStyle;
exports.Make = Make;
exports.IntValue = IntValue;
exports.make = make;
/* react Not a pure module */
