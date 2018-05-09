import React from 'react';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import YouTube from 'react-youtube';

class BoxContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const type = this.props.type;
        switch (type) {
            case "raw_html":
                const html = this.props.content;
                return <div className="box-content">
                    {ReactHtmlParser(html)}</div>;
            case "image":
                const imgUrl = this.props.content;
                return <div className="box-content">

                    <span>
                        <img src={imgUrl}/></span>
                </div>
            case "video":
                const videoUrl = this.props.content;
                const youtubeID = getYouTubeIDFrom(videoUrl);
                return <div className="box-content">

                    <YouTube className="box-content__video" videoId={youtubeID}/>

                </div>
            case "related_product":
                const products = this.props.content;
                return <div className="box-content">

                    <h2>ไอเทมที่ใช้ในกระทู้</h2>
                    <div>
                        {products.map((product, idx) => {

                            return (
                                <div key={idx}>
                                    <div>{idx + 1}
                                    </div>
                                    <div>{product.name}

                                    </div>
                                </div>
                            )
                        })
}
                    </div>

                </div>

        }
    }
}

const getYouTubeIDFrom = (url) => {
    let ID = '';
    url = url
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    } else {
        ID = url;
    }
    return ID;
}

export default BoxContent;