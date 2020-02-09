import React from 'react';

export interface HomeProps {
  googleLogin: () => void;
}

const Home: React.SFC<HomeProps> = ({ googleLogin }) => {
  return (
    <div>
      <button onClick={googleLogin}>google</button>
    </div>
  );
};

export default Home;
