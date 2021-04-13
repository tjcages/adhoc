import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Authenticating from "./components/authenticating/Authenticating";
import 'react-perfect-scrollbar/dist/css/styles.css';

import { signIn, checkSignInStatus } from "./api/authentication";
import { mountScripts } from "./api/scripts";

import {
  SIGNED_OUT,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_IN_PROGRESS
} from "./constants";

export class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signInStatus: SIGNED_OUT,
      googleUser: {}
    }

    this.init = this.init.bind(this);
    this.initClient = this.initClient.bind(this);
    this.onSignout = this.onSignout.bind(this);
    this.onSignInSuccess = this.onSignInSuccess.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    mountScripts().then(this.init);
  }

  init() {
    window.gapi.load("client:auth2", this.initClient);
  }

  initClient() {
    checkSignInStatus()
    .then(this.onSignInSuccess)
    .catch(_ => {
      this.setState({
        signInStatus: AUTH_FAIL
      })
    });
  }

  onSignout() {
    this.props.signOut();
  }

  onSignIn() {
    signIn().then(this.onSignInSuccess);
  }

  onSignInSuccess(googleUser) {
    this.setState({
      signInStatus: AUTH_SUCCESS,
      googleUser
    });
  }

  renderView() {
    const { signInStatus } = this.state;

    if (signInStatus === AUTH_SUCCESS) {
      if (!this.props.location.pathname.includes("/inbox")) {
        this.props.history.push(`/inbox/`);
      }
      return <Layout googleUser={this.state.googleUser} />;
    } else if (signInStatus === AUTH_IN_PROGRESS) {
      return <Authenticating />;
    } else {
      if (this.props.location.pathname !== "/login") {
        this.props.history.push(`/login`);
      }
      return <Login onSignIn={this.onSignIn} />;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.location.pathname === "/" ? (
          <Redirect to="/inbox" />
        ) : (
          this.renderView()
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(AppContainer);
