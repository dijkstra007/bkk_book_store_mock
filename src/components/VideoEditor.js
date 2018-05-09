import React from 'react';
import Modal from 'react-modal';
import {storage} from '../firebase/firebase';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class VideoEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videoURL: ''
        }
    }
  
  
    onVideoURLChange = (e) => {
        this.setState({videoURL: e.target.value});
    }
    onVideoEditorOK = () => {
        const videoURL = this.state.videoURL;
        const content = {
            raw: videoURL,
            type: 'video'
        }
        if (videoURL === '') {
            this
                .props
                .onCancel()
        } else {
            this.props.onDone(content, this.props.editAt, this.props.componentKey);
        }
    }
    onVideoEditorCancel = () => {
        this
            .props
            .onCancel()
    }
    componentWillUnmount() {
        console.log("Component will unmount")
        this
            .props
            .onCancel();
    }

    render() {
        return (
            <Modal
                isOpen={this.props.shouldRender}
                style={customStyles}
                onRequestClose={this.onVideoEditorCancel}
                contentLabel="Modal">
                <div>
                    <h1>Insert YouTube Video</h1>
                    <button onClick={this.onVideoEditorCancel}>
                        X
                    </button>
                </div>
                <div>
                    <button >
                        YouTube
                    </button>
                </div>
                <div>
                   
                   
                          <div>
                                <h3>URL</h3>
                                <input
                                    value={this.state.videoURL}
                                    onChange={this.onVideoURLChange}
                                    placeholder="Enter YouTube url ..."/>
                            </div>
                </div>
                <div>
                    <button onClick={this.onVideoEditorOK}>
                        OK
                    </button>
                    <button onClick={this.onVideoEditorCancel}>
                        Cancel
                    </button>
                </div>
            </Modal>
        )
    }

}

export default VideoEditor;
