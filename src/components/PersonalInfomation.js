import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Link from "next/link";
import axios from "axios";

import {
  sendUserInfoToServer,
  changeDisplayName,
  changeProfileImage
} from "../actions/user";
import { facebookAuthProvider } from "../firebase/firebase";

class PersonalInfomation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        profileImage: null,
        displayName: "",
        email: ""
      },
      isEdit: {
        profileImage: false,
        displayName: false,
        email: false
      },
      shouldRender: {
        personalInfomation: true,
        changePassword: false
      },
      uploadedImage: ""
    };
  }

  handleFile = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const fileName = file.name;
    const fileSize = file.size;
    const fileType = file.type;
    console.log("file", file);

    if (fileSize <= 512000) {
      reader.onload = upload => {
        const result = upload.currentTarget.result;
        this.setState({
          user: {
            ...this.state.user,
            profilePic: result
          }
        });
        document.getElementById("profile").src = this.state.user.profilePic;
        // console.log("result -> ",upload, result.length);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File's size limit exceed.");
    }
  };

  uploadProfilePicture = () => {
    document.getElementById("fileLoader").click();
  };

  editDisplayName = () => {
    this.setState({
      isEdit: {
        profilePic: false,
        displayName: !this.state.isEdit.displayName,
        email: false
      }
    });
  };

  onChangeDisplayName = e => {
    this.setState({
      user: {
        ...this.state.user,
        profilePic: this.state.user.profilePic,
        displayName: e.target.value,
        email: this.state.user.email
      }
    });
    // console.log("changeDisplayName -> ",this.state.user);
  };

  changePasswordClicked = () => {
    this.props.onChangePassword();
  };

  handleSubmit = async e => {
    const user = this.props.user;
    const isEdit = this.state.isEdit;
    const displayName =
      this.state.user.displayName === ""
        ? user.displayName
        : this.state.user.displayName;
    const email = document.getElementById("email");
    const myInfo = {
      profilePic: this.state.user.profilePic,
      displayName: displayName,
      email: isEdit.email ? email.value : user.email
    };
    const dispatchChangeNameAction = this.props.dispatchChangeDisplayName;
    const dispatchChangeProfileAction = this.props.dispatchchangeProfileImage;
    try {
      const res = await sendUserInfoToServer(
        Object.assign({}, myInfo, { image_base64: this.state.uploadedImage })
      );
      console.log("Send to server completed", res);
      const isEditState = {
        profilepic: false,
        username: false,
        email: false
      };
      this.setState({
        user: {
          ...this.state.user,
          profilePic: res.data.profileImage
        }
      });
      dispatchChangeNameAction(displayName.value);
      dispatchChangeProfileAction(this.state.user.profilePic);
      this.setState({ isEdit: isEditState });
      document.getElementById(
        "displayName"
      ).value = this.state.user.displayName;
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    // console.log("This state ", this.state);
    const user = this.props.user || [];
    const displayName = user.displayName ? user.displayName : user.email;
    const email = user.email ? user.email : "";
    const displayUrl = user.profileImage
      ? user.profileImage
      : "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/nineti9-pink-min.png";
    const disabledProfilepic = this.state.isEdit.profilepic;
    const disabledDisplayname = this.state.isEdit.displayName;
    const disabledEmail = this.state.isEdit.email;

    return (
      <div className="user-info">
        <div className="user-info-content">
          <div className="user-info-subtitle">ข้อมูลส่วนตัว</div>
          <div className="dis-inline-block vertical-center">
          <div className="col-sm-1"/>
            <div className="col-sm-4" style={{textAlign: 'right'}}>
            <p style={{fontSize: '20px',margin:"0px"}}>อัพโหลดรูปโปรไฟล์</p>
            <img
                      id="profile"
                      src={displayUrl}
                      style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        maxWidth: "100px",
                        maxHeight: "100px"
                      }}
                    />
            </div>
            <div className="col-sm-7">
              <div className="user-info-detail">
                <div className="dis-inline-block ">
                  <div  style={{textAlign: 'left'}}>
                    <input
                      type="file"
                      id="fileLoader"
                      style={{ display: "none" }}
                      onChange={this.handleFile}
                    />
                    <button
                      className="account-button"
                      onClick={this.uploadProfilePicture}
                      style={{fontFamily:"db_heavent_thin"}}
                    >
                      Upload file
                    </button>
                    <br />
                    <div style={{fontSize:"18px"}} id="upload_condition">อัพโหลดภาพที่มีขนาดเล็กกว่า 512k</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-35" />
          </div>
          <div className="dis-inline-block" >
            <div className="col-25 input-form-title" style={{fontSize: "20px"}}>ชื่อผู้ใช้</div>
            <div className="col-40 input-form" style={{fontSize: "20px"}}>
              {!this.state.isEdit.displayName ? (
                <input
                  id="displayName"
                  type="search"
                  className="user-info-input"
                  value={displayName}
                  disabled
                />
              ) : (
                <input
                  id="displayName"
                  type="search"
                  className="user-info-input"
                  value={this.state.displayName}
                  onChange={this.onChangeDisplayName}
                />
              )}
            </div>
            <div className="col-35 input-form">
              <span
                className="user-info-pink"
                onClick={() => this.editDisplayName()}
              >
                แก้ไข
              </span>
            </div>
          </div>
          <div className="dis-inline-block">
            <div className="col-25 input-form-title" style={{fontSize: "20px"}}>อีเมล</div>
            <div className="col-40 input-form" style={{fontSize: "20px"}}>
              {!this.state.isEdit.email ? (
                <input
                  type="search"
                  className="user-info-input"
                  value={email}
                  disabled
                />
              ) : (
                <input id="email" type="search" className="user-info-input" />
              )}
            </div>
            <div className="col-35 input-form" />
          </div>
          <div className="dis-inline-block">
            <div className="col-25 input-form-title" />
            <div className="col-40 input-form">
                { user.fbid === undefined ?
                  <div
                    className="user-info-pink"
                    style={{ textDecorationLine: "none", textAlign: "right" }}
                    onClick={this.changePasswordClicked}
                  >
                    เปลี่ยนรหัสผ่าน
                  </div>: null
                  
                }


            </div>
            <div className="col-35 input-form" />
          </div>
          <div className="dis-inline-block" style={{ padding: "2% 0%" }}>
            <div className="col-50" />
            <div className="col-50">
              <div className="dis-inline-block">
                <div className="col-20">
                  <Link href="/purchaseHistory">
                    <a
                      className="user-info-pink"
                      style={{ textDecorationLine: "none" }}
                    >
                      ยกเลิก
                    </a>
                  </Link>
                </div>
                <div className="col-20">
                  <button
                    type="submit"
                    className="account-button-pink"
                    onClick={() => this.handleSubmit()}
                  >
                    อัพเดท
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchChangeDisplayName: name => dispatch(changeDisplayName(name)),
    dispatchchangeProfileImage: url => dispatch(changeProfileImage(url))
  };
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(undefined, mapDispatchToProps)(PersonalInfomation);
