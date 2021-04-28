import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
} from "../../actions/inbox-list.actions";

import { BiCheck } from "react-icons/bi";

export class NoteItem extends React.PureComponent {
  render() {      
    return (
      <div className="note-container">
        <div className="note-content">
          <h4 className="note-h4 h4">Title</h4>
          <h5 className="note-h5 h5" style={{marginBottom: '6px'}}>Subject haha tickle me elmo idk what else to write</h5>
          <h5 className="note-h5 h5" style={{opacity: 0.5}}>Date</h5>
        </div>
        <div className="note-options">
          <BiCheck className="note-icon" />
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