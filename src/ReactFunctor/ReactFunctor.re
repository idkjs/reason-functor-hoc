module type ParamType = {
  type t;
  let name: string;
  let render: t => React.element;
};

module Make = (Param: ParamType) => {
  type state = {
    value: Param.t,
  };
  let component = ReasonReact.reducerComponent("Demo" ++ Param.name);
  let make = (~value: Param.t, _) => {
    ...component,
    initialState: () => {value: value},
    reducer: ((), _state) => ReasonReact.NoUpdate,
    render: ({state}) =>
      <div style={ReactDOMRe.Style.make(~fontSize="32px", ())}>
        /* some markup */
         {Param.render(state.value)} </div>,
  };
};
module IntValue =
  Make({
    type t = int;
    let name = "Int";
    let render = x => x->string_of_int->React.string;
  });

// [@react.component]
// let make = IntValue.make(~value=2);
// ReactDOMRe.renderToElementWithId(<IntValue value=2 />, "preview");

