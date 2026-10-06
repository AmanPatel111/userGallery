import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getAlbumsByUser, getPhotosByAlbum, getUsers } from '../api/endpoints';
import type { Album, Photo, User } from '../types';

export const fetchUsers = createAsyncThunk('users/fetch', getUsers);
export const fetchAlbums = createAsyncThunk('albums/fetch', getAlbumsByUser);
export const fetchPhotos = createAsyncThunk('photos/fetch', getPhotosByAlbum);

const thunks = [fetchUsers, fetchAlbums, fetchPhotos] as const;

const initialState = {
  users: [] as User[],
  albums: [] as Album[],
  photos: [] as Photo[],
  selectedUser: null as User | null,
  selectedAlbum: null as Album | null,
  photoIndex: null as number | null,
  loading: false,
  error: '',
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
      state.selectedAlbum = null;
      state.albums = [];
      state.photos = [];
    },
    selectAlbum(state, action: PayloadAction<Album | null>) {
      state.selectedAlbum = action.payload;
      state.photos = [];
      state.photoIndex = null;
    },
    viewPhoto(state, action: PayloadAction<number | null>) {
      state.photoIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.loading = true;
        state.error = '';
      })
      .addMatcher(isFulfilled(...thunks), (state) => {
        state.loading = false;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export const { selectUser, selectAlbum, viewPhoto } = gallerySlice.actions;
export default gallerySlice.reducer;
