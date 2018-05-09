import React from 'react';
import BoxContent from './BoxContent';
import Editor from './Editor';
import ImageEditor from './ImageEditor';
import RelatedProductEditor from './RelatedProductEditor';
import VideoEditor from './VideoEditor';

class WriteTopicForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            shouldRender: {
                editor: false,
                imageEditor: false,
                videoEditor: false,
                productEditor: false
            },
            editing: false,
            editingAt: -1,
            contents: []
        }
    }
    restoreEditingState = () => {
        this.setState({editing: false, editingAt: -1})
    }
    removeContent = (index) => {
        const newContents = this
            .state
            .contents
            .filter((content, idx) => {
                return idx !== index;
            })
        this.setState({contents: newContents});
    }
    editContent = (index) => {
        this.setState({editing: true, editingAt: index})
    }
    onTitleChange = (e) => {
        this.setState({title: e.target.value});
    }
    onPreviewClick = () => {
        console.log("Hello");
        this
            .props
            .onPreviewClick(this.state.title, this.state.contents);
    }

    toggleComponentByKey = (componentKey, nextComponentState) => {
        let componentState = {
            ...this.state.shouldRender
        }
        for (let key in componentState) {
            componentState[key] = false;
        }
        componentState[componentKey] = nextComponentState;
        this.setState({shouldRender: componentState});
    }
    render() {
        return (
            <div className="article-creator">
                <p>เขียนกระทู้</p>
                <input
                    type="text"
                    value={this.state.title}
                    onChange={this.onTitleChange}
                    placeholder="หัวข้อกระทู้"/>
                <div>
                    <div>
                        เลือกเขียนหัวข้อกระทู้
                    </div>
                    <button>
                        clear
                    </button>
                </div>
                <div
                    style={{
                    background: '#000000',
                    width: 1000,
                    height: 1000
                }}>
                    {this
                        .state
                        .contents
                        .map((content, index) => {
                            if (index !== this.state.editingAt) 
                                return <div key={index}>
                                    <div>
                                        <button onClick={ () => this.editContent(index)}>Edit</button>
                                        <button onClick={ () => this.removeContent(index)}>Remove</button>
                                    </div>
                                    <BoxContent
                                        key={index}
                                        index={index}
                                        content={content.raw}
                                        type={content.type}
                                        />
                                </div>
                            else {
                                switch (content.type) {
                                    case 'raw_html':
                                        return <Editor
                                            key={index}
                                            content={content.raw}
                                            onDone={this.onEditExistContentDone}
                                            onCancel={this.onEditExistContentCancel}
                                            editAt={this.state.editingAt}
                                            componenyKey="editor"/>
                                    case 'image':
                                        return <ImageEditor
                                            shouldRender={true}
                                            key={index}
                                            onDone={this.onEditExistContentDone}
                                            onCancel={this.onEditExistContentCancel}
                                            editAt={this.state.editingAt}
                                            componenyKey="imageEditor"/>
                                    case 'video':
                                        return <VideoEditor
                                            shouldRender={true}
                                            key={index}
                                            onDone={this.onEditExistContentDone}
                                            onCancel={this.onEditExistContentCancel}
                                            editAt={this.state.editingAt}
                                            componenyKey="videoEditor"/>
                                    case 'related_product':
                                        return <RelatedProductEditor
                                            key={index}
                                            content={content.raw}
                                            onDone={this.onEditExistContentDone}
                                            onCancel={this.onEditExistContentCancel}
                                            editAt={this.state.editingAt}
                                            componenyKey="productEditor"/>

                                }
                            }
                        })
}
                    {this.state.shouldRender.editor
                        ? <Editor
                                onDone={this.onEditorDone}
                                onCancel={() => {
                                this.onEditorCancel('editor')
                            }}
                                componenyKey="editor"/>
                        : null}
                    {this.state.shouldRender.imageEditor
                        ? <ImageEditor
                                shouldRender={this.state.shouldRender.imageEditor}
                                onDone={this.onEditorDone}
                                onCancel={() => {
                                this.onEditorCancel('imageEditor')
                            }}
                                componenyKey="imageEditor"/>
                        : null}
                    {this.state.shouldRender.videoEditor
                        ? <VideoEditor
                                shouldRender={this.state.shouldRender.videoEditor}
                                onDone={this.onEditorDone}
                                onCancel={() => {
                                this.onEditorCancel('videoEditor')
                            }}
                                componenyKey="videoEditor"/>
                        : null}
                    {this.state.shouldRender.productEditor
                        ? <RelatedProductEditor
                                onDone={this.onEditorDone}
                                onCancel={() => {
                                this.onEditorCancel('productEditor')
                            }}
                                componenyKey="productEditor"/>

                        : null}

                    <button
                        disabled={this.state.editing}
                        onClick={() => {
                        this.onInsertContentClick('editor')
                    }}>
                        กล่องข้อความ
                    </button>
                    <button
                        disabled={this.state.editing}
                        onClick={() => {
                        this.onInsertContentClick('imageEditor')
                    }}>
                        แทรกรูปภาพ
                    </button>
                    <button
                        disabled={this.state.editing}
                        onClick={() => {
                        this.onInsertContentClick('videoEditor')
                    }}>
                        แทรกคลิปวิดีโอ
                    </button>
                    <button
                        disabled={this.state.editing}
                        onClick={() => {
                        this.onInsertContentClick('productEditor')
                    }}>
                        Related Items
                    </button>
                </div>
                <div>
                    <button onClick={this.onPreviewClick}>
                        ดูตัวอย่าง
                    </button>
                    <button>
                        ตั้งกระทู้
                    </button>
                </div>
            </div>
        )
    }

    // Editor Controller
    onInsertContentClick = (componentKey) => {

        this.toggleComponentByKey(componentKey, true)
        this.setState({editing: true})
    }
    onEditorDone = (htmlContent, index, componentKey) => {
        console.log("Done", htmlContent);
        const contents = [
            ...this.state.contents,
            htmlContent
        ];
        this.toggleComponentByKey(componentKey, false);
        this.setState({editing: false, contents: contents});

    }
    onEditExistContentDone = (editedContent, index) => {
        const contents = this
            .state
            .contents
            .map((content, idx) => {
                if (idx === index) {
                    return editedContent;
                } else {
                    return content;
                }
            })
        this.restoreEditingState();
        this.setState({contents: contents});
    }
    onEditExistContentCancel = () => {
        this.restoreEditingState();
    }
    onEditorCancel = (componentKey) => {
        console.log("Cancel");
        this.restoreEditingState();
        this.toggleComponentByKey(componentKey, false);

    }

}

export default WriteTopicForm;
