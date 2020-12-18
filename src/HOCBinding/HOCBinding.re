[%%raw {|
const withStrong =
  BaseComponent => props =>
    React.createElement("strong", null,
      React.createElement(BaseComponent, props))
|}]

[@bs.val]
external withStrong
  : React.component('a) => React.component('a)
  = "withStrong";

module HelloMessage = {
  [@react.component]
  let make = (~name) =>
    <div> {React.string("Hello " ++ name)} </div>
};

module StrongMessage = {
  /* [@bs.obj] external makeProps: (~name: 'name=?, unit) => {. "name": 'name} = ""; */
  include HelloMessage;
  
  let make = withStrong(HelloMessage.make);
};

[@react.component]
let make = () => {
   <div>
  	<HelloMessage name="Joe" />
    <StrongMessage name="Strongbad!" />
  </div>
};
