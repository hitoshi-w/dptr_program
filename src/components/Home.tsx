import React from 'react';
import { Redirect } from 'react-router-dom';
import { User } from 'App';

export interface HomeProps {
  currentUser: User;
  googleLogin: () => void;
}

const Home: React.SFC<HomeProps> = ({ googleLogin, currentUser }) => {
  return currentUser?.uid !== null ? (
    <Redirect to={'/tasks'} />
  ) : (
    <div>
      <button onClick={googleLogin}>google</button>
    </div>
  );
};

export default Home;
