import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserEntity } from 'reducers/userReducer';

interface AuthProps {
  currentUser: UserEntity | null;
}

const Auth: React.SFC<AuthProps> = ({ currentUser, children }) => {
  return currentUser !== null ? <>{children}</> : <Redirect to={'/'} />;
};

export default Auth;
