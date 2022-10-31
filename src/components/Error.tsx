import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import theme from '../theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing(4)};
  margin-top: ${theme.spacing(6)};
`;

type ErrorProps = {
  message?: string;
  onRetry?: () => void;
};

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <Container>
      {message || 'Something went wrong.'}
      {onRetry && <Button onClick={onRetry}>RETRY</Button>}
    </Container>
  );
}
