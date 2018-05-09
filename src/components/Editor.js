import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.content === undefined?'':this.props.content
        }
    }
    onDone = () => {
        const content = {
            raw: this.state.text,
            type: 'raw_html'
        }
        this.props.onDone(content, this.props.editAt, this.props.componentKey);
    }
    onCancel = () => {
        this.props.onCancel();
    }
    handleChange = (value) => {
        this.setState({text:value});
    }
    render() {
        console.log(this.state.text);
        return (
            <div>
                <ReactQuill theme="snow" modules={modules} onChange={this.handleChange} value={this.state.text}></ReactQuill>
                <div>
                    <button onClick={this.onDone}>Done</button>
                    <button onClick={this.onCancel}>Cancel</button>
                </div>
            </div>
        )
    }
}

const toolbarOptions = [
    [
        'bold', 'italic', 'underline', 'strike'
    ], // toggled buttons
    [
        'blockquote', 'code-block'
    ],

    [
        {
            'header': 1
        }, {
            'header': 2
        }
    ], // custom button values
    [
        {
            'list': 'ordered'
        }, {
            'list': 'bullet'
        }
    ],
    [
        {
            'script': 'sub'
        }, {
            'script': 'super'
        }
    ], // superscript/subscript
    [
        {
            'indent': '-1'
        }, {
            'indent': '+1'
        }
    ], // outdent/indent
    [
        {
            'direction': 'rtl'
        }
    ], // text direction

    [
        {
            'size': ['small', false, 'large', 'huge']
        }
    ], // custom dropdown
    [
        {
            'header': [
                1,
                2,
                3,
                4,
                5,
                6,
                false
            ]
        }
    ],

    [
        {
            'color': []
        }, {
            'background': []
        }
    ], // dropdown with defaults from theme
    [
        {
            'font': []
        }
    ],
    [
        {
            'align': []
        }
    ],

    ['clean'] // remove formatting button
];

const modules = {
    toolbar: toolbarOptions
}

export default Editor;
