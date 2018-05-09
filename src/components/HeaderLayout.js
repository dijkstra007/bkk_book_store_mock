import React from 'react';

class HeaderLayout extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const title = this.props.title || '';
        return (
            <p className="header-layout-header">{title}</p>
        )
    }
}

export default HeaderLayout;
