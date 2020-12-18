/*
// This answers the question:
//   What would a module-based interface to react look like?
*/


/* React interface b/c I'm too lazy to do multiple files */
type reactElement;
type reactNode =
  | Text(string)
  | Int(int)
  | Float(float)
  | ReactElement(reactElement)
  | Children( list(reactNode))
  | Empty;
type domConfig;
type domNode;

  [@bs.obj]
  external domProps:
    (
      ~onClick: (unit => unit)=? ,
      ~style: 'a=?,
      ~key: string=?,
      //TODO: dynamic, missing static option: React.ReactNode
      ~ref: (domNode => unit)=?,
      unit
    ) =>
    domConfig;



/* Probably private types? */
type reactComponent;
type reactComponentConfig;
type reactThis;

[@bs.obj] external makeDomConfig : unit => domConfig = "";
[@bs.obj] external makeMoreDomConfig : (~onClick:(unit => unit)=? )=> domConfig = "";

[@bs.val] [@bs.module "react"] external createClass : reactComponentConfig => reactComponent = "createClass"; 

[@bs.val] external createElement : 'thing => 'props => 'contents => reactElement = "React.createElement" ;
[@bs.val]external createEmptyElement : 'thing => 'props => reactElement = "React.createElement" ;
 [@bs.val] [@bs.module "react-dom"]external render : reactElement => domNode => unit = "render";
[@bs.val]external getElementById : string => domNode = "document.getElementById" ;
[@bs.send] external setState : reactThis => 'obj => unit = "setState";

[@bs.obj] external class_config : (
~getInitialState:(unit => 'state)=?,
~componentDidMount:(unit => unit)=?,
~componentWillMount:(unit => unit)=?,
~render:(unit => reactElement),
  unit
) => reactComponentConfig;

type javascriptUnsafe;
[@bs.val] external jj : 'a => javascriptUnsafe = "identity";
[@bs.set] external set_props_children : domConfig => 'children => unit = "children" ;

// let rec js_children = fun children => {
let js_children = 
    fun
    | Empty => ([%bs.raw{|null|}])
    | Children(children) => children|>Array.of_list|>jj
    // | Children(children) => children|>Array.to_list|>Array.map (Array.map(Array.of_list(children)))
    | ReactElement(el)=> jj(el)
    | Float(value) => (value)|>jj
    | Text(value) => (value)|>jj
    | Int(value) => (value)|>jj;


let createDOMElement = (tag, config, children) => {
    // let domProps = domProps(config,js_children(children))
  set_props_children(config,js_children(children));
  createEmptyElement( tag, config);
};

let button = createDOMElement("button");

let noop = () => ();

type jsState;
type jsProps;
[@bs.obj] external makeJsState : (~ml:'a => jsState) =>unit = "" ;
[@bs.obj] external makeJsProps : (~ml:'a => jsProps )=>unit= "" ;
[@bs.send] external setJsState : reactThis => jsState => unit = "setState";
// let setMlState = fun this state => setJsState this (makeJsState state);
// let average a b = (a +. b) /. 2.0;;
let average = (a, b) => (a +. b) /. 2.0;
let setMlState =  (this ,state) => setJsState(this(makeJsState(~ml=state)));
// let setMlState =  (this ,state) => this((makeJsState(state)|>setJsState));

module type ReactComponent = {
  type props;
  type state;
  let getInitialState: props => state;
  let render: props => state => (state => unit) => reactElement;
};

module type FullReactComponent = (Component: ReactComponent) => {
  type props;
  let create: Component.props => reactElement;
};
// module CreateClass = (Component: ReactComponent) => {
//   type props = Component.props;

// let initialState={() => {
//       let props = [%bs.raw{|this.props.ml|}];
//     //   Component.getInitialState(makeJsState(~ml=(props)))
//     makeJsState(~ml=(props))
//     }};
//   let component = createClass(class_config(
//     ~getInitialState=initialState,
//     ~render=(() => {
//       let props= [%bs.raw{|this.props.ml|}];
//       let state = [%bs.raw{|this.state.ml|}];
//       let this = [%bs.raw{|this|}];
//     //   setMlState(this(props),state);
//     let s =setMlState(this,state);
//       Component.render(props,setMlState(this,state))
//     // {setMlState(this,state)}
//     })),
//   );
//   let create = props => {
//     (createEmptyElement(component),(makeJsProps(props)))
//   };
// };

// module CreateClass = (Component: ReactComponent) => {
//   type props = Component.props;
//   let component = createClass(~class_config=
//     getInitialState(() => {
//       let props = [%bs.raw{|this.props.ml|}];
//       makeJsState (Component.getInitialState (props))
//     }));
//     render( () => {
//       let props = [%bs.raw{|this.props.ml|}];
//       let state = [%bs.raw{|this.state.ml|}];
//       let this = [%bs.raw{|this|}];
//       (Component.render (props(state(setMlState(this)))))
//     })
//     ()
//   );
//   let create =  props => {
//     (createEmptyElement(component(makeJsProps(props))))
//   };
// };

// let module Counter = CreateClass {
//   type props = {initialCount: int};
//   type state = {count: int};
//   let getInitialState = (fun props => {
//     {count: props.initialCount}
//   });
//   let render = fun props state setState => {
//     (button
//       (domProps onClick::(fun () => {
//         setState {count: state.count + 1}
//       }) ())
//       (Children [(Text "Moduly "), (Int state.count)]))
//   };
// };

// open Counter;

// /*
// let stateful = fun initialState wrappedCreate => {
//   let module Wrapper = CreateClass {
//     type props = 'a;
//     type state = 'b;
//     let render = fun props state setState => {
//       wrappedCreate props state setState
//     };
//   };
//   Wrapper.create
// };
// */

// type hackyProps = {initialCount: int}; /* need to expose for some reason? */

// let renderExample = fun () => {
//   print_endline "hello reason + reactjs + bucklescript!";
//   let props = {initialCount: 10};
//   render (Counter.create props) (getElementById "container");
// };