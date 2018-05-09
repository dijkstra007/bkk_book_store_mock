import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import Link from 'next/link';
import PersonalInfomation from './PersonalInfomation';
import ChangePassword from './ChangePassword';

 class AccountInfomation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: {
            profilePic: '',
            displayName: '',
            email: '',
          },
          isEdit: {
            profilePic: false,
            displayName: false,
            email: false,
          },
          shouldRender: {
            personalInfomation: true,
            changePassword: false
          },
        };
    }
    renderChangePassword = (e) => {
      const shouldRenderState = {
        personalInfomation: false,
        changePassword: true
      };
      this.setState({shouldRender: shouldRenderState});
    };
    renderCancelChangePassword = (e) => {
      const shouldRenderState = {
        personalInfomation: true,
        changePassword: false
      };
      this.setState({shouldRender: shouldRenderState});
    };

    render() {
      const user = this.props.user || [];
      const displayName = user.displayName? user.displayName: user.email;
      const email = user.email? user.email: '';
      const displayUrl = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/nineti9-pink-min.png";
      const disabledProfilepic = this.state.isEdit.profilepic;
      const disabledDisplayname = this.state.isEdit.displayName;
      const disabledEmail = this.state.isEdit.email;

        return (
          <div className="col-sm-9">
            <div className="user-info-title">
              ข้อมูลบัญชี
            </div>
            {this.state.shouldRender.personalInfomation? <PersonalInfomation onChangePassword={() => this.renderChangePassword()} user={this.props.user}/> : null}
            {this.state.shouldRender.changePassword && user.fbid === undefined ? <ChangePassword onCancelChangePassword={() => this.renderCancelChangePassword()} user={this.props.user}/> : null}
          </div>
        )
    }
}
  export default AccountInfomation;
