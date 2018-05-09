import React from "react";
import { compose } from 'recompose';

import withAuthentication from "../Session/withAuthentication";
import withAuthorization from "../Session/withAuthorization";

const App = ({ children }) => <div>{children}</div>;

const AppWithAuthentication = compose(withAuthentication, withAuthorization())(
  App
);


export { AppWithAuthentication };