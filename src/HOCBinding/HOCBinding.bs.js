'use strict';

var React = require("react");

const withStrong =
  BaseComponent => props =>
    React.createElement("strong", null,
      React.createElement(BaseComponent, props))
;

function HOCBinding$HelloMessage(Props) {
  var name = Props.name;
  return React.createElement("div", undefined, "Hello " + name);
}

var HelloMessage = {
  make: HOCBinding$HelloMessage
};

var make = withStrong(HOCBinding$HelloMessage);

var StrongMessage = {
  make: make
};

function HOCBinding(Props) {
  return React.createElement("div", undefined, React.createElement(HOCBinding$HelloMessage, {
                  name: "Joe"
                }), React.createElement(make, {
                  name: "Strongbad!"
                }));
}

var make$1 = HOCBinding;

exports.HelloMessage = HelloMessage;
exports.StrongMessage = StrongMessage;
exports.make = make$1;
/*  Not a pure module */
