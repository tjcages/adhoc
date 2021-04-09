import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
    modifyMessages,
} from "../../actions/inbox-list.actions";

import { getFormattedDate, getFromName } from '../../api/utils'
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

        this.props.modifyMessages({ ids: [id], addLabelIds: [], removeLabelIds: [label] })

        console.log('nextId: ' + this.props.nextId)

        if (this.props.nextId !== undefined) {
          console.log('it worked!')
          console.log(this.props.history)
          this.props.history.push(`/inbox/${this.props.nextId}`);
          this.props.getEmailMessage(this.props.nextId);
        } else {
          console.log('whoops')
          // Push back to Inbox after 0.6 sec
          setTimeout(() => {  this.props.history.push(`/inbox/`) }, 600);
        }
    }

    render() {      
      const receivedHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
      const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
      let formattedDate = getFormattedDate(date, {date: this.props.data.internalDate, parserFn: parseInt});
      // const unread = this.props.data.labelIds.indexOf("UNREAD") > -1 ? " font-weight-bold" : "";
      // let selected = this.props.data.selected ? " selected" : "";
      const subjectHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "SUBJECT");
      const subject = subjectHeader ? subjectHeader.value : "";
      const fromHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "FROM");
      let fromName = fromHeader ? getFromName(fromHeader.value) : "undefined";

      return (
        <div className={this.props.selected ? 'inbox-container selected' : 'inbox-container'} onClick={this.props.onClick}>
          {/* <div className="inbox-image">
              
          </div> */}
          <div className="inbox-content">
            <h4 className="inbox-h4">{fromName}</h4>
            <h5 className="inbox-h5" style={{marginBottom: '6px'}}>{subject}</h5>
            <h5 className="inbox-h5" style={{opacity: 0.5}}>{formattedDate + ' – ' + this.props.data.stats.text}</h5>
            {/* <p className={this.props.selected ? 'inbox-p selected' : 'inbox-p'}>{formattedDate}</p> */}
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