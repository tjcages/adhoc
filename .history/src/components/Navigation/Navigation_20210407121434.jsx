import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Link, withRouter } from 'react-router-dom';
import InboxItem from './InboxItem'

import { 
  getLabelMessages,
  getEmailMessage,
  emptyLabelMessages 
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
  }

  componentDidMount() {
    this.getMessages({labelIds: ["INBOX"]})
  }

  getMessages = ({
    labelIds,
    q = "",
    pageToken
  }) => {
    this.props.emptyLabelMessages()
    this.props.getLabelMessages({ labelIds, maxResults: 20, q: q, pageToken })
  }

  selectInboxItem(index) {
    const currentMessageId = this.props.location.pathname.replace('/inbox/', '')

    console.log('tree: ' + currentMessageId)
    this.props.getEmailMessage(currentMessageId);
    this.setState({selectedIndex: index})
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
      return (
        <Link to={`/inbox/${el.id}`} style={{textDecoration: 'none'}} key={el.id}>
          <InboxItem
            data={el}
            key={el.id}
            onSelectionChange={this.onSelectionChange}
            // onClick={this.getMessage}
            onClick={() => this.selectInboxItem(index)} 
            selected={this.state.selectedIndex===index}
            />
        </Link>
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

          {/* {data.map((item, index) => (
            <InboxItem onClick={() => this.setState({selectedIndex: index})} selected={this.state.selectedIndex===index}/>
          ))} */}
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
      emptyLabelMessages
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