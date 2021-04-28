import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

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
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

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

  selectInboxItem(id, index) {
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

    // Automatically select the first element if url is /inbox
    const id = this.props.history.location.pathname.replace('/inbox/', '');
    const messages = this.props.messagesResult.messages.filter(el => el.id === id);
    if (messages.length === 0) {
      this.props.history.push('/inbox')
    }

    const pathname = this.props.history.location.pathname
    if (pathname === "/inbox/" || pathname === "/inbox") {
      this.selectInboxItem(this.props.messagesResult.messages[0].id)
    }
    var nextId = ""
    if (this.props.messagesResult.messages.length > 1) {
      nextId = this.props.messagesResult.messages[1].id
    }

    // const labels = this.props.labelsResult.labels.map(el => el.name.includes("CATEGORY_") ? el.name.replace("CATEGORY_", "") : null ).filter(el => el != null)

    return (
      this.props.messagesResult.messages.map((el, index) => {
        return (
          <motion.li
            key={el.id}
            layout
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <InboxItem
            data={el}
            nextId={nextId}
            key={el.id}
            onSelectionChange={this.onSelectionChange}
            // onClick={this.getMessage}
            onClick={() => this.selectInboxItem(el.id, index)} 
            modifyMessage={() => this.modifyMessage(el.id, index)}
            />
          </motion.li>
        );
      })

      // labels.map((label) => { 
      //   const messages = this.props.messagesResult.messages.filter(el => el.labelIds.includes(`CATEGORY_${label}`))
      //   if (messages.length > 0) {
      //     return (
      //       <div key={label}>
      //         <h3 
      //           className="navigation-list-header h3"
      //           key={label}
      //         >{ label.toLowerCase().charAt(0).toUpperCase() + label.toLowerCase().slice(1) }
      //         </h3>
      //         {
      //           messages.map((el, index) => {
      //             return (
      //               <motion.li
      //                 key={el.id}
      //                 positionTransition
      //                 initial={{ opacity: 0, y: 50, scale: 0.3 }}
      //                 animate={{ opacity: 1, y: 0, scale: 1 }}
      //                 exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      //               >
      //                 <InboxItem
      //                 data={el}
      //                 nextId={nextId}
      //                 key={el.id}
      //                 onSelectionChange={this.onSelectionChange}
      //                 // onClick={this.getMessage}
      //                 onClick={() => this.selectInboxItem(el.id, index)} 
      //                 modifyMessage={() => this.modifyMessage(el.id, index)}
      //                 />
      //               </motion.li>
      //             );
      //           })
      //         }
      //         <div className="small-spacer" />
      //       </div>
      //     )
      //   } else {
      //     return <div key={label} />
      //   }
      // })
    )
  }
  
  render() {    
    return (
      <div className="navigation-container">
        <div className="navigation-header">
          <div className="navigation-workspace">
            <div className="navigation-workspace-icon">
              <div className="navigation-workspace-icon-outer" />
              <div className="navigation-workspace-icon-inner" />
            </div>
            <h2 className="navigation-workspace-title">
              Workspace
            </h2>
          </div>
          <div className="navigation-options">  
            <BiSearch className="navigation-icon" />
            <BiDotsVerticalRounded className="navigation-icon" />  
            <div className="navigation-add">
              <FiEdit className="navigation-add-icon" />
            </div>        
          </div>
        </div>
        <div className="navigation-content noselect">
          {
            (this.props.messagesResult.messages.length === 0) ? (
                <h4 className="navigation-no-messages">
                  You have no new messages
                </h4>
            ) : (
              <ul style={{listStyleType: 'none', padding: 0}}>
                <AnimatePresence initial={false}>
                  {this.renderMessages()}
                </AnimatePresence>
              </ul>
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