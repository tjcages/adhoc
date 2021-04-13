import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Switch, Route, withRouter } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar'
import Navigation from '../Navigation/Navigation'
import Browser from '../Browser/Browser'

import { signOut } from '../../api/authentication';

import { getLabels, selectLabel } from "../../actions/label-list.actions";

import {
  getLabelMessages,
  emptyLabelMessages,
  toggleSelected,
  setPageTokens,
  addInitialPageToken,
  clearPageTokens,
  setSearchQuery,
  getEmailMessage,
  modifyMessages
} from "../../actions/inbox-list.actions";

export class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    }
    
    this.onSignout = this.onSignout.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  onSignout() {
    signOut().then(() => {
      this.props.history.push('login')
      window.location.reload(true);
    })
  }

  onKeyPressed(e) {
    console.log(e.keyCode)
    console.log(this.state.selectedIndex)
    if (e.keyCode === 68) {
      const id = this.props.history.location.pathname.replace('/inbox/', '')
      this.props.modifyMessages({ ids: [id], addLabelIds: [], removeLabelIds: ["INBOX"] }) // Might want to modify INBOX later

      var nextId = undefined
      if (this.state.selectedIndex < this.props.messagesResult.messages.length - 1) {
        nextId = this.props.messagesResult.messages[this.state.selectedIndex + 1].id
      }
  
      if (nextId !== undefined) {
        this.props.history.push(`/inbox/${nextId}`);
        this.props.getEmailMessage(nextId);
      } else {
        // Push back to Inbox after 0.6 sec
        setTimeout(() => {  this.props.history.push(`/inbox/`) }, 600);
      }
    }
  }

  render() {
    return (
      <div className="layout_container">
        <div className="titlebar" />
        <div className="layout-sidebar" onClick={this.onSignout}>
          <Sidebar />
        </div>
        <div className="layout-navigation">
          <Navigation 
            {...this.props}
            getLabelMessages={this.getLabelMessages}
            messagesResult={this.props.messagesResult}
            toggleSelected={this.props.toggleSelected}
            navigateToNextPage={this.navigateToNextPage}
            navigateToPrevPage={this.navigateToPrevPage}
            pageTokens={this.props.pageTokens}
            addInitialPageToken={this.addInitialPageToken}
            parentLabel={this.props.labelsResult.labels.find(el => el.id === this.props.match.path.slice(1) )}
            searchQuery={this.props.searchQuery}
            selectedIndex={this.state.selectedIndex}
          />
        </div>
        <div className="layout-browser">
          <Switch>
            <Route path="/inbox/:id" children={
              <Browser 
              {...this.props}
              messagesResult={this.props.messagesResult}
              />
            } />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  labelsResult: state.labelsResult,
  messagesResult: state.messagesResult,
  pageTokens: state.pageTokens,
  searchQuery: state.searchQuery
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLabels,
      getLabelMessages,
      emptyLabelMessages,
      toggleSelected,
      selectLabel,
      setPageTokens,
      addInitialPageToken,
      clearPageTokens,
      setSearchQuery,
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
)(Layout);