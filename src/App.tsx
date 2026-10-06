import { useState } from 'react';
import UserList from './components/UserList';
import AlbumList from './components/AlbumList';
import PhotoGrid from './components/PhotoGrid';
import type { Album, User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);

  const selectUser = (selected: User) => {
    setUser(selected);
    setAlbum(null);
  };

  return (
    <div className="app">
      <header className="topbar">User Gallery</header>
      <div className="layout">
        <UserList selectedId={user?.id} onSelect={selectUser} />
        <main className="content">
          {!user && (
            <div className="empty">
              <h1>Welcome</h1>
              <p>Pick a user from the list to browse their albums and photos.</p>
            </div>
          )}
          {user && <AlbumList user={user} selectedId={album?.id} onSelect={setAlbum} />}
          {album && <PhotoGrid album={album} />}
        </main>
      </div>
    </div>
  );
}
