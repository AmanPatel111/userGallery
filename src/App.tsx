import UserList from './components/UserList';
import AlbumList from './components/AlbumList';
import PhotoGrid from './components/PhotoGrid';
import { useAppSelector } from './store';

export default function App() {
  const { selectedUser, selectedAlbum, loading, error } = useAppSelector((state) => state.gallery);

  return (
    <div className="app">
      <header className="topbar">
        User Gallery
        {loading && <span className="status">Loading...</span>}
        {error && <span className="status">{error}</span>}
      </header>
      <div className="layout">
        <UserList />
        <main className="content">
          {!selectedUser && (
            <div className="empty">
              <h1>Welcome</h1>
              <p>Pick a user from the list to browse their albums and photos.</p>
            </div>
          )}
          {selectedUser && <AlbumList />}
          {selectedAlbum && <PhotoGrid />}
        </main>
      </div>
    </div>
  );
}
