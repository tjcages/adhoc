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
    const userInfo = this.props.googleUser;
    // const email = userInfo.U3;
    // const fullName = userInfo.ig;
    // const picUrl = userInfo.Paa;

    return (
      <div className="layout_container">
        <div className="titlebar" />
        <div className="layout-sidebar" onClick={this.onSignout}>
          <Sidebar />
        </div>
        <div className="layout-navigation">
          {userInfo}
          {/* {email}
          {fullName}
          {picUrl} */}
          <Navigation />
        </div>
        <div className="layout-browser">
          <Switch>
            <Route path="/inbox/:id" children={<Browser />} />
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