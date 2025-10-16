// src/App.tsx
import React from 'react';
import { ArtworkTable } from './artworkTable';

// PrimeReact CSS imports
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Art Institute of Chicago - Artworks</h1>
      <ArtworkTable />
    </div>
  );
};

export default App;

