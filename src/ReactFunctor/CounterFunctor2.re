module type ParamType = {
  type t;
  let name: string;
  let inc: (t, int) => t;
  let dec: (t, int) => t;
  let toString: t => React.element;
};
let leftButtonStyle =
  ReactDOMRe.Style.make(~borderRadius="4px 0px 0px 4px", ~width="48px", ());
let rightButtonStyle =
  ReactDOMRe.Style.make(~borderRadius="0px 4px 4px 0px", ~width="48px", ());
let containerStyle =
  ReactDOMRe.Style.make(
    ~display="flex",
    ~alignItems="center",
    ~justifyContent="space-between",
    (),
  );
module Make = (Param: ParamType) => {
  type state = {count: Param.t};

  type action =
    | Increment
    | Decrement;

  let reducer = (state, action) =>
    switch (action) {
    | Increment => {count: Param.inc(state.count, 1)}
    | Decrement => {count: Param.dec(state.count, 1)}
    };

  [@react.component]
  let make = (~value: Param.t) => {
    let (state, dispatch) = React.useReducer(reducer, {count: value});

    <main style=containerStyle>
      <div>
        <BlinkingGreeting>
          {React.string("Count: ")}
          {Param.toString(state.count)}
        </BlinkingGreeting>
      </div>
      <div>
        <button style=rightButtonStyle onClick={_ => dispatch(Decrement)}>
          {React.string("-")}
        </button>
        <button style=leftButtonStyle onClick={_ => dispatch(Increment)}>
          {React.string("+")}
        </button>
      </div>
    </main>;
  };
};

module IntValue =
  Make({
    type t = int;
    let name = "Int";
    let inc = (t, int) => t + int;
    let dec = (t, int) => t - int;
    let toString = x => x->string_of_int->React.string;
  });

[@react.component]
let make = () => {
  <IntValue value=23 />;
};
