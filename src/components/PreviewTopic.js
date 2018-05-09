import React from 'react';
import BoxContent from './BoxContent';

class PreviewTopic extends React.Component {
    constructor(props) {
        super(props);
    }
    onBackClick = () => {
        this.props.onBackToEditClick();
    }
    render() {
        const title = this.props.title || '';
        const contents = this.props.contents || [];
        return (
            <div>
                Preview
                <h2>{title}</h2>
                <div>
                    {contents.map((content, index) => {
                            return <BoxContent
                                key={index}
                                index={index}
                                content={content.raw}
                                type={content.type}
                                previewMode={true}
                                editContent={this.editContent}removeContent={this.removeContent}/>
                    })}
                     </div>
                     <div>
                        <button onClick={this.onBackClick}> กลับไปแก้ไข </button>
                         </div>

                 </div>
        )
    }
}

export default PreviewTopic;
