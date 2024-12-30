import { fetchData } from './data.js';
import { AlbumDatasource } from './AlbumDatasource.js';
import { useProvider } from './Provider.js';

// Note: this component is written using an experimental API
// that's not yet available in stable versions of React.

// For a realistic example you can follow today, try a framework
// that's integrated with Suspense, like Relay or Next.js.


export default function Albums({artist}) {
  const provider = useProvider();
  return (
    <ul>
      {provider.getAlbums(artist.id).map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}