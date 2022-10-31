import React from 'react';
import styled from 'styled-components';
import { formatInTimeZone } from 'date-fns-tz';

import { Tournament as TournamentType } from '../types/Tournament';
import H6 from './H6';
import Button from './Button';
import theme from '../theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.palette.background.base};
  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(6)};
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
  margin-top: ${theme.spacing(2)};
`;

export default function Tournament({
  name,
  organizer,
  game,
  participants,
  startDate,
}: TournamentType) {
  const formattedStartDateInTimeZone = formatInTimeZone(
    new Date(startDate),
    'Europe/London',
    `dd/MM/yyyy, HH:mm:ss zzz`
  );

  return (
    <Container data-testid="tournament">
      <H6>{name}</H6>

      <div>Organizer: {organizer}</div>
      <div>Game: {game}</div>
      <div>Participants: {`${participants.current}/${participants.max}`}</div>
      <div>Start: {formattedStartDateInTimeZone}</div>

      <Buttons>
        <Button>EDIT</Button>
        <Button>DELETE</Button>
      </Buttons>
    </Container>
  );
}
