import React, { useCallback } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import useSearchTournament from '../hooks/useSearchTournament';

import Button from './Button';
import Input from './Input';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Header() {
  const { searchTournament } = useSearchTournament();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query) => searchTournament(query), 500),
    [searchTournament]
  );

  return (
    <Container>
      <Input
        placeholder="Search tournament ..."
        onChange={(e) => debouncedSearch(e.target.value)}
        data-testid="search-input"
      />
      <Button>CREATE TOURNAMENT</Button>
    </Container>
  );
}
