import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
} from "../../actions/inbox-list.actions";

import { getFormattedDate, getFromName } from '../../api/utils'
import { BiCheck } from "react-icons/bi";

export class InboxItem extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          selected: props.data.selected ? " selected" : ""
        }
    }

    render() {      
      const receivedHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
      const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
      let formattedDate = getFormattedDate(date, {date: this.props.data.internalDate, parserFn: parseInt});
      const unread = this.props.data.labelIds.indexOf("UNREAD") > -1 ? true : false;
      const pathname = this.props.history.location.pathname
      let selected = pathname.includes(this.props.data.id)
      const subjectHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "SUBJECT");
      const subject = subjectHeader ? subjectHeader.value : "";
      const fromHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "FROM");
      let fromName = fromHeader ? getFromName(fromHeader.value) : "undefined";

      console.log(selected)

      return (
        <div className={selected ? 'inbox-container selected' : 'inbox-container'} onClick={this.props.onClick}>
          { unread && <div className="inbox-unread" /> }
          <div className="inbox-content">
            <h4 className="inbox-h4">{fromName}</h4>
            <h5 className="inbox-h5" style={{marginBottom: '6px'}}>{subject}</h5>
            <h5 className="inbox-h5" style={{opacity: 0.5}}>{formattedDate + ' – ' + this.props.data.stats.text}</h5>
          </div>
          <div className={selected ? 'inbox-options selected' : 'inbox-options'}>
            <BiCheck className="inbox-icon" onClick={(ev) => {ev.stopPropagation(); this.props.modifyMessage() }} />
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
  )(InboxItem);