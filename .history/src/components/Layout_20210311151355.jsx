import React, { Component } from 'react'
import SplitPane from 'react-split-pane';

export default class Layout extends Component {
    render() {
        return (
            <SplitPane split="vertical" minSize={300} defaultSize={400}>
                <div>Dick</div>
                <div>Horse</div>
            </SplitPane>
        )
    }
}
