import React from 'react';

import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
  }),
);

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
      <MenuItem onClick={handleMenuClose}>ログアウト</MenuItem>
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
        <IconButton
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
        >
          W
        </IconButton>
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

// const logout = () => {
//   fb.auth().signOut();
// };
// return (
//   <div>
//     <h2>Taska</h2>
//     <button onClick={logout}>logout</button>
//   </div>
// );

export default Navbar;
