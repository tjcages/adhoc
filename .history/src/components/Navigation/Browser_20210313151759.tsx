import React, { Component } from 'react'
import { IoIosAdd } from "react-icons/io";

import { IoMdPaper } from "react-icons/io";
import { IoMdPulse } from "react-icons/io";
import { RiMicrosoftLine } from "react-icons/ri";
import { IoIosJournal } from "react-icons/io";

import { IoIosMailUnread } from "react-icons/io";
import { IoIosCalendar } from "react-icons/io";
import { IoIosChatboxes } from "react-icons/io";
import { IoIosRocket } from "react-icons/io";
import { IoIosBulb } from "react-icons/io";

const linkData = [
    {
        routine: "Morning Routine",
        items: [
            {
                link: 'https://mail.superhuman.com/tylerjcagle@gmail.com/inbox/news',
                title: 'Superhuman',
                description: 'Morning News',
                icon: <IoMdPaper className="icon-large" />
            },
            {
                link: 'https://robinhood.com/',
                title: 'Robinhood',
                description: 'Stonks',
                icon: <IoMdPulse className="icon-large" />
            },
            {
                link: 'https://www.nytimes.com/crosswords/game/mini',
                title: 'The New York Times',
                description: 'Daily Mini Crossword',
                icon: <RiMicrosoftLine className="icon-large" />
            },
            {
                link: 'https://www.notion.so/dfc97657fffb4e80bceeddb15e1e7323?v=93b92beb166748249b58ea87539e1880',
                title: 'Notion',
                description: 'Journal',
                icon: <IoIosJournal className="icon-large" />
            },
        ]
    },
    {
        routine: "Early Work",
        items: [
            {
                link: 'https://mail.superhuman.com/tcagle@tocafootball.com',
                title: 'Superhuman',
                description: 'Work Email',
                icon: <IoIosMailUnread className="icon-large" />
            },
            {
                link: 'https://calendar.google.com/calendar/u/0/r/week',
                title: 'Google Calendar',
                description: 'Weekly schedule',
                icon: <IoIosCalendar className="icon-large" />
            },
            {
                link: 'https://chat.google.com/u/0/dm/z9CcqQAAAAE',
                title: 'Google Chat',
                description: 'Chat',
                icon: <IoIosChatboxes className="icon-large" />
            },
            {
                link: 'https://www.notion.so/ccf036c2dbff4173acc9592341f92e7b?v=1f2416dc2f844e7791eaa93eaa67cf05',
                title: 'Notion',
                description: 'Development Roadmap',
                icon: <IoIosRocket className="icon-large" />
            },
            {
                link: 'https://www.notion.so/737a01024b364ec79e12045dc310e288?v=7a08ccc32326462b920dd86beb4fb35d',
                title: 'Notion',
                description: 'Design Roadmap',
                icon: <IoIosBulb className="icon-large" />
            },
        ]
    },
]

export default class Browser extends Component {
    render() {
        return (
            <>
                {linkData.map((routine) => (
                    <div className="navigation">
                        <h3>{routine.routine}</h3>
                        <div className="navigation-content">
                            <div className="navigation-links">
                                {routine.items.map((link) => (
                                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                                        <div className="link">
                                            {link.icon}
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <div className="add-button">
                                <IoIosAdd className="icon-medium" />
                            </div>
                        </div>  
                    </div>
                ))}
            </>
        )
    }
}
