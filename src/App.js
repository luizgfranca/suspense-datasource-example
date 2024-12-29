import { useState } from 'react';
import ArtistPage from './ArtistPage.js';
import { ContextProvider } from './Provider.js';

function Page() {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  } else {
    return (
      <button onClick={() => setShow(true)}>
        Open The Beatles artist page
      </button>
    );
  }
}

export default function App() {
  return (
    <ContextProvider>
      <Page />
    </ContextProvider>
  )
}

