import React, { useState } from 'react';
import { User } from 'reducers/userReducer';
import fb from 'config/fbConfig';

import {
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';
import styled from 'styled-components';

interface NavbarProps {
  currentUser: User;
  loggedOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, loggedOut }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    fb.auth().signOut();
    loggedOut();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      getContentAnchorEl={null}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logout}>ログアウト</MenuItem>
    </Menu>
  );

  return (
    <Header>
      <Typography variant="h5" noWrap>
        Taska
      </Typography>
      <Search>
        <SearchIconBox>
          <_SearchIcon />
        </SearchIconBox>
        <_InputBase placeholder="Search..."></_InputBase>
      </Search>
      <div>
        <_IconButton
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
        >
          {currentUser?.name ? currentUser.name.charAt(0) : <Person />}
        </_IconButton>
      </div>
      {renderMenu}
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
`;

const Search = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-grey-dark-3);
`;

const SearchIconBox = styled.div`
  display: flex;
  align-self: center;
  margin-right: 4px;
`;

const _SearchIcon = styled(SearchIcon)`
  color: var(--color-grey-dark-2);
`;

const _InputBase = styled(InputBase)`
  width: 240px;
`;

const _IconButton = styled(IconButton)`
  display: flex;
  width: 48px;
  height: 48px;
  padding: 0;
`;

export default Navbar;
