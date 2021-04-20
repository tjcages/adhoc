import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

import { setReplyState } from '../../actions/inbox-list.actions'

import { BiCheck } from 'react-icons/bi'
import { BiLabel } from 'react-icons/bi'
import { BiStar } from 'react-icons/bi'
import { BsPersonFill } from 'react-icons/bs'

const icons = [
  {
    icon: <BiLabel className="reply-icon green" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiStar className="reply-icon yellow" />,
    tooltip: 'Doesnt do anything yet :('
  },
  {
    icon: <BiCheck className="reply-icon blue" />,
    tooltip: 'Doesnt do anything yet :('
  },
]

function ReplyBar(props) {
  console.log('state: ' + props.replyState)

  return(
    <div className="reply-bar">
      <div className="reply-header">
        <div className="browser-profile">
          <div className="profile-image">
            <BsPersonFill className="profile-icon" />
          </div>
        </div>

        <div className="reply-body">
          <h5 className="reply-p h4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </h5>
        </div>
      </div>

      <div className="reply-actions">
        <div className="reply-options">
          {
            icons.map((icon) => 
              <div className="reply-done">
                { icon.icon }
              </div>
            )
          }
        </div>
        <div className="reply-button">
          <h4 className="reply-button-text h4">Reply</h4>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  replyState: state.replyState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setReplyState
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ReplyBar);