import React from 'react';
import { Task } from 'reducers/taskReducer';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';

interface TackCardProps {
  content: string;
  priority: string;
  staff: string;
}
const TaskCard: React.SFC<TackCardProps> = ({ content, priority, staff }) => {
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
