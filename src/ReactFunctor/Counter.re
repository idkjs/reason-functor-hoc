module type ParamType = {
  type t;
  let name: string;
  let toInt: string => int;
  let toString: t => string;
  let render: t => React.element;
};
let leftButtonStyle = ReactDOMRe.Style.make(~borderRadius="4px 0px 0px 4px", ~width="48px", ());
let rightButtonStyle = ReactDOMRe.Style.make(~borderRadius="0px 4px 4px 0px", ~width="48px", ());
let containerStyle = ReactDOMRe.Style.make(~display="flex", ~alignItems="center", ~justifyContent="space-between", ());
module Make = (Param: ParamType) => {
  type state = {value: Param.t};

  let useState = initial => React.useReducer((_, a) => a, initial);

  [@react.component]
  let make = (~value: Param.t, ()) => {
    let (state, _) = useState({value: value});

    let countMsg = "Count: " ++ state.value->Param.toString;
    <div style={ReactDOMRe.Style.make(~fontSize="32px", ())}>
      <p> {React.string(Param.name)} </p>
      <p> {ReasonReact.string(countMsg)} </p>
      {Param.render(state.value)}
    </div>;
  };
};

module IntValue =
  Make({
    type t = int;
    let name = "Int";
    let toInt = s => s->int_of_string;
    let toString = i => i->string_of_int;
    let render = x => x->string_of_int->React.string;
  });

[@react.component]
let make = () => {
  <IntValue value=2 />;
};
// let reducer = (state, action) =>
//   switch (action) {
//   | Add => state + 1
//   };
// [@react.component]
// let make = () => {
//   let (state, dispatch) = React.useReducer(reducer, 0);

//   let countMsg = "Count: " ++ string_of_int(state);
//   <div>
//     <p> {ReasonReact.string(countMsg)} </p>
//     <button onClick={_event => dispatch(Add)}>
//       {ReasonReact.string("Add")}
//     </button>
//   </div>;
// };
// type action =
//   | Add;

// let component = ReasonReact.reducerComponent("Counter");

// let make = (_children) => {
//   ...component,
//   initialState: () => 0,
//   reducer: (action, state) =>
//     switch action {
//     | Add => ReasonReact.Update(state + 1)
//     },
//   render: (self) => {
//     let countMsg = "Count: " ++ string_of_int(self.state);
//     <div>
//       <p> (ReasonReact.string(countMsg)) </p>
//       <button onClick=(_event => self.send(Add))>
//         (ReasonReact.string("Add"))
//       </button>
//     </div>
//   }
