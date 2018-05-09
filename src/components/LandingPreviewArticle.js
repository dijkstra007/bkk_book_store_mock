import React from "react";

class LandingPreviewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        topic:
          "แต่งหน้านู้ดๆส้มๆ ดูแพง ฉบับง่ายมาก ด้วยของถูกและดี [Holiday Edition]",
        author: "NKMei",
        createdAt: "1d",
        commentNumber: 11,
        shareNumber: "21.2k"
      }
    };
  }

  render() {
    const title = this.props.title || "untitled";
    const imgUrl = this.props.img || "";
    const {
      author,
      topic,
      createdAt,
      commentNumber,
      shareNumber
    } = this.state.article;
    

    return (
      <div className="landing-preview-article-body">
        <p className="landing-preview-article-title">{title}</p>
        <img src={imgUrl} />
        <p className="landing-preview-article-topic">{topic}</p>
        <div className="landing-preview-article-footer">
          <div className="landing-preview-article-detail-container">
            <p className="landing-preview-article-author">{author}</p>
            <div className="landing-preview-split-author"> | </div>
            <div className="landing-preview-article-mini-container">
              <img className="landing-preview-article-link-icon" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/clock-icon-min.png" />
              <p className="landing-preview-article-link-text">{createdAt}</p>
            </div>
            <div className="landing-preview-article-mini-container">
              <img className="landing-preview-article-link-icon" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/conver-icon-min.png" />
              <p className="landing-preview-article-link-text">{commentNumber}</p>
            </div>
            <div className="landing-preview-article-mini-container">
              <img className="landing-preview-article-link-icon" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/check-icon-min.png" />
              <p className="landing-preview-article-link-text">{shareNumber}</p>
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPreviewArticle;
