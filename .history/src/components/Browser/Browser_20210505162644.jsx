import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import DOMPurify from 'dompurify'

import {
    getEmailMessage,
    modifyMessages
} from "../../actions/inbox-list.actions";

import { getFormattedDate, getFromName } from '../../api/utils'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { BsPersonFill } from 'react-icons/bs'

import ReplyBar from './ReplyBar'

export class Browser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: undefined
        };

        this.iframeRef = React.createRef();

        this.renderMessage = this.renderMessage.bind(this)
        this.renderSpinner = this.renderSpinner.bind(this)
    }

    renderMessage(message) {
        const receivedHeader = message.payload.headers.find(el => el.name.toUpperCase() === "X-RECEIVED");
        const date = receivedHeader ? receivedHeader.value.split(";")[1].trim() : "";
        let formattedDate =getFormattedDate(date, {date: message.internalDate, parserFn: parseInt});
        // const unread = message.labelIds.indexOf("UNREAD") > -1 ? " font-weight-bold" : "";
        // let selected = message.selected ? " selected" : "";
        const subjectHeader = message.payload.headers.find(el => el.name.toUpperCase() === "SUBJECT");
        const subject = subjectHeader ? subjectHeader.value : "";
        const fromHeader = message.payload.headers.find(el => el.name.toUpperCase() === "FROM");
        let fromName = fromHeader ? getFromName(fromHeader.value) : "undefined";
        if (message.stats !== undefined) {
            fromName += ' — ' + formattedDate
        }

        const tags = message.labelIds

        return (
            <div className="browser-container">
              <div className="browser-content">
                <div className="browser-header">
                  {/* <div className="profile-image">
                    <BsPersonFill className="profile-icon" />
                  </div> */}

                  <div className="browser-titles">
                    <h4 className="browser-name h4">
                      { fromName }
                    </h4>
                    <h2 className="browser-title h2">
                      { subject }
                    </h2>
                  </div>
                </div>  
                <div className="tags-container">
                  <div className="browser-tags">
                    {
                      tags.map(tag => (
                        <div className={tag==="INBOX" ? "tag blue" : "tag"} key={tag}>
                          <h5 className={tag==="INBOX" ? "tag-title blue h5" : "tag-title h5"}>
                            {tag.toLowerCase().replace('category_','')}
                          </h5>
                        </div>
                      ))
                    }
                  </div>

                  <h5 className="browser-name h5">
                    { message.stats.text }
                  </h5>
                </div>
                <div className="message-iframe"
                  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.emailMessageResult.body, { ADD_ATTR: ['target', 'style'] })}}
                  ></div>
                  <base target="_blank"/>
                </div>
                {/* <ReplyBar 
                  {...this.props} 
                  messagesResult={this.props.messagesResult}
                /> */}
            </div>
        )
    }

    renderSpinner() {
        return (
          <div className="browser-container d-flex justify-content-center align-items-center">
            <FontAwesomeIcon className="browser-spinner" icon={faSpinner} spin size="5x"/>
          </div>
        );
      }

    render() {       
        const currentMessageId = this.props.match.params.id
        const message = this.props.messagesResult.messages.find(el => el.id === currentMessageId)

        if (message === undefined || this.props.messagesResult.messages.length === 0 || this.props.emailMessageResult.loading) {
            return this.renderSpinner();
        } else if (this.props.emailMessageResult === undefined) {
            return (
                <div className="p-4 text-center">
                    Cannot load message :(
                </div>
            );
        }
        
        return this.renderMessage(message)
    }
}

const mapStateToProps = state => ({
    messagesResult: state.messagesResult,
    emailMessageResult: state.emailMessageResult
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getEmailMessage,
        modifyMessages
      },
      dispatch
    );
  
  export default compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Browser);