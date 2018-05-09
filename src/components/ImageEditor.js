import React from 'react';
import Modal from 'react-modal';
import Files from 'react-files'
import {storage} from '../firebase/firebase';
import moment from 'moment';

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

class ImageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadFromMyComputer: true,
            uploadFromOtherURL: false,
            imageURL: '',
            imageFiles: []
        }
    }
    onFilesChange = (files) => {
        const imgFile = files
        this.setState({imageFiles: imgFile})
        this.uploadFileToFirebase(imgFile[0]);
    }
    uploadFileToFirebase = (file) => {
        console.log(file);
        const blobFile = new Blob([file], {type: file.type});
        const now = moment();
        const fileName = file
            .name
            .substring(0, file.name.indexOf(3)) + now.format('x') + '.' + file.extension;
        console.log(fileName);
        const ref = storage
            .ref()
            .child(`images/article_images/${fileName}`)

        ref
            .put(blobFile)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                console.log(snapshot.downloadURL);
                this.setState({imageURL:snapshot.downloadURL})
                this.onImageEditorOK();
            })
            .catch((error) => {
                console.log(error);
            });

    }
    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }
    onChooseMyComputerClick = () => {
        this.setState({uploadFromMyComputer: true, uploadFromOtherURL: false})
    }
    onChooseOtherURLClick = () => {
        this.setState({uploadFromMyComputer: false, uploadFromOtherURL: true})
    }
    onImageURLChange = (e) => {
        this.setState({imageURL: e.target.value});
    }
    onImageEditorOK = () => {
        const imgUrl = this.state.imageURL;
        const content = {
            raw: imgUrl,
            type: 'image'
        }
        if (imgUrl === '') {
            this
                .props
                .onCancel()
        } else {
            this.props.onDone(content, this.props.editAt, this.props.componentKey);
        }
    }
    onImageEditorCancel = () => {
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
                onRequestClose={this.onImageEditorCancel}
                contentLabel="Modal">
                <div>
                    <h1>Insert Image</h1>
                    <button onClick={this.onImageEditorCancel}>
                        X
                    </button>
                </div>
                <div>
                    <button onClick={this.onChooseMyComputerClick}>
                        รูปอยู่ในคอม
                    </button>
                    <button onClick={this.onChooseOtherURLClick}>
                        ฝากรูปไว้เวปอื่น
                    </button>
                </div>
                <div>
                    {this.state.uploadFromMyComputer
                        ? <div>
                                <div className="files">
                                    <Files
                                        className='files-dropzone'
                                        onChange={this.onFilesChange}
                                        onError={this.onFilesError}
                                        accepts={['image/*']}
                                        multiple={false}
                                        maxFileSize={10000000}
                                        minFileSize={0}
                                        clickable>
                                        Drop files here or click to upload
                                    </Files>
                                </div>
                                <div>
                                    {this
                                        .state
                                        .imageFiles
                                        .map((file) => <img className='files-gallery-item' src={file.preview.url} key={file.id}/>)
}
                                </div>
                            </div>
                        : null}
                    {this.state.uploadFromOtherURL
                        ? <div>
                                <h3>URL</h3>
                                <input
                                    value={this.state.imageURL}
                                    onChange={this.onImageURLChange}
                                    placeholder="Enter image url ..."/>
                            </div>
                        : null
}
                </div>
                <div>
                    <button onClick={this.onImageEditorOK}>
                        OK
                    </button>
                    <button onClick={this.onImageEditorCancel}>
                        Cancel
                    </button>
                </div>
            </Modal>
        )
    }

}

export default ImageEditor;
