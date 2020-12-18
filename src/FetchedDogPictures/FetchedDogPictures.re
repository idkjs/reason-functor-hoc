[@bs.val] external fetch: string => Js.Promise.t('a) = "fetch";

type state =
  | LoadingDogs
  | ErrorFetchingDogs
  | LoadedDogs(array(string));

// [@react.component]
module Dogs = {
  let make = () => {
    // let (state, setState) = React.useState(() => LoadingDogs);
    let (state, setState) = Hooks.useState(LoadingDogs);
    let fetchDogs = () => fetch("https://dog.ceo/api/breeds/image/random/3");
    // Notice that instead of `useEffect`, we have `useEffect0`. See
    // reasonml.github.io/reason-react/docs/en/components#hooks for more info

    React.useEffect0(() => {
      let dogs = Hooks.usePromise(fetchDogs);
      switch (dogs) {
      | None => setState(LoadingDogs)
      | Some(response) =>
        let jsonResponse = response->response##json();
        Js.log(jsonResponse);
        setState(LoadedDogs(jsonResponse##message));
      };

      // Returning None, instead of Some(() => ...), means we don't have any
      // cleanup to do before unmounting. That's not 100% true. We should
      // technically cancel the promise. Unofortunately, there's currently no
      // way to cancel a promise. Promises in general should be way less used
      // for React components; but since folks do use them, we provide such an
      // example here. In reality, this fetch should just be a plain callback,
      // with a cancellation API

      // Js.Promise.(
      //   fetch("https://dog.ceo/api/breeds/image/random/3")
      //   |> then_(response => response##json())
      //   |> then_(jsonResponse => {
      //        setState(_previousState => LoadedDogs(jsonResponse##message));
      //        Js.Promise.resolve();
      //      })
      //   |> catch(_err => {
      //        setState(_previousState => ErrorFetchingDogs);
      //        Js.Promise.resolve();
      //      })
      //   |> ignore
      // );

      // Returning None, instead of Some(() => ...), means we don't have any
      // cleanup to do before unmounting. That's not 100% true. We should
      // technically cancel the promise. Unofortunately, there's currently no
      // way to cancel a promise. Promises in general should be way less used
      // for React components; but since folks do use them, we provide such an
      // example here. In reality, this fetch should just be a plain callback,
      // with a cancellation API
      None;
    });

    <div
      style={ReactDOMRe.Style.make(
        ~height="120px",
        ~display="flex",
        ~alignItems="center",
        ~justifyContent="center",
        (),
      )}>
      {switch (state) {
       | ErrorFetchingDogs => React.string("An error occurred!")
       | LoadingDogs => React.string("Loading...")
       | LoadedDogs(dogs) =>
         dogs
         ->Belt.Array.mapWithIndex((i, dog) => {
             let imageStyle =
               ReactDOMRe.Style.make(
                 ~height="120px",
                 ~width="100%",
                 ~marginRight=i === Js.Array.length(dogs) - 1 ? "0px" : "8px",
                 ~borderRadius="8px",
                 ~boxShadow="0px 4px 16px rgb(200, 200, 200)",
                 ~backgroundSize="cover",
                 ~backgroundImage={j|url($dog)|j},
                 ~backgroundPosition="center",
                 (),
               );
             <div key=dog style=imageStyle />;
           })
         ->React.array
       }}
    </div>;
  };
};
module WrappedComponent = {
  include Dogs;
  let make = Dogs.make;
};
