import React from 'react';
import styled from 'styled-components';
import type { AsyncThunkAction } from '@reduxjs/toolkit';

import Error from './Error';
import Loading from './Loading';
import Tournament from './Tournament';
import theme from '../theme';
import type { Tournament as TournamentType } from '../types/Tournament';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: ${theme.spacing(6)};
  margin-top: ${theme.spacing(6)};
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

type TournamentsProps = {
  tournaments: TournamentType[];
  error: boolean;
  loading: boolean;
  retry: () =>
    | Promise<
        | {
            type: string;
          }
        | undefined
      >
    | AsyncThunkAction<TournamentType[], void, {}>;
};

export default function Tournaments({
  tournaments,
  loading,
  error,
  retry,
}: TournamentsProps) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error onRetry={retry} />;
  }

  if (!tournaments.length) {
    return <Error message="No tournaments found." />;
  }

  return (
    <Container>
      {tournaments.map((tournament) => (
        <Tournament {...tournament} key={tournament.id} />
      ))}
    </Container>
  );
}
