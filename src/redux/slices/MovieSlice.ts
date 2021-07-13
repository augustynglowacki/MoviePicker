import {API_KEY} from '@env';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import {Movie, MovieAxiosResponse, MovieState} from '../../models';
import {AppDispatch, AppThunk} from '../../redux/store';
import {RootState} from '../rootReducer';

const initialState: MovieState = {
  movies: [{id: 0, title: '', vote_average: 0, poster_path: '', overview: ''}],
  loading: false,
  error: '',
};

//createSlice is a function that accepts a "slice name", an initial state, and an object full of reducer functions.
//Then it automatically generates action creators and action types that correspond to the reducers and state.
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setErrors: (state, {payload}: PayloadAction<string>) => {
      state.error = payload;
    },
    //Actions are strongly typed with PayloadAction, so that the setMovies action only supports object of type Array<Movie>.
    setMovies: (state, {payload}: PayloadAction<Array<Movie>>) => {
      state.movies = payload;
    },
  },
});

//Since createSlice has taken care of building the reducer, we export it via: export default movieSlice.reducer;
export default movieSlice.reducer;
export const {setLoading, setMovies, setErrors} = movieSlice.actions;

export const movieSelector = (state: RootState) => state.movies;

//Thunk action
export const getMovies = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    // Set loading true when starting fetch
    dispatch(setLoading(true));
    try {
      //We have our base url configured in /helpers/axiosInstance, so we don't have to add {API_URL} at the beginning anymore.
      const res = await axiosInstance.get<MovieAxiosResponse>(
        `movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      );
      //Mapping our res.data.results, which return full details about movie to a new array which only has the properties that we need.
      const newresult = res.data.results.map((x: any) => ({
        id: x.id,
        title: x.title,
        vote_average: x.vote_average,
        poster_path: x.poster_path,
        overview: x.overview,
      }));
      dispatch(setMovies(newresult));
      //Set Loading to false after finished fetching
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setErrors(error.message));
      dispatch(setLoading(false));
    }
  };
};
