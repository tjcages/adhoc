import React from 'react';
import InboxItem from './InboxItem'

import { getMessageList } from '../../api'

import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

const data = [
  {
    image: '',
    title: '',
    subtitle: '',
    date: 'Just now'
  },
  {
    image: '',
    title: '',
    subtitle: '',
    date: 'Just now'
  },
  {
    image: '',
    title: '',
    subtitle: '',
    date: 'Just now'
  },
  {
    image: '',
    title: '',
    subtitle: '',
    date: 'Just now'
  },
]

export default class Navigation extends React.Component {
  state = {
    selectedIndex: 0
  }

  componentDidMount() {
    // this.getMessages()
  }

  getMessages = ({
    labelIds,
    q = "",
    pageToken
  }) => {
    getMessageList({ labelIds, maxResults: 20, q: q, pageToken })
    .then(response => {
      console.log(JSON.stringify(response))
    })
  }
  
  render() {
    return (
      <div className="navigation-container">
        <div className="navigation-header">
          <div className="navigation-search">
            <BiSearch className="navigation-icon" />
            <h4 className="navigation-subtext">Search</h4>
          </div>
          <div className="navigation-filter">
            <BsFilter className="navigation-icon" />          
          </div>
        </div>
        <div className="navigation-content noselect">
          <button onClick={() => this.getMessages()}>Tap me please!</button>
          {data.map((item, index) => (
            <InboxItem onClick={() => this.setState({selectedIndex: index})} selected={this.state.selectedIndex===index}/>
          ))}
          <div className="spacer" />
        </div>
      </div>
    );
  }
}
