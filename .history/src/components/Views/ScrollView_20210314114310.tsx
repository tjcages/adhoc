import React, { Component } from 'react';
import PropTypes from "prop-types";

interface SElementProps {
    name?: string;
    children?: any;
  }
  
  interface SElementState {
    _element?: any;
  }

class ScrollView extends Component {
  static childContextTypes = {
    scroll: PropTypes.object,
  }

  elements = {};

  register = (name, ref) => {
    this.elements[name] = ref;
  }

  unregister = (name) => {
    delete this.elements[name];
  }

  getChildContext() {
    return {
      scroll: {
        register: this.register,
        unregister: this.unregister
      }
    }
  }

  render() {
    return (
      React.Children.only(this.props.children)
    );
  }
}

class ScrollElement extends Component<SElementProps, SElementState> {  
  render() {
    return (
      React.cloneElement(this.props.children)
    );
  }
}

export {
  ScrollElement
}

export default ScrollView;