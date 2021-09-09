import {createAsyncThunk} from '@reduxjs/toolkit';
import {Movie} from 'src/models';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {setData} from 'src/service/firestore/collection';

export const setFavorite = createAsyncThunk<void, Movie>(
  'collections/setFavorite',
  async movie => {
    await setData(movie, 'favorite');
  },
);

export const setWatchlist = createAsyncThunk<void, Movie>(
  'collections/setWatchlist',
  async movie => {
    await setData(movie, 'watchlist');
  },
);
export const setWatched = createAsyncThunk<void, Movie>(
  'collections/setWatched',
  async movie => {
    await setData(movie, 'watched');
  },
);
export const getFavorite = createAsyncThunk<Movie[]>(
  'collections/getFavorite',
  () =>
    new Promise((resolve, reject) => {
      const userId = auth().currentUser?.uid ?? 'none';
      firestore()
        .collection('users')
        .doc(userId)
        .collection('favorite')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                id: parseInt(doc.id, 10),
                posterPath: doc.data().posterPath,
                contentType: doc.data().contentType,
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);
export const getWatched = createAsyncThunk<Movie[]>(
  'collections/getWatched',
  () =>
    new Promise((resolve, reject) => {
      const userId = auth().currentUser?.uid ?? 'none';
      firestore()
        .collection('users')
        .doc(userId)
        .collection('watched')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                id: parseInt(doc.id, 10),
                posterPath: doc.data().posterPath,
                contentType: doc.data().contentType,
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);

export const getWatchlist = createAsyncThunk<Movie[]>(
  'collections/getWatchlist',
  () =>
    new Promise((resolve, reject) => {
      const userId = auth().currentUser?.uid ?? 'none';
      firestore()
        .collection('users')
        .doc(userId)
        .collection('watchlist')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                id: parseInt(doc.id, 10),
                posterPath: doc.data().posterPath,
                contentType: doc.data().contentType,
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);
