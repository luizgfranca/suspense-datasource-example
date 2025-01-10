import { useState } from 'react';
import ArtistPage from './ArtistPage.js';
import { ContextProvider } from './Provider.js';



function Page() {
  const [selectedArtist, setSelectedArtist] = useState({
    id: '',
    name: '',
  });
  return (
    <>
      <button onClick={() => {
        setSelectedArtist({
          id: 'the-beatles',
          name: 'The Beatles'
        })
      }}>
        Open The Beatles artist page
      </button>
      {
        selectedArtist.id 
        ? (
          <ArtistPage
            artist={selectedArtist}
          />
        ) : <></>
      }

    </>
    
  );
}

export default function App() {
  return (
    <ContextProvider>
      <Page />
    </ContextProvider>
  )
}

