import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from 'reducers/userReducer';
import { useForm } from 'react-hook-form';
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
  searchTask: (params: string) => void;
}

interface SearchForm {
  searchValue: string;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  loggedOut,
  searchTask,
}) => {
  const { register, handleSubmit } = useForm<SearchForm>();
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

  const onSubmit = handleSubmit(({ searchValue }) => {
    searchTask(searchValue);
  });

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      getContentAnchorEl={null}
      id="primary-search-account-menu"
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
      <Form onSubmit={onSubmit}>
        <_InputBase
          placeholder="Search..."
          inputRef={register}
          name="searchValue"
        />
        <_IconButton type="submit">
          <_SearchIcon />
        </_IconButton>
      </Form>
      <div>
        <_IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
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
  padding: 12px;
`;

const Form = styled.form`
  display: flex;
  border-bottom: 1px solid var(--color-grey-dark-3);
  align-items: flex-end;
`;

const _SearchIcon = styled(SearchIcon)`
  color: var(--color-grey-dark-2);
`;

const _InputBase = styled(InputBase)`
  width: 240px;
`;

const _IconButton = styled(IconButton)`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 0;
`;

export default Navbar;
