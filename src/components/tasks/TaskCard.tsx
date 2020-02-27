import React, { useState } from 'react';
import { Card, Typography, CardContent, Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { User } from 'reducers/userReducer';
import styled from 'styled-components';

interface TackCardProps {
  id: number;
  content: string;
  priority: string;
  staff: string;
  currentUser: User;
  deleteTask: (currentUser: User, id: number) => void;
}

const TaskCard: React.SFC<TackCardProps> = ({
  id,
  content,
  priority,
  staff,
  currentUser,
  deleteTask,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteTask = () => {
    deleteTask(currentUser, id);
  };

  const ToggleMenu = () => (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpenMenu}
      >
        <Icon>more_vert</Icon>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem>更新</MenuItem>
        <MenuItem onClick={handleDeleteTask}>削除</MenuItem>
      </Menu>
    </div>
  );

  return (
    <CardContainer>
      <Card>
        <_CardContent>
          <CardBody>
            <Typography gutterBottom>{content}</Typography>
            <Typography gutterBottom>担当者：{staff}</Typography>
          </CardBody>
          <ToggleMenu />
        </_CardContent>
      </Card>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

const _CardContent = styled(CardContent)`
  display: flex;
`;

const CardBody = styled.div`
  flex: 1;
`;

const _Menu = styled(Menu)``;
export default TaskCard;
