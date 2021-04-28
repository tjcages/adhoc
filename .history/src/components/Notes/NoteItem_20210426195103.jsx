import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
} from "../../actions/inbox-list.actions";

export class NoteItem extends React.PureComponent {
  render() {      
    return (
      <div className="note-container">
        <div className="note-content">
          <div className="note-items">
            <h4 className="note-h4 item-selected h4">
              ✅ Task
            </h4>
            <h4 className="note-h4 h4">
              🗒 Note
            </h4>
            <h4 className="note-h4 h4">
              ⏱ Reminder
            </h4>
          </div>

          <h3 className="note-h3 h2">Title</h3>
          <h4 className="note-h4 h4">Subject haha tickle me elmo idk what else to write about at this moment</h4>
          <h4 className="note-h4 h4">Add details</h4>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    emailMessageResult: state.emailMessageResult
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getEmailMessage,
      },
      dispatch
    );
  
  export default compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(NoteItem);