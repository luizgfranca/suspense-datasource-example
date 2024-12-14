import { fetchData } from './data.js';
import { AlbumDatasource } from './AlbumDatasource.js';

// Note: this component is written using an experimental API
// that's not yet available in stable versions of React.

// For a realistic example you can follow today, try a framework
// that's integrated with Suspense, like Relay or Next.js.

const albumDatasource = new AlbumDatasource();

export default function Albums({ albumDatasource, artistId }) {
  const albums = albumDatasource.get();
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}