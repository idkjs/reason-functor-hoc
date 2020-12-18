// Entry point

[@bs.val] external document: Js.t({..}) = "document";

// We're using raw DOM manipulations here, to avoid making you read
// ReasonReact when you might precisely be trying to learn it for the first
// time through the examples later.
let style = document##createElement("style");
document##head##appendChild(style);
style##innerHTML #= ExampleStyles.style;

let makeContainer = text => {
  let container = document##createElement("div");
  container##className #= "container";

  let title = document##createElement("div");
  title##className #= "containerTitle";
  title##innerText #= text;

  let content = document##createElement("div");
  content##className #= "containerContent";

  let () = container##appendChild(title);
  let () = container##appendChild(content);
  let () = document##body##appendChild(container);

  content;
};
let blogPost = "https://github.com/bloodyowl/website/blob/main/contents/blog/2019-01-23-generating-reason-react-components-with-functors.md";

let stackOverflow = "https://stackoverflow.com/questions/57641241/how-to-bind-to-and-use-a-higher-order-component-in-reasonreact";

let containerStyle =
  ReactDOMRe.Style.make(
    ~display="flex",
    ~alignItems="center",
    ~justifyContent="space-between",
    (),
  );
// All 4 examples.
ReactDOMRe.render(
  // <BlinkingGreeting>
  <div style=containerStyle>
    <div className="containerContent">
      <h2>
        "BloodyOwl Blog Post"->React.string
        <a href=blogPost target="_blank" />
      </h2>
      <a href=blogPost target="_blank"> blogPost->React.string </a>
      <h2>
        "Higher Order Component Bindind"->React.string
        <a href=stackOverflow target="_blank" />
      </h2>
      <a href=stackOverflow target="_blank"> stackOverflow->React.string </a>
    </div>
  </div>,
  // </BlinkingGreeting>
  makeContainer("Sources"),
);
ReactDOMRe.render(
  <BlinkingGreeting> <CounterFunctor3 /> </BlinkingGreeting>,
  makeContainer("Blinking Greeting Rendering Counter"),
);

ReactDOMRe.render(<CounterFunctor2 />, makeContainer("Counter Functor V2"));
ReactDOMRe.render(<CounterFunctor3 />, makeContainer("Counter Functor V3"));

DummyModule.make();

ReactDOMRe.render(
  <Counter />,
  makeContainer("Counter Render String Functor"),
);
ReactDOMRe.render(
  <ReducerFromReactJSDocs />,
  makeContainer("Reducer From ReactJS Docs"),
);

// ReactDOMRe.render(
//   <FetchedDogPictures.WrappedComponent />,
//   makeContainer("Fetched Dog Pictures"),
// );

ReactDOMRe.render(
  <BlinkingGreeting> <HOCBinding /> </BlinkingGreeting>,
  makeContainer("Source: https://stackoverflow.com/questions/57641241/how-to-bind-to-and-use-a-higher-order-component-in-reasonreact"),
);