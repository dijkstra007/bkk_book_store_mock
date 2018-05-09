import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import moment from "moment";
import ReactHtmlParser from 'react-html-parser';
import ToolTip from 'react-portal-tooltip';

import htmlToDraft from 'html-to-draftjs';
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteComment = async (commentID) => {
    console.log("delete comment", commentID);
    try {
        this.setState({showConfirmDeleteComment: false, showResultDeleteComment: true, msgDeleteComment: true});
        const status = await axios({
            method: "delete",
            url: API.DELETE_COMMENT + `/${commentID}`
          });
          console.log(status);
          if(status.data.success) {
            this.setState({msgDeleteComment: "ลบความคิดเห็นสำเร็จ", successDeleteComment: true});
          } else {
            this.setState({msgDeleteComment: "คุณลบความคิดเห็นไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", successDeleteComment: false});
          }
      } catch (err) {
        console.log("Error when delete comment",err)
        const code = err.response? err.response.status: "";
        // res.writeHead(302,{Location: `/failPage?code=${code}`}).end();
      }
  }
  reportComment = async (comment) => {
    try {
      this.setState({showMenuComment: false, showResultReportComment: true});
      const reporter = {
          uuid: this.props.user.uuid,
          email: this.props.user.email,
          displayName: this.props.user.displayName,
          profileImage: this.props.profileImage
      }
      const author = {
          uuid: this.props.article.author.uuid,
          email: this.props.article.author.email,
          displayName: this.props.article.author.displayName,
          profileImage: this.props.article.author.profileImage
      }
      const article = {
          articleID: this.props.article.articleID,
          title: this.props.article.title,
          category: this.props.article.category,
          coverImage: this.props.article.coverImage,
          author: author,
      }
      console.log(htmlToDraft(comment.content));
      // const status = await axios({
      //     method: "post",
      //     url: API.REPORT_ARTICLE,
      //     data: {
      //         reporter,
      //         article,
      //         comment
      //     }
      //   });
      //  if(status.data.success) {
      //     this.setState({msgReportArticle: "แจ้งลบบทความ " +this.props.article.title +" สำเร็จ ระบบได้ส่ง email ไปที่ contact@nineti9.com เรียบร้อยแล้ว", successReportArticle: true});
      //   } else {
      //   this.setState({msgReportArticle: "แจ้งลบบทความ " +this.props.article.title +" ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", successReportArticle: false});
      // }
       
    } catch (err) {
      console.log("Error when report comment",err)
      const code = err.response? err.response.status: "";
      // res.writeHead(302,{Location: `/failPage?code=${code}`}).end();
    }
  }
  render () {
    const user = this.props.user;
    const displayName = user.displayName ? user.displayName : user.email;
    const email = user.email;
    const displayUrl = user.profileImage
      ? user.profileImage
      : "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/nineti9-pink-min.png";

    return (
      <div className="article-comment">
        <div className="article-comment-sum">11 ความคิดเห็น</div>
        <div className="article-comment-show">
          <div className="article-comment-data">
            <div className="article-comment-title" style={{ border: "none" }}>
              <div
                style={{
                  width: "100%",
                  lineHeight: "100%",
                  border: "none !important"
                }}
                className="article-show-content-user"
              >
                <div style={{ width: "60%", display: "inline-flex" }}>
                  <div>
                    <img
                      src={displayUrl}
                      className="article-user-profileImage"
                      style={{ marginTop: "-7px", border: "2px solid #95989A" }}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <div style={{ fontSize: "24px" }}>{displayName}</div>
                    <div style={{ fontSize: "20px" }}>{email}</div>
                  </div>
                </div>
                <div
                  style={{ width: "40%", textAlign: "right", color: "#95989A" }}
                >
                  <button className="article-data-create-content-btn-white-white">
                    ...
                  </button>
                  <div
                    style={{ fontFamily: "db_heavent_li", fontSize: "18px" }}
                  >
                    เมื่อวันที่ 26/3/2018 เวลา 11.00 น.
                  </div>
                </div>
              </div>
            </div>
            <div className="article-comment-content">
              สวยมากเลยค่ะ ดููแพงจริงๆ
            </div>
            <div style={{ height: "20px", borderTop: "2px dotted #F1EDF4" }} />
          </div>
        </div>

        <div className="article-comment-show">
          <div className="article-comment-data">
            <div className="article-comment-title" style={{ border: "none" }}>
              <div
                style={{
                  width: "100%",
                  lineHeight: "100%",
                  border: "none !important"
                }}
                className="article-show-content-user"
              >
                <div style={{ width: "60%", display: "inline-flex" }}>
                  <div>
                    <img
                      src={displayUrl}
                      className="article-user-profileImage"
                      style={{ marginTop: "-7px", border: "2px solid #95989A" }}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <div style={{ fontSize: "24px" }}>{displayName}</div>
                    <div style={{ fontSize: "20px" }}>{email}</div>
                  </div>
                </div>
                <div
                  style={{ width: "40%", textAlign: "right", color: "#95989A" }}
                >
                  <button className="article-data-create-content-btn-white-white">
                    ...
                  </button>
                  <div
                    style={{ fontFamily: "db_heavent_li", fontSize: "18px" }}
                  >
                    เมื่อวันที่ 26/3/2018 เวลา 11.00 น.
                  </div>
                </div>
              </div>
            </div>
            <div className="article-comment-content">
              สวยมากเลยค่ะ ดููแพงจริงๆ
            </div>
            <div style={{ height: "20px", borderTop: "2px dotted #F1EDF4" }} />
          </div>
        </div>
        <div clasName="article-comment-lazy-load">
            อ่านต่อ...
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps, undefined)(CommentList);
