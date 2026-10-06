import { useEffect, useState } from 'react';
import { getAlbumsByUser } from '../api/endpoints';
import type { Album, User } from '../types';

interface Props {
  user: User;
  selectedId?: number;
  onSelect: (album: Album) => void;
}

export default function AlbumList({ user, selectedId, onSelect }: Props) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getAlbumsByUser(user.id)
      .then(setAlbums)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user.id]);

  return (
    <section className="section">
      <div className="profile">
        <h1>{user.name}</h1>
        <p className="muted">
          @{user.username} · {user.company.name} · {user.address.city}
        </p>
        <p className="muted">
          {user.email} · {user.phone} · {user.website}
        </p>
      </div>

      <h2 className="section-title">
        Albums <span className="count">{albums.length}</span>
      </h2>
      {loading && <p className="muted">Loading albums...</p>}
      {error && <p className="error">{error}</p>}
      <div className="album-grid">
        {albums.map((album) => (
          <button
            key={album.id}
            className={album.id === selectedId ? 'album active' : 'album'}
            onClick={() => onSelect(album)}
          >
            <span className="album-id">Album {album.id}</span>
            <span className="album-title">{album.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
