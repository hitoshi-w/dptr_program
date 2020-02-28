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
  openModal: () => void;
}

const TaskCard: React.SFC<TackCardProps> = ({
  id,
  content,
  priority,
  staff,
  currentUser,
  deleteTask,
  openModal,
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

  const handleOpenModal = () => {
    openModal();
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      getContentAnchorEl={null}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleOpenModal}>更新</MenuItem>
      <MenuItem onClick={handleDeleteTask}>削除</MenuItem>
    </Menu>
  );

  return (
    <div>
      <CardContainer>
        <Card>
          <_CardContent>
            <CardBody>
              <Typography gutterBottom>{content}</Typography>
              <Typography gutterBottom>担当者：{staff}</Typography>
            </CardBody>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleOpenMenu}
            >
              <Icon>more_vert</Icon>
            </Button>
          </_CardContent>
        </Card>
      </CardContainer>
      {renderMenu}
    </div>
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
