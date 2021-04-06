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
                world
            </div>
        </div>
    )
}
