import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import Link from 'next/link';
import { firebase } from '../firebase/firebase';

 class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          password: {
            oldPassword: '',
            newPassword: ''
          },
          shouldRender: {
            personalInfomation: false,
            changePassword: true
          }
        };
    }

    typeOldPassword = (e) => {
      const oldPass = e.target.value;
      const passwordState = {
        ...this.state.password,
        oldPassword: oldPass
      }
      this.setState({password: passwordState});
    };
    typeNewPassword = (e) => {
      const newPass = e.target.value;
      const passwordState = {
        ...this.state.password,
        newPassword: newPass
      }
      this.setState({password: passwordState});
    };

    cancelChangePassword = () => {
      console.log("cancelChangePassword");
      this.props.onCancelChangePassword();
      console.log("new state -> ", this.state);
    };

    handleSubmit = () => {
        const email = firebase.auth().currentUser.email;
        const oldPass = this.state.password.oldPassword;
        const newPass = this.state.password.newPassword;

        firebase.auth().signInWithEmailAndPassword(email, oldPass)
        .then(res => {
          document.getElementById("old").value = "";
          document.getElementById("new").value = "";
          console.log("signInWithEmailAndPassword COMPLETE", res);
          const user = firebase.auth().currentUser;
          user.updatePassword(newPass)
          .then(res => {
            document.getElementById("text").style.color = "#0E9020";
            document.getElementById("text").innerHTML = "Change Password Completed.";
            console.log("updatePassword COMPLETE", res);
          })
          .catch(err => {
            console.log("updatePassword ERROR ", err);
            if(err.code = "auth/weak-password") {
              document.getElementById("text").innerHTML = "New password should be at least 6 characters.";
            }
          });
        })
        .catch(err => {
          document.getElementById("old").value = "";
          document.getElementById("new").value = "";
          console.log("signInWithEmailAndPassword ERROR", err);
          if(err.code = "auth/wrong-password") {
            document.getElementById("text").innerHTML = "Old password is invalid.";
          }
        });
    };

    render() {
      const {
        oldPassword,
        newPassword
      } = this.state.password;
        return (
            <div className="user-info">
                <div className="user-info-content">
                  <div className="user-info-subtitle" >เปลี่ยนรหัสผ่าน</div>

                  <div className="dis-inline-block" style={{fontSize: "20px"}}>
                    <div className="col-25 input-form-title">
                    รหัสผ่านเดิม
                    </div>
                    <div className="col-60 input-form" style={{fontSize: "20px"}}>
                      <input id="old" type="password" placeholder="กรอกรหัสผ่านเดิม"  value={oldPassword} onChange={this.typeOldPassword} className="user-info-input" title="กรุณารหัสผ่านเดิม" required />
                    </div>
                  </div>
                  <div className="dis-inline-block" style={{fontSize: "20px"}}>
                    <div className="col-25 input-form-title">
                    รหัสผ่านใหม่
                    </div>
                    <div className="col-60 input-form" style={{fontSize: "20px"}}>
                    <input id="new" type="password" placeholder="กรอกรหัสผ่านใหม่"  value={newPassword} onChange={this.typeNewPassword} className="user-info-input" title="กรุณารหัสผ่านใหม่" required />
                    </div>
                  </div>
                  <div className="dis-inline-block">
                    <div className="col-25 input-form-title"></div>
                    <div id="text" className="col-60 input-form" style={{color: "#ff0000"}}></div>
                  </div>
                  <div className="dis-inline-block" style={{padding: '2% 0%'}}>
                    <div className="col-25"></div>
                    <div className="col-75">
                      <div className="dis-inline-block">
                        <div className="col-30">
                          
                            <a className="user-info-pink" style={{textDecorationLine: "none"}} onClick={() => this.cancelChangePassword()}>ยกเลิก</a>
                         
                        </div>
                        <div className="col-10"></div>
                        <div className="col-30">
                            <button type="submit" className="account-button-pink" onClick={() => this.handleSubmit()}>เปลี่ยนรหัสผ่าน</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
            </div>
          
        )
    }
}
  export default ChangePassword;
