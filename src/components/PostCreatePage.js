import React from 'react';
import BoxContent from './BoxContent';
import PreviewTopic from './PreviewTopic';
import WriteTopicForm from './WriteTopicForm';

class PostCreatePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            contents: [],
            shouldRender: {
                editor: true,
                preview: false
            }
        }
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
    onPreviewClick = (title, contents) => {
       
        this.toggleComponentByKey('preview', true);
        this.setState({title: title, contents: contents});
    }
    onBackToEditClick = () => {
        this.toggleComponentByKey('editor', true);
    }
    render() {
        return (
            <div>
                {this.state.shouldRender.editor
                    ? <WriteTopicForm onPreviewClick={this.onPreviewClick}/>
                    : null}
                {this.state.shouldRender.preview
                    ? <PreviewTopic
                            title={this.state.title}
                            contents={this.state.contents}
                            onBackToEditClick={this.onBackToEditClick}/>
                    : null}
            </div>
        )
    }

}

export default PostCreatePage;
