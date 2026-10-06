import { useEffect, useState } from 'react';
import { getUsers } from '../api/endpoints';
import type { User } from '../types';

interface Props {
  selectedId?: number;
  onSelect: (user: User) => void;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((part) => !part.endsWith('.'))
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

export default function UserList({ selectedId, onSelect }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Users</h2>
      {loading && <p className="muted">Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {users.map((user) => (
        <button
          key={user.id}
          className={user.id === selectedId ? 'user active' : 'user'}
          onClick={() => onSelect(user)}
        >
          <span className="avatar">{getInitials(user.name)}</span>
          <span className="user-text">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </span>
        </button>
      ))}
    </aside>
  );
}
