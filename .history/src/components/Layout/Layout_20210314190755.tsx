import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import Navigation from '../Navigation/Navigation'
import Browser from '../Browser/Browser'

import {signOut} from '../../api/authentication';

export default class Layout extends Component {
  constructor(props: {}) {
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
    const that = this;
    signOut().then((_: any) => {
      that.props.history.replace('inbox');
      window.location.reload(true);
    })
  }

  render() {
    return (
      <div className="layout_container">
        <div className="titlebar" />
        <div className="layout-sidebar">
          <Sidebar />
        </div>
        <div className="layout-navigation">
          <Header googleUser={this.props.googleUser} 
            onSignout={this.onSignout} 
            setSearchQuery={this.props.setSearchQuery}
            getLabelMessages={this.getLabelMessages} 
            searchQuery={this.props.searchQuery}
          />
          <Navigation />
        </div>
        <div className="layout-browser">
          <Browser />
        </div>
      </div>
    )
  }
}
