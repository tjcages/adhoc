import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import Navigation from '../Navigation/Navigation'
import Browser from '../Browser/Browser'

import {signOut} from '../../api/authentication';

export default class Layout extends React.Component {
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
          <Browser />
        </div>
      </div>
    )
  }
}
