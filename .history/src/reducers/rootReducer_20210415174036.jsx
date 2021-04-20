import { combineReducers } from "redux";
import { signedOutReducer } from "./gapi.reducers";
import { signInStatusResult } from "./gapi.reducers";

import { labelsResult } from "./label-list.reducers";
import { messagesResult, emailMessageResult, pageTokens, searchQuery, replyState } from "./inbox-list.reducers";

export default combineReducers({
  signedOutReducer,
  signInStatusResult,
  labelsResult,
  messagesResult,
  emailMessageResult,
  pageTokens,
  searchQuery,
  replyState
});
