import React from 'react'
import { BsPersonFill } from 'react-icons/bs'

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
                <h1 className="browser-title">
                    Time to get inspired
                </h1>
            </div>
        </div>
    )
}
