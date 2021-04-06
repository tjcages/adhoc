import React, { Component } from 'react'
import SplitPane from 'react-split-pane';

export default class Layout extends Component {
    render() {
        return (
            <SplitPane split="vertical" minSize={50} defaultSize={100}>
                <div>Dick</div>
                <div>Horse</div>
            </SplitPane>
        )
    }
}
