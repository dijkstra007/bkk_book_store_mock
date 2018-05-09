import React from 'react';
import ToolTip from 'react-portal-tooltip';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
class QuickRegister extends React.Component {
    constructor(props) {
        super(props);
       
    }
  
    render() {
        const showQuickRegister = this.props.showQuickRegister;
        const type = this.props.type;
        const parent = type==="LOGIN"?"#quick_login":"#quick_register";

        return (
            <ToolTip
                active={showQuickRegister}
                position="bottom"
                arrow="center"
                parent={parent}
                tooltipTimeout={0}
                >
                {type==="LOGIN"?<LoginForm onClose={this.props.onClose} />: <RegisterForm onClose={this.props.onClose}/>}
            </ToolTip>
        );
    }
}

export default QuickRegister;