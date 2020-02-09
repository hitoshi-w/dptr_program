import React from 'react';
import { Redirect } from 'react-router-dom';
import { User } from 'App';

interface AuthProps {
  currentUser: User;
}

const Auth: React.SFC<AuthProps> = ({ currentUser, children }) => {
  return currentUser?.uid !== null ? <>{children}</> : <Redirect to={'/'} />;
};

export default Auth;
