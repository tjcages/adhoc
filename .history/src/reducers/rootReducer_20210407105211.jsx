import { combineReducers } from "redux";
import { signedOutReducer } from "./gapi.reducers";
import { signInStatusResult } from "./gapi.reducers";

import { labelsResult } from "../components/sidebar/sidebar.reducers";
import { messagesResult, emailMessageResult, pageTokens, searchQuery } from ".inbox-list.reducers";

export default combineReducers({
  signedOutReducer,
  signInStatusResult,
  labelsResult,
  messagesResult,
  emailMessageResult,
  pageTokens,
  searchQuery
});
