import { Suspense } from 'react';
import Albums from './Albums.js';

const albumDatasource = new AlbumDatasource();

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums datasource={albumDatasource} artistId={artist.id} />
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
