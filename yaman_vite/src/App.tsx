import React from 'react';
import { ArtworkTable } from './artworkTable';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App: React.FC = () => {
  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        background: 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(18px) saturate(180%)',
        borderRadius: '16px',
        color: '#1d1d1f',
      }}
    >
      <h1
        style={{
          fontFamily: `'Playfair Display', serif`,
          fontSize: '2.2rem',
          color: '#0A84FF',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontWeight: '600',
        }}
      >
        Art Institute of Chicago - Artworks
      </h1>
      <ArtworkTable />
    </div>

  );
};

export default App;
