import React from 'react';
import { Redirect } from 'react-router-dom';
import Footer from 'components/layouts/Footer';
import { User } from 'reducers/userReducer';

import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

export interface HomeProps {
  currentUser: User;
  googleLogin: () => void;
  isFetching: boolean;
}

const Home: React.SFC<HomeProps> = ({
  currentUser,
  googleLogin,
  isFetching,
}) => {
  if (isFetching === true) {
    return <LinearProgress />;
  } else if (currentUser && isFetching === false) {
    return <Redirect to={'/tasks'} />;
  } else {
    return (
      <>
        <HomeContainer>
          <h1>Taska</h1>
          <Fab variant="extended" onClick={googleLogin}>
            Googleではじめる
          </Fab>
        </HomeContainer>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    );
  }
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
