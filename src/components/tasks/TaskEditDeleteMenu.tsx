import React, { useState } from 'react';
import { Task } from 'reducers/taskReducer';

import { MoreVert } from '@material-ui/icons';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import styled from 'styled-components';

interface TaskEditDeleteMenuProps {
  task: Task;
  openTaskEdit: (task: Task) => void;
  openTaskDelete: (task: Task) => void;
}

const TaskEditDeleteMenu: React.FC<TaskEditDeleteMenuProps> = ({
  task,
  openTaskEdit,
  openTaskDelete,
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
    openTaskDelete(task);
  };

  const handleOpenModal = () => {
    setAnchorEl(null);
    openTaskEdit(task);
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
      <StyledMenuItem onClick={handleOpenModal}>更新</StyledMenuItem>
      <StyledMenuItem onClick={handleDeleteTask}>削除</StyledMenuItem>
    </Menu>
  );

  return (
    <>
      <StyledCardIcon>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          component="span"
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </StyledCardIcon>
      {renderMenu}
    </>
  );
};

const StyledMenuItem = styled(MenuItem)`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledCardIcon = styled.div`
  flex: 0 0 44px;
  align-self: flex-start;
  margin-left: 4px;
`;

export default TaskEditDeleteMenu;
