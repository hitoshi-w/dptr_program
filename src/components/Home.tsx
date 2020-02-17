import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from 'components/layouts/Footer';
import { UserEntity } from 'reducers/userReducer';

import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

export interface HomeProps {
  currentUser: UserEntity | null;
  googleLogin: () => void;
  getUser: () => void;
  // isFetching: boolean;
}

const Home: React.SFC<HomeProps> = ({ currentUser, getUser, googleLogin }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return currentUser !== null ? (
    <Redirect to={'/tasks'} />
  ) : (
    <>
      <HomeContainer>
        <h1>T a s k a</h1>
        <Fab variant="extended" onClick={googleLogin}>
          Googleではじめる
        </Fab>
      </HomeContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const FooterContainer = styled.div`
  align-self: center;
`;

export default Home;
