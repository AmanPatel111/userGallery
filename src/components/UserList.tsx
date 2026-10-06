import { useEffect } from 'react';
import { fetchUsers, selectUser } from '../store/gallerySlice';
import { useAppDispatch, useAppSelector } from '../store';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((part) => !part.endsWith('.'))
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

export default function UserList() {
  const dispatch = useAppDispatch();
  const { users, selectedUser } = useAppSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Users</h2>
      {users.map((user) => (
        <button
          key={user.id}
          className={user.id === selectedUser?.id ? 'user active' : 'user'}
          onClick={() => dispatch(selectUser(user))}
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
