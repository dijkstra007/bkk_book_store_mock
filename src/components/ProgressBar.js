import React from 'react';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rawPropsPercent = this.props.value;
        const percent = rawPropsPercent.toString()+'%'
        return (
            <div style={{backgroundColor:'#EBEBEB',width:'100%',height:20,borderRadius: 10}}>
                <div style={{backgroundColor:'#FDB532',width:percent,height:'100%',borderRadius: 10}}/>
            </div>
        )
    }
}

export default ProgressBar;