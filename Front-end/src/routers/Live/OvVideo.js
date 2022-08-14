import React, { Component } from 'react';
import '../routers.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from '@fortawesome/free-solid-svg-icons'

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.openFullscreen = this.openFullscreen.bind(this);
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

    openFullscreen() {
        var elem = document.getElementById("myvideo");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    render() {
        return (
            <> <video className="videosize" id="myvideo" autoPlay={true} ref={this.videoRef} />
                <FontAwesomeIcon className='iconsize fullscreenbutton fullscreenbutton_margin' onClick={this.openFullscreen} icon={faExpand} size="1x" />
            </>

        );
    }

}
