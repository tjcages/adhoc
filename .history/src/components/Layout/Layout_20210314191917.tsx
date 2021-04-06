import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import Navigation from '../Navigation/Navigation'
import Browser from '../Browser/Browser'

import {signOut} from '../../api/authentication';

interface LayoutProps extends RouteComponentProps {
  googleUser: any;
}

interface LayoutState {

}

export default class Layout extends Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
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
      // that.props.history.replace('inbox');
      window.location.reload(true);
    })
  }

  render() {
    const userInfo = this.props.googleUser;
    const email = userInfo.U3;
    const fullName = userInfo.ig;
    const picUrl = userInfo.Paa;

    return (
      <div className="layout_container">
        <div className="titlebar" />
        <div className="layout-sidebar">
          <Sidebar />
        </div>
        <div className="layout-navigation">
          {email}
          {fullName}
          {picUrl}
          <Navigation />
        </div>
        <div className="layout-browser">
          <Browser />
        </div>
      </div>
    )
  }
}
