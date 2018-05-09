import React from 'react';
import {Link} from 'react-router-dom';

class BoardPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Board Page
                <Link className="button button--create-post" to="/post_create">
                    ตั้งกระทู้ใหม่
                </Link>
                Hello

            </div>
        )
    }
}

export default BoardPage;
