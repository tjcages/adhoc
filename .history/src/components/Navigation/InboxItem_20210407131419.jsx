import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
    modifyMessages,
    setReadingStats
} from "../../actions/inbox-list.actions";

import { getMessage } from "../../api"
import { getFormattedDate, getFromName } from '../../api/utils'
import { BiCheck } from "react-icons/bi";

export class InboxItem extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          selected: props.data.selected ? " selected" : ""
        }

        this.parseReadTime = this.parseReadTime.bind(this)
        this.modifyMessage = this.modifyMessage.bind(this)
    }

    componentDidMount() {
        this.parseReadTime()
    }

    componentDidUpdate(prevProps) {
        console.log(JSON.stringify(this.props))
    }

    parseReadTime() {
        setReadingStats(this.props.data.id)
    }
      
    modifyMessage() {
        const id = this.props.data.id
        const label = this.props.data.labelIds.find(el => el === "INBOX") // Might want to modify INBOX later

        this.props.modifyMessages({ ids: [id], addLabelIds: [], removeLabelIds: [label] });
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
                <div className="inbox-image">
                    
                </div>
                <div className="inbox-content">
                    <h4 className="inbox-h4">{fromName}</h4>
                    <h5 className="inbox-h5">{subject}</h5>
                    {/* <h5 className="inbox-h5" style={{opacity: 0.5}}>{formattedDate + ' ??? ' + this.state.readingStats.text}</h5> */}
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
        setReadingStats
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