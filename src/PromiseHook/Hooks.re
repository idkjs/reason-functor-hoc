
// https://github.com/jaredly/patterns/blob/master/src/Hooks.re
// (
//   ('state, 'action) => 'state,
//   'state
// ) => ('state, 'action => unit)
let useState = initial => React.useReducer((_, a) => a, initial);

let usePromise = fn => {
  let (value, setValue) = useState(None);
  React.useEffect1(
    () => {
      fn()
      |> Js.Promise.then_(value => {
           setValue(Some(value));
           Js.Promise.resolve();
         })
      |> ignore;
      None;
    },
    [|fn|],
  );
  value;
};

// unit => 'state => (
//   'state,
//   'state => 'state => unit
// )
// [@react.component]
// let make = () => {
//   let (value, setValue) = React.useState(_=>None);
// }