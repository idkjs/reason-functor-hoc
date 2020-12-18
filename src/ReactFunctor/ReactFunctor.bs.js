'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReasonReact = require("reason-react/src/legacy/ReasonReact.bs.js");

function Make(Param) {
  var component = ReasonReact.reducerComponent("Demo" + Param.name);
  var make = function (value, param) {
    return {
            debugName: component.debugName,
            reactClassInternal: component.reactClassInternal,
            handedOffState: component.handedOffState,
            willReceiveProps: component.willReceiveProps,
            didMount: component.didMount,
            didUpdate: component.didUpdate,
            willUnmount: component.willUnmount,
            willUpdate: component.willUpdate,
            shouldUpdate: component.shouldUpdate,
            render: (function (param) {
                return React.createElement("div", {
                            style: {
                              fontSize: "32px"
                            }
                          }, Curry._1(Param.render, param.state.value));
              }),
            initialState: (function (param) {
                return {
                        value: value
                      };
              }),
            retainedProps: component.retainedProps,
            reducer: (function (param, _state) {
                return /* NoUpdate */0;
              }),
            jsElementWrapped: component.jsElementWrapped
          };
  };
  return {
          component: component,
          make: make
        };
}

var component = ReasonReact.reducerComponent("DemoInt");

function make(value, param) {
  return {
          debugName: component.debugName,
          reactClassInternal: component.reactClassInternal,
          handedOffState: component.handedOffState,
          willReceiveProps: component.willReceiveProps,
          didMount: component.didMount,
          didUpdate: component.didUpdate,
          willUnmount: component.willUnmount,
          willUpdate: component.willUpdate,
          shouldUpdate: component.shouldUpdate,
          render: (function (param) {
              return React.createElement("div", {
                          style: {
                            fontSize: "32px"
                          }
                        }, String(param.state.value));
            }),
          initialState: (function (param) {
              return {
                      value: value
                    };
            }),
          retainedProps: component.retainedProps,
          reducer: (function (param, _state) {
              return /* NoUpdate */0;
            }),
          jsElementWrapped: component.jsElementWrapped
        };
}

var IntValue = {
  component: component,
  make: make
};

exports.Make = Make;
exports.IntValue = IntValue;
/* component Not a pure module */
