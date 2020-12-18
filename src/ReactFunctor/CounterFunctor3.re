module type ParamType = {
  type t;
  let name: string;
  let inc: (t, int) => t;
  let dec: (t, int) => t;
  let toString: t => React.element;
};
let leftButtonStyle = ReactDOMRe.Style.make(~borderRadius="4px 0px 0px 4px", ~width="48px", ());
let rightButtonStyle = ReactDOMRe.Style.make(~borderRadius="0px 4px 4px 0px", ~width="48px", ());
let containerStyle = ReactDOMRe.Style.make(~display="flex", ~alignItems="center", ~justifyContent="space-between", ());

module Make = (Param: ParamType) => {
  type state = {count: Param.t};

  let useState = initial => React.useReducer((_, a) => a, initial);
  [@react.component]
  let make = (~value: Param.t) => {
    let (state, dispatch) = useState({count: value});

    <div style=containerStyle>
    <div>
    {React.string(Param.name)} 
      <BlinkingGreeting> {React.string("Count: ")}{Param.toString(state.count)} </BlinkingGreeting>
      </div>

      <div>
        <button style=leftButtonStyle  onClick={_ => dispatch({count: Param.dec(state.count, 1)})}>
          {React.string("-")}
        </button>
        <button style=rightButtonStyle onClick={_ => dispatch({count: Param.inc(state.count, 1)})}>
          {React.string("+")}
        </button>
      </div>
    </div>;
  };
};

module IntValue =
  Make({
    type t = int;
    let name = "Counter Functor V3";
    let inc = (t, int) => t + int;
    let dec = (t, int) => t - int;
    let toString = x => x->string_of_int->React.string;
  });
  
[@react.component]
let make = () => {
  <IntValue value=5 />;
};
