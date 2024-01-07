import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";

// Import reducers here.

const rootReducer = combineReducers({ toastr: toastrReducer });

export default rootReducer;
