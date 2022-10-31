import React from 'react';

import Container from '../components/Container';
import H4 from '../components/H4';
import Tournaments from '../components/Tournaments';
import useTournaments from '../hooks/useTournaments';

export default function Home() {
  const tournaments = useTournaments();

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Tournaments {...tournaments} />
    </Container>
  );
}
