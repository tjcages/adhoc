import React, { Component } from 'react'
import SplitPane from 'react-split-pane';

export default class Layout extends Component {
    render() {
        return (
            <SplitPane 
            style={{marginTop: '64px'}}
            split="vertical"
            minSize={2000}
            defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
            onChange={(size) => localStorage.setItem('splitPos', size)}
            >
                <div style={{backgroundColor: 'red'}}>Dick</div>
                <div>Horse</div>
            </SplitPane>
        )
    }
}
