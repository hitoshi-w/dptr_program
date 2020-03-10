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
  id: string;
  index: number;
  content: string;
  priority: number;
  staff: string;
  openModal: (id: string) => void;
  openDialog: (id: string) => void;
}

const TaskCard: React.FC<TackCardProps> = ({
  id,
  index,
  content,
  priority,
  staff,
  openModal,
  openDialog,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteTask = () => {
    setAnchorEl(null);
    openDialog(id);
  };

  const handleOpenModal = () => {
    setAnchorEl(null);
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
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <_Card data-priority={priority}>
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
  &[data-priority='1'] {
    border: 1px solid var(--color-orange);
    box-shadow: 0px 2px 1px -1px rgba(255, 153, 0, 0.2),
      0px 1px 1px 0px rgba(255, 153, 0, 0.14),
      0px 1px 3px 0px rgba(255, 153, 0, 0.12);
  }
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
