import React from 'react';
import { Container, Typography } from '@material-ui/core';


export default function AppContainer() {

  return (
    <Container
      maxWidth="lg"
      style={styles.container}
    >
      <Typography variant='h2'>
        React Django
      </Typography>
    </Container>
  );
}


const styles = {
  container: {
    padding: 'auto',
    minHeight: '95vh'
  }
}