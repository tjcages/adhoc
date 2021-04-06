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
                        Time to get inspired by the greatest showman in the entire world this is a weirdly long header
                    </h1>
                    <div className="browser-header-options">
                        <div className="browser-date">
                            <h4 className="date-h4">
                                May 4
                            </h4>
                        </div>
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
                        <p className="tag-title">
                        Inspiration
                        </p>
                    </div>
                    <div className="tag">
                        <p className="tag-title">
                        Design
                        </p>
                    </div>
                </div>
                <div className="browser-message">
                    <h5 className="message-h5">
                    Hey David, 

                    Attached are some product photos I believe will inspire you. I really dig the colors! They are from a project called Amor á Mama and were designed by Asa Onze Studio.

                    Let me know what you think (though I'm pretty sure you will like them) 🔥🔥🔥
                    </h5>
                </div>
            </div>
        </div>
    )
}
