import React from 'react';
import styled from 'styled-components';
import { formatInTimeZone } from 'date-fns-tz';

import { Tournament as TournamentType } from '../types/Tournament';
import H6 from './H6';
import Button from './Button';
import theme from '../theme';
import useEditTournament from '../hooks/useEditTournament';
import validateTournamentName from '../utils/validateTournamentName';
import useDeleteTournament from '../hooks/useDeleteTournament';

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
  id,
  name,
  organizer,
  game,
  participants,
  startDate,
}: TournamentType) {
  const { editTournament } = useEditTournament();
  const { deleteTournament } = useDeleteTournament();

  const formattedStartDateInTimeZone = formatInTimeZone(
    new Date(startDate),
    'Europe/London',
    `dd/MM/yyyy, HH:mm:ss zzz`
  );

  const onEdit = () => {
    const tournamentName = window?.prompt('New Tournament Name: ', name);

    if (!tournamentName) {
      return;
    }
    if (!validateTournamentName(tournamentName)) {
      return window?.alert(
        'Tournament name should contain only letters, numbers, spaces and not only spaces'
      );
    }
    editTournament({ id, name: tournamentName });
  };

  const onDelete = () => {
    const isConfirmed = window?.confirm(
      `Do you really want to delete the tournament "${name}"?`
    );
    if (isConfirmed) {
      deleteTournament(id);
    }
  };

  return (
    <Container data-testid="tournament">
      <H6 data-testid="tournament-name">{name}</H6>

      <div>Organizer: {organizer}</div>
      <div>Game: {game}</div>
      <div>Participants: {`${participants.current}/${participants.max}`}</div>
      <div>Start: {formattedStartDateInTimeZone}</div>

      <Buttons>
        <Button onClick={onEdit}>EDIT</Button>
        <Button onClick={onDelete}>DELETE</Button>
      </Buttons>
    </Container>
  );
}
