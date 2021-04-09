import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from 'react-router-dom';
import InboxItem from './InboxItem'

import { 
  getLabelMessages,
  getEmailMessage,
  emptyLabelMessages,
  modifyMessages
} from '../../actions/inbox-list.actions'
import { 
  getLabels,
} from '../../actions/label-list.actions'


import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.getMessages = this.getMessages.bind(this)
    this.renderMessages = this.renderMessages.bind(this)
    this.selectInboxItem = this.selectInboxItem.bind(this)
    this.modifyMessage = this.modifyMessage.bind(this)
  }

  componentDidMount() {
    this.props.getLabels()
    this.getMessages({labelIds: ["INBOX"]})
    const currentMessageId = this.props.location.pathname.replace('/inbox/', '')
    this.props.getEmailMessage(currentMessageId);
  }

  getMessages = ({
    labelIds,
    q = "",
    pageToken
  }) => {
    this.props.emptyLabelMessages()
    this.props.getLabelMessages({ labelIds, maxResults: 20, q: q, pageToken })
  }

  selectInboxItem(id) {
    this.props.history.push(`/inbox/${id}`);

    this.props.getEmailMessage(id);
  }

  modifyMessage(id, index) {
    this.props.modifyMessages({ ids: [id], addLabelIds: [], removeLabelIds: ["INBOX"] }) // Might want to modify INBOX later

    var nextId = undefined
    if (index < this.props.messagesResult.messages.length - 1) {
      nextId = this.props.messagesResult.messages[index + 1].id
    }

    if (nextId !== undefined) {
      this.props.history.push(`/inbox/${nextId}`);
      this.props.getEmailMessage(nextId);
    } else {
      // Push back to Inbox after 0.6 sec
      setTimeout(() => {  this.props.history.push(`/inbox/`) }, 600);
    }
  }

  renderMessages() {
    if (this.props.messagesResult.loading) {
      return this.renderSpinner();
    } else if (this.props.messagesResult.messages.length === 0) {
      return (
        <div className="p-4 text-center">
          There are no messages with this label.
        </div>
      );
    }

    const pathname = this.props.history.location.pathname
    if (pathname === "/inbox/" || pathname === "/inbox") {
      this.selectInboxItem(this.props.messagesResult.messages[0].id)
    }
    var nextId = ""
    if (this.props.messagesResult.messages.length > 1) {
      nextId = this.props.messagesResult.messages[1].id
    }

    const labels = this.props.labelsResult.labels.map(el => el.name.includes("CATEGORY_") ? el.name.replace("CATEGORY_", "") : null ).filter(el => el != null)
    var addedItems = []

    console.log(this.props.messagesResult.messages.filter(el => el.labelIds.includes("INBOX")))
    console.log(this.props.messagesResult.messages.filter(el => el.labelIds.includes("CATEGORY_UPDATES")))

    return (
      labels.map((label) => { 
        const messages = this.props.messagesResult.messages.filter(el => el.labelIds.includes(`CATEGORY_${label}`))
        if (messages.length > 0) {
          return (
            <div>
              <h3>{ label.toLowerCase().charAt(0).toUpperCase() + label.toLowerCase().slice(1) }</h3>
              {
                messages.map((el, index) => {
                  return (
                    <InboxItem
                      data={el}
                      nextId={nextId}
                      key={el.id}
                      onSelectionChange={this.onSelectionChange}
                      // onClick={this.getMessage}
                      onClick={() => this.selectInboxItem(el.id, index)} 
                      modifyMessage={() => this.modifyMessage(el.id, index)}
                    />
                  );
                })
              }
            </div>
          )
        }
      })
    )
  }
  
  render() {    
    return (
      <div className="navigation-container">
        <div className="navigation-header">
          <div className="navigation-search">
            <BiSearch className="navigation-icon" />
            <h4 className="navigation-subtext">Search</h4>
          </div>
          <div className="navigation-filter">
            <BsFilter className="navigation-icon" />          
          </div>
        </div>
        <div className="navigation-content noselect">
          {
            (this.props.messagesResult.messages.length === 0) ? (
              <div className="p-4 text-center">
                You have no new messages
              </div>
            ) : (
              this.renderMessages()
            )
          }
          <div className="spacer" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  labelsResult: state.labelsResult,
  messagesResult: state.messagesResult,
  emailMessageResult: state.emailMessageResult,
  pageTokens: state.pageTokens,
  searchQuery: state.searchQuery
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLabels,
      getLabelMessages,
      getEmailMessage,
      emptyLabelMessages,
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
)(Navigation);