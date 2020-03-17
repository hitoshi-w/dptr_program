import React from 'react';
import { Redirect } from 'react-router-dom';
import { User } from 'reducers/userReducer';
import styled from 'styled-components';

interface AuthProps {
  currentUser: User;
}

const Auth: React.SFC<AuthProps> = ({ currentUser, children }) => {
  return currentUser !== null ? <>{children}</> : <Redirect to={'/'} />;
};

export default Auth;
