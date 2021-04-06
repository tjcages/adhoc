import React from 'react';
import InboxItem from './InboxItem'

import { getMessageList } from '../../api'

import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export default class Navigation extends React.Component {
  state = {
    selectedIndex: 0,
    messageResponse: {
      messages: []
    }
  }

  componentDidMount() {
    this.getMessages({labelIds: ["INBOX"]})
  }

  getMessages = ({
    labelIds,
    q = "",
    pageToken
  }) => {
    getMessageList({ labelIds, maxResults: 20, q: q, pageToken })
    .then(response => {
      this.setState({
        messageResponse: response
      })
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
          {
            (this.state.messageResponse.messages.length === 0) ? (
              <div className="p-4 text-center">
                There are no messages with this label.
              </div>
            ) : (
              this.state.messageResponse.messages.map((el, index) => (
                  <InboxItem
                    data={el}
                    key={el.id}
                    onSelectionChange={this.onSelectionChange}
                    // onClick={this.getMessage}
                    onClick={() => this.setState({selectedIndex: index})} 
                    selected={this.state.selectedIndex===index}
                  />
              ))
            )
          }

          {/* {data.map((item, index) => (
            <InboxItem onClick={() => this.setState({selectedIndex: index})} selected={this.state.selectedIndex===index}/>
          ))} */}
          <div className="spacer" />
        </div>
      </div>
    );
  }
}
