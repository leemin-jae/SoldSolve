import React, { Component } from 'react';
import '../routers.css'

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return <video class="videosize" autoPlay={true} ref={this.videoRef} />;
    }

}
