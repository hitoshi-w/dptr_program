import React from 'react';
import { Redirect } from 'react-router-dom';
import { User } from 'reducers/userReducer';

interface AuthProps {
  currentUser: User;
}

const Auth: React.SFC<AuthProps> = ({ currentUser, children }) => {
  return currentUser !== null ? <>{children}</> : <Redirect to={'/'} />;
};

export default Auth;
