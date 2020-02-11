import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserEntity } from 'reducers/userReducer';

export interface HomeProps {
  currentUser: UserEntity | null;
  googleLogin: () => void;
}

const Home: React.SFC<HomeProps> = ({ googleLogin, currentUser }) => {
  return currentUser !== null ? (
    <Redirect to={'/tasks'} />
  ) : (
    <div>
      <button onClick={googleLogin}>google</button>
    </div>
  );
};

export default Home;
