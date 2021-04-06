import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import Navigation from '../Navigation/Navigation'
import Browser from '../Browser/Browser'

import {signOut} from '../../api/authentication';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    console.log('prop here: ' + JSON.stringify(props))

    this.state = {
      id: ''
    }

    // this.getLabelList = this.getLabelList.bind(this);
    // this.getLabelMessages = this.getLabelMessages.bind(this);
    // this.renderLabelRoutes = this.renderLabelRoutes.bind(this);
    // this.loadLabelMessages = this.loadLabelMessages.bind(this);
    // this.navigateToNextPage = this.navigateToNextPage.bind(this);
    // this.navigateToPrevPage = this.navigateToPrevPage.bind(this);
    // this.addInitialPageToken = this.addInitialPageToken.bind(this);
    this.getParams = this.getParams.bind(this)
    this.onSignout = this.onSignout.bind(this);
  }

  componentDidMount() {
    this.getParams()
  }

  getParams() {
    return this.props.history.listen((location) => { 
        console.log('try me: ' + location.pathname)
        const id = location.pathname.replace('/inbox/', '')
        
        this.setState({
          id: id
        })
    }) 
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
            <Route path="/inbox/:id([a-zA-Z0-9]+)" children={<Browser id={this.state.id} />} />
          </Switch>
        </div>
      </div>
    )
  }
}
