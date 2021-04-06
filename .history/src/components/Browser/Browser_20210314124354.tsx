import React from 'react'

import { BsPersonFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Browser() {
    return (
        <div className="browser-container">
            <div className="browser-profile">
                <div className="profile-image">
                    <BsPersonFill className="profile-icon" />
                </div>
            </div>
            <div className="browser-content">
                <h4 className="browser-name">
                    Jessica Lee
                </h4>
                <div className="browser-header">
                    <h1 className="browser-title">
                        Time to get inspired
                    </h1>
                    <div className="browser-header-options">
                        <h4 className="browser-date">
                            May 4
                        </h4>
                        <div className="browser-important">
                            <AiFillStar className="important-icon"/>
                        </div>
                        <div className="browser-options">
                            <HiOutlineDotsVertical className="options-icon"/>
                        </div>
                    </div>
                </div>
                <div className="browser-tags">
                        <div className="tag">
                            Inspiration
                        </div>
                        <div className="tag">
                            Design
                        </div>
                    </div>
            </div>
        </div>
    )
}
