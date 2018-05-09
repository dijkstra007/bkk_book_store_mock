import React from 'react';
import Router from 'next/router';
import { firebase } from '../../firebase/firebase';

const withAuthorization = () => (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            firebase.auth().onAuthStateChanged(authUser => {
            //    console.log(authUser);
            })
        }
        render() {
                return (
                    <Component { ...this.props } />
                )
        }

    }

    return WithAuthorization;
}

export default withAuthorization;