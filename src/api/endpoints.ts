import client from './client';
import type { Album, Photo, User } from '../types';

export const getUsers = () => client.get<User[]>('/users').then((res) => res.data);

export const getAlbumsByUser = (userId: number) =>
  client.get<Album[]>('/albums', { params: { userId } }).then((res) => res.data);

export const getPhotosByAlbum = (albumId: number) =>
  client.get<Photo[]>('/photos', { params: { albumId } }).then((res) => res.data);
