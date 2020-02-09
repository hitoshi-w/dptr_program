import React from 'react';
import fb from 'config/fbConfig';

interface NavbarProps {
  loggedOut: () => void;
}
const Navbar: React.SFC<NavbarProps> = ({ loggedOut }) => {
  const logout = () => {
    fb.auth().signOut();
  };
  return (
    <div>
      <h2>Taska</h2>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Navbar;
