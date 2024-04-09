import React from 'react';
import { Box, Typography } from '@mui/material';

function Test({ number, title, description }) {
  return (
    <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1, m: 1 }}>
      <Typography variant="h6">{number}</Typography>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography>{description}</Typography>
    </Box>
  );
}

function App() {
  const boxes = [
    { number: 1, title: 'Establishment', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { number: 2, title: 'Development', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { number: 3, title: 'Vision and Scope', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { number: 4, title: 'Value', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {boxes.map((box) => (
        <Test key={box.number} number={box.number} title={box.title} description={box.description} />
      ))}
    </div>
  );
}

export default App;
