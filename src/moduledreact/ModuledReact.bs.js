'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");

function js_children(children) {
  if (typeof children === "number") {
    return null;
  }
  switch (children.TAG | 0) {
    case /* Text */0 :
    case /* Int */1 :
    case /* Float */2 :
    case /* ReactElement */3 :
        return identity(children._0);
    case /* Children */4 :
        return identity($$Array.of_list(children._0));
    
  }
}

function createDOMElement(tag, config, children) {
  config.children = js_children(children);
  return React.createElement(tag, config);
}

function button(param, param$1) {
  return createDOMElement("button", param, param$1);
}

function noop(param) {
  
}

function average(a, b) {
  return (a + b) / 2.0;
}

function setMlState($$this, state) {
  var partial_arg = Curry._1($$this, {
        ml: state
      });
  return function (param) {
    partial_arg.setState(param);
    
  };
}

exports.js_children = js_children;
exports.createDOMElement = createDOMElement;
exports.button = button;
exports.noop = noop;
exports.average = average;
exports.setMlState = setMlState;
/* No side effect */
