import React, { useCallback } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';

import useSearchTournament from '../hooks/useSearchTournament';
import Button from './Button';
import Input from './Input';
import useCreateTournament from '../hooks/useCreateTournament';
import validateTournamentName from '../utils/validateTournamentName';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Header() {
  const { searchTournament } = useSearchTournament();
  const { createTournament } = useCreateTournament();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query) => {
      searchTournament(query);
      navigate({
        pathname: '/',
        search: `query=${query}`,
      });
    }, 500),
    [searchTournament]
  );

  const onCreate = () => {
    const tournamentName = window?.prompt('Tournament Name: ');

    if (!tournamentName) {
      return;
    }
    if (!validateTournamentName(tournamentName)) {
      return window?.alert(
        'Tournament name should contain only letters, numbers, spaces and not only spaces'
      );
    }
    createTournament({ name: tournamentName });
  };

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return (
    <Container>
      <Input
        placeholder="Search tournament ..."
        onChange={onSearch}
        data-testid="search-input"
      />
      <Button onClick={onCreate}>CREATE TOURNAMENT</Button>
    </Container>
  );
}
