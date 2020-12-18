'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var Counter$ReactFunctor = require("./ReactFunctor/Counter.bs.js");
var HOCBinding$ReactFunctor = require("./HOCBinding/HOCBinding.bs.js");
var DummyModule$ReactFunctor = require("./PromiseHook/DummyModule.bs.js");
var ExampleStyles$ReactFunctor = require("./ExampleStyles.bs.js");
var CounterFunctor2$ReactFunctor = require("./ReactFunctor/CounterFunctor2.bs.js");
var CounterFunctor3$ReactFunctor = require("./ReactFunctor/CounterFunctor3.bs.js");
var BlinkingGreeting$ReactFunctor = require("./BlinkingGreeting/BlinkingGreeting.bs.js");
var ReducerFromReactJSDocs$ReactFunctor = require("./ReducerFromReactJSDocs/ReducerFromReactJSDocs.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$ReactFunctor.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

var blogPost = "https://github.com/bloodyowl/website/blob/main/contents/blog/2019-01-23-generating-reason-react-components-with-functors.md";

var stackOverflow = "https://stackoverflow.com/questions/57641241/how-to-bind-to-and-use-a-higher-order-component-in-reasonreact";

var containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

ReactDom.render(React.createElement("div", {
          style: containerStyle
        }, React.createElement("div", {
              className: "containerContent"
            }, React.createElement("h2", undefined, "BloodyOwl Blog Post", React.createElement("a", {
                      href: blogPost,
                      target: "_blank"
                    })), React.createElement("a", {
                  href: blogPost,
                  target: "_blank"
                }, blogPost), React.createElement("h2", undefined, "Higher Order Component Bindind", React.createElement("a", {
                      href: stackOverflow,
                      target: "_blank"
                    })), React.createElement("a", {
                  href: stackOverflow,
                  target: "_blank"
                }, stackOverflow))), makeContainer("Sources"));

ReactDom.render(React.createElement(BlinkingGreeting$ReactFunctor.make, {
          children: React.createElement(CounterFunctor3$ReactFunctor.make, {})
        }), makeContainer("Blinking Greeting Rendering Counter"));

ReactDom.render(React.createElement(CounterFunctor2$ReactFunctor.make, {}), makeContainer("Counter Functor V2"));

ReactDom.render(React.createElement(CounterFunctor3$ReactFunctor.make, {}), makeContainer("Counter Functor V3"));

DummyModule$ReactFunctor.make(undefined);

ReactDom.render(React.createElement(Counter$ReactFunctor.make, {}), makeContainer("Counter Render String Functor"));

ReactDom.render(React.createElement(ReducerFromReactJSDocs$ReactFunctor.make, {}), makeContainer("Reducer From ReactJS Docs"));

ReactDom.render(React.createElement(BlinkingGreeting$ReactFunctor.make, {
          children: React.createElement(HOCBinding$ReactFunctor.make, {})
        }), makeContainer("Source: https://stackoverflow.com/questions/57641241/how-to-bind-to-and-use-a-higher-order-component-in-reasonreact"));

exports.style = style;
exports.makeContainer = makeContainer;
exports.blogPost = blogPost;
exports.stackOverflow = stackOverflow;
exports.containerStyle = containerStyle;
/* style Not a pure module */
