import React from 'react';
import { Task } from 'reducers/taskReducer';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';

const TaskCard: React.SFC<Task> = ({ content, priority, staff }) => {
  return (
    <CardContainer>
      <Card>
        <CardContent>
          <Typography gutterBottom>{content}</Typography>
        </CardContent>
      </Card>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

export default TaskCard;
