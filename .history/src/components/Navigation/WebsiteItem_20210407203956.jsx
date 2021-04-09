import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
    modifyMessages,
} from "../../actions/inbox-list.actions";

import { BiCheck } from "react-icons/bi";

export class InboxItem extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          selected: props.data.selected ? " selected" : ""
        }

        this.modifyMessage = this.modifyMessage.bind(this)
    }
      
    modifyMessage() {
        const id = this.props.data.id
        const label = this.props.data.labelIds.find(el => el === "INBOX") // Might want to modify INBOX later

        this.props.modifyMessages({ ids: [id], addLabelIds: [], removeLabelIds: [label] });
    }

    render() {      
      return (
        <div className={this.props.selected ? 'inbox-container selected' : 'inbox-container'} onClick={this.props.onClick}>
          <div className="inbox-image">
              
          </div>
          <div className="inbox-content">
            <h4 className="inbox-h4">{"Robinhood"}</h4>
            <h5 className="inbox-h5">Portfolio</h5>
          </div>
          <div className={this.props.selected ? 'inbox-options selected' : 'inbox-options'}>
            <BiCheck className="inbox-icon" onClick={this.modifyMessage} />
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
        modifyMessages,
      },
      dispatch
    );
  
  export default compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(InboxItem);