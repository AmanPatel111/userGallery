import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { getPhotosByAlbum } from '../api/endpoints';
import type { Album, Photo } from '../types';

interface Props {
  album: Album;
}

const fallbackTo = (id: number, size: number) => (e: SyntheticEvent<HTMLImageElement>) => {
  const backup = `https://picsum.photos/seed/${id}/${size}`;
  if (e.currentTarget.src !== backup) {
    e.currentTarget.src = backup;
  }
};

export default function PhotoGrid({ album }: Props) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getPhotosByAlbum(album.id)
      .then(setPhotos)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [album.id]);

  return (
    <section className="section">
      <h2 className="section-title">
        Photos <span className="count">{photos.length}</span>
      </h2>
      <p className="muted album-name">{album.title}</p>
      {loading && <p className="muted">Loading photos...</p>}
      {error && <p className="error">{error}</p>}
      <div className="photo-grid">
        {photos.map((photo) => (
          <figure key={photo.id} className="photo">
            <img
              className="photo-main"
              src={photo.url}
              alt={photo.title}
              loading="lazy"
              onError={fallbackTo(photo.id, 300)}
            />
            <figcaption>
              <img
                className="photo-thumb"
                src={photo.thumbnailUrl}
                alt=""
                loading="lazy"
                onError={fallbackTo(photo.id, 60)}
              />
              <span>{photo.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
