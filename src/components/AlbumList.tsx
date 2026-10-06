import { useEffect } from 'react';
import { fetchAlbums, selectAlbum } from '../store/gallerySlice';
import { useAppDispatch, useAppSelector } from '../store';

export default function AlbumList() {
  const dispatch = useAppDispatch();
  const { albums, selectedUser, selectedAlbum } = useAppSelector((state) => state.gallery);
  const user = selectedUser!;

  useEffect(() => {
    dispatch(fetchAlbums(user.id));
  }, [dispatch, user.id]);

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
      <div className="album-grid">
        {albums.map((album) => (
          <button
            key={album.id}
            className={album.id === selectedAlbum?.id ? 'album active' : 'album'}
            onClick={() => dispatch(selectAlbum(album))}
          >
            <span className="album-id">Album {album.id}</span>
            <span className="album-title">{album.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
