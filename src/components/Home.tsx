import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserEntity } from 'reducers/userReducer';

export interface HomeProps {
  currentUser: UserEntity | null;
  googleLogin: () => void;
  getUser: () => void;
  isFetching: boolean;
}

const Home: React.SFC<HomeProps> = ({
  currentUser,
  getUser,
  isFetching,
  googleLogin,
}) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return currentUser !== null ? (
    <Redirect to={'/tasks'} />
  ) : isFetching ? (
    <p>Loading</p>
  ) : (
    <div>
      <button onClick={googleLogin}>google</button>
    </div>
  );
};

export default Home;
