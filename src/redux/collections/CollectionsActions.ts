import {createAsyncThunk} from '@reduxjs/toolkit';
import {Movie} from 'src/models';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {setData} from 'src/service/firestore/collection';

export const getFavorite = createAsyncThunk<Movie[]>(
  'collections/getFavorite',
  async () =>
    new Promise((resolve, reject) => {
      const userId = auth().currentUser?.uid ?? 'none';
      firestore()
        .collection('users')
        .doc(userId)
        .collection('favoriteMovies')
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
export const setFavorite = createAsyncThunk<void, Movie>(
  'collections/setFavorite',
  async movie => {
    await setData(movie);
  },
);

export const getWatched = createAsyncThunk<Movie[]>(
  'collections/getWatched',
  async () =>
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

export const getToWatch = createAsyncThunk<Movie[]>(
  'collections/getToWatch',
  async () =>
    new Promise((resolve, reject) => {
      const userId = auth().currentUser?.uid ?? 'none';
      firestore()
        .collection('users')
        .doc(userId)
        .collection('toWatch')
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
