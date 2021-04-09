import React from 'react'
import { getFormattedDate, getFromName } from '../../api/utils'
import { getMessage } from '../../api'
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const readingTime = require('reading-time');

export default class InboxItem extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          selected: props.data.selected ? " selected" : "",
          readingStats: {}
        }

        this.parseReadTime = this.parseReadTime.bind(this)
    }

    componentDidMount() {
        this.parseReadTime()
    }

    parseReadTime() {
        getMessage(this.props.data.id)
            .then(response => {
                const stats = readingTime(response.body);
                this.setState({readingStats: stats})
            })
            .catch(error => {
                console.log('error loading message in inbox: ' + error.toString)
            });
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
                    <h4 className="inbox-h4">{fromName}<span className="inbox-name inbox-h5">{'• ' + this.state.readingStats.text}</span></h4>
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
