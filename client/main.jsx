import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import Routes from "../imports/ui/routes";
import ReduxToastr from "react-redux-toastr";
import { Provider } from "react-redux";
import store from "../imports/api/redux/store";

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <div>
        <ReduxToastr
          timeOut={6000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          getState={(state) => state.toastr}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        <Routes />
      </div>
    </Provider>,
    document.getElementById("react-target")
  );
});
