import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User } from 'reducers/userReducer';

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
  googleLogOut: () => void;
}

interface SearchForm {
  searchValue: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, googleLogOut }) => {
  const history = useHistory();
  const handleSearch = (data: SearchForm) => {
    history.push(`/tasks/search?query=${data.searchValue}`);
  };

  const { register, handleSubmit } = useForm<SearchForm>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
      <MenuItem onClick={googleLogOut}>ログアウト</MenuItem>
    </Menu>
  );

  return (
    <StyledHeader>
      <Typography variant="h5" noWrap>
        Taska
      </Typography>
      <StyledForm>
        <StyledInputBase
          placeholder="Search..."
          inputRef={register({ required: true })}
          name="searchValue"
        />
        <StyledIconButton type="button" onClick={handleSubmit(handleSearch)}>
          <StyledSearchIcon />
        </StyledIconButton>
      </StyledForm>
      <div>
        <StyledIconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
        >
          {currentUser?.name ? currentUser.name.charAt(0) : <Person />}
        </StyledIconButton>
      </div>
      {renderMenu}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  min-width: 1100px;
`;

const StyledForm = styled.form`
  display: flex;
  border-bottom: 1px solid var(--color-grey-dark-3);
  align-items: flex-end;
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: var(--color-grey-dark-2);
`;

const StyledInputBase = styled(InputBase)`
  width: 240px;
`;

const StyledIconButton = styled(IconButton)`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 0;
`;

export default Navbar;
