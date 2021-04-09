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
  setSearchQuery
} from "../../actions/inbox-list.actions";

export class Layout extends React.Component {
  constructor(props) {
    super(props);

    // this.getLabelList = this.getLabelList.bind(this);
    // this.getLabelMessages = this.getLabelMessages.bind(this);
    // this.renderLabelRoutes = this.renderLabelRoutes.bind(this);
    // this.loadLabelMessages = this.loadLabelMessages.bind(this);
    // this.navigateToNextPage = this.navigateToNextPage.bind(this);
    // this.navigateToPrevPage = this.navigateToPrevPage.bind(this);
    // this.addInitialPageToken = this.addInitialPageToken.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  onSignout() {
    signOut().then(() => {
      // that.props.history.replace('inbox');
      window.location.reload(true);
    })
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
          />
        </div>
        <div className="layout-browser">
          <Switch>
            <Route path="/inbox/:id" children={
              <Browser 
              {...this.props}
              getLabelMessages={this.getLabelMessages}
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
      setSearchQuery
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