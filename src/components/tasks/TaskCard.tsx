import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
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
