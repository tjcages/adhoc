import React from 'react'
import { getNameEmail } from '../../utils';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import moment from "moment";

export default class InboxItem extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          selected: props.data.selected ? " selected" : ""
        }
    }

    getFromName(from) {
        const nameEmail = getNameEmail(from);
        return nameEmail.name;
      }
    
      getFormattedDate(date, fallbackDateObj) {
        let messageDate = moment(date);
        if (!messageDate.isValid()) {
          messageDate = moment(fallbackDateObj.parserFn(fallbackDateObj.date));
        }
        const nowDate = moment(new Date());
        const isMessageFromToday = messageDate.format("YYYYMMDD") === nowDate.format("YYYYMMDD");
        let formattedDate;
        if (isMessageFromToday) {
          formattedDate = messageDate.format("h:mm A");
        }
        else {
          if (messageDate.year() !== nowDate.year()) {
            formattedDate = messageDate.format("YYYY/MM/DD");
          }
          else {
            formattedDate = messageDate.format("MMM D");
          }
        }
        return formattedDate;
      }
      
    render() {        
        const receivedHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
        const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
        let formattedDate = this.getFormattedDate(date, {date: this.props.data.internalDate, parserFn: parseInt});
        // const unread = this.props.data.labelIds.indexOf("UNREAD") > -1 ? " font-weight-bold" : "";
        // let selected = this.props.data.selected ? " selected" : "";
        const subjectHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "SUBJECT");
        const subject = subjectHeader ? subjectHeader.value : "";
        const fromHeader = this.props.data.payload.headers.find(el => el.name.toUpperCase() === "FROM");
        let fromName = fromHeader ? this.getFromName(fromHeader.value) : "undefined";
    
        return (
            <div className={this.props.selected ? 'inbox-container selected' : 'inbox-container'} onClick={this.props.onClick}>
                <div className="inbox-image">
                    
                </div>
                <div className="inbox-content">
                    <h4 className="inbox-h4">{fromName}</h4>
                    <h5 className="inbox-h5">{subject}</h5>
                    <p className={this.props.selected ? 'inbox-p selected' : 'inbox-p'}>{formattedDate}</p>
                </div>
                <div className={this.props.selected ? 'inbox-options selected' : 'inbox-options'}>
                    <HiOutlineDotsHorizontal className="inbox-icon" />
                </div>
            </div>
        )
    }
}
