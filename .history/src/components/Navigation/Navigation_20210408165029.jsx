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

import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0,
    }

    this.getMessages = this.getMessages.bind(this)
    this.renderMessages = this.renderMessages.bind(this)
    this.selectInboxItem = this.selectInboxItem.bind(this)
    this.modifyMessage = this.modifyMessage.bind(this)
  }

  componentDidMount() {
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

  selectInboxItem(id, index) {
    console.log('selected')
    this.props.history.push(`/inbox/${id}`);

    this.props.getEmailMessage(id);
    this.setState({selectedIndex: index})
  }

  modifyMessage(id) {
    this.props.modifyMessages({ ids: [id], addLabelIds: [], removeLabelIds: ["INBOX"] }) // Might want to modify INBOX later

    console.log('nextId: ' + this.props.nextId)

    if (this.props.nextId !== undefined) {
      console.log('it worked!')
      console.log(this.props.history)
      // this.props.history.push(`/inbox/${this.props.nextId}`);
      this.props.getEmailMessage(this.props.nextId);
    } else {
      console.log('whoops')
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

    return this.props.messagesResult.messages.map((el, index) => {
      const pathname = this.props.history.location.pathname
      if (pathname === "/inbox/") {
        this.selectInboxItem(el.id, index)
      }
      var nextId = ""
      if (index < this.props.messagesResult.messages.length - 1) {
        nextId = this.props.messagesResult.messages[index + 1].id
      }

      return (
        <InboxItem
          data={el}
          nextId={nextId}
          key={el.id}
          selected={this.state.selectedIndex===index}
          onSelectionChange={this.onSelectionChange}
          // onClick={this.getMessage}
          onClick={() => this.selectInboxItem(el.id, index)} 
          modifyMessage={() => this.modifyMessage(el.id)}
        />
      );
    });
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