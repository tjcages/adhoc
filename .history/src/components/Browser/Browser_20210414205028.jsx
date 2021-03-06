import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import {
    getEmailMessage,
    modifyMessages
} from "../../actions/inbox-list.actions";

import { getFormattedDate, getFromName } from '../../api/utils'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { BsPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { HiOutlineDotsVertical } from "react-icons/hi";


export class Browser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: undefined,
            scrollY: 0
        };

        this.iframeRef = React.createRef();

        this.renderMessage = this.renderMessage.bind(this)
        this.renderSpinner = this.renderSpinner.bind(this)
        this.setScroll = this.setScroll.bind(this)
    }

    componentDidUpdate(prevProps) {
        const { emailMessageResult } = this.props;

        const result = emailMessageResult.result
        if (result !== undefined) {
            const label = emailMessageResult.result.labelIds.find((el) => el === "UNREAD")
            const id = emailMessageResult.result.id
            if (label === "UNREAD") {
                this.props.modifyMessages({ ids: [id], addLabelIds: [], removeLabelIds: ["UNREAD"] })
            }
        }

        if (!emailMessageResult.loading) {
            if (!emailMessageResult.failed) {
                if (this.iframeRef.current) {
                    const { body } = this.iframeRef.current.contentWindow.document;
                    body.style.margin = "0px";
                    // body.style.fontFamily = "CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif";
                    body.style.fontFamily = "Roboto, sans-serif";
                    body.style.fontSize = "1.2em"
                    body.style.fontWeight = "400";
                    body.style.fontSize = "16px";
                    body.innerHTML = this.props.emailMessageResult.body;

                    // this.setState({scrollY: this.iframeRef.current.contentWindow.document.body.scrollHeight})
                    this.iframeRef.current.height = this.iframeRef.current.contentWindow.document.body.scrollHeight
                    // this.iframeRef.current.contentDocument.addEventListener('scroll', (event) => this.setScroll(event), false);
                }
            } else {
                if (!this.state.errorMessage) {
                    this.setState({
                    errorMessage: emailMessageResult.error.result.error.message,
                    modal: true
                    });
                }
            }
        }
    }

    setScroll(event) {
      if (event.path.length > 1) {
        const path = event.path[1]
        if (path !== undefined) {
          this.setState({scrollY: path.scrollY})
          console.log(this.state.scrollY)
        }
      }
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
            fromName += ' ??? ' + message.stats.text
        }

        const tags = message.labelIds

        return (
          <div className="browser-container" >
          {/* <iframe
              ref={this.iframeRef}
              title="Message contents"
              id="message-iframe"
              frameBorder="0"
              scrolling="no"
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