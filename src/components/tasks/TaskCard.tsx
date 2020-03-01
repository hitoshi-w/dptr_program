import React, { useState } from 'react';
import { User } from 'reducers/userReducer';
import { Draggable } from 'react-beautiful-dnd';
import { MoreVert } from '@material-ui/icons';
import {
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import styled from 'styled-components';

interface TackCardProps {
  id: number;
  index: number;
  content: string;
  priority: string;
  staff: string;
  currentUser: User;
  deleteTask: (currentUser: User, id: number) => void;
  openModal: (id: number) => void;
}

const TaskCard: React.FC<TackCardProps> = ({
  id,
  index,
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
    openModal(id);
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
      <_MenuItem onClick={handleOpenModal}>更新</_MenuItem>
      <_MenuItem onClick={handleDeleteTask}>削除</_MenuItem>
    </Menu>
  );

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <_Card>
            <CardBody>
              <Typography>{content}</Typography>
              <_Typography>担当者：{staff}</_Typography>
            </CardBody>
            <CardIcon>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                component="span"
              >
                <MoreVert fontSize="small" />
              </IconButton>
            </CardIcon>
          </_Card>
          {renderMenu}
        </div>
      )}
    </Draggable>
  );
};

const _MenuItem = styled(MenuItem)`
  padding-left: 20px;
  padding-right: 20px;
`;

const _Card = styled(Card)`
  display: flex;
  margin-bottom: 8px;
  padding: 12px 4px 12px 12px;
`;

const CardBody = styled.div`
  flex: 1 0 300px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: hidden;
  box-sizing: border-box;
`;

const _Typography = styled(Typography)`
  margin-top: 8px;
  color: var(--color-grey-dark-2);
  font-size: 12px;
`;

const CardIcon = styled.div`
  flex: 0 0 44px;
  align-self: flex-start;
  margin-left: 4px;
`;

export default TaskCard;
