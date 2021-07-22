import {Actor} from './../../models/Actor';
import {MovieActorsAxiosResponse} from './../../models/MovieActorsAxiosResponse';

import {MovieDetails} from './../../models/MovieDetails';
import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';

export const getMovieDetails = createAsyncThunk<MovieDetails, number>(
  'movieDetails/getMovieDetails',
  async id => {
    const res = await axiosInstance.get<MovieDetails>(
      `movie/${id}?api_key=${API_KEY}&language=en-US`,
    );

    const newresult: MovieDetails = {
      id: res.data.id,
      overview: res.data.overview,
      runtime: res.data.runtime,
      title: res.data.title,
      vote_average: res.data.vote_average,
      poster_path: res.data.poster_path,
      revenue: res.data.revenue,
      release_date: res.data.release_date,
      genres: res.data.genres,
    };

    return newresult;
  },
);

export const getMovieActors = createAsyncThunk<Actor[], number>(
  'movieDetails/getMovieActors',
  async id => {
    const res = await axiosInstance.get<MovieActorsAxiosResponse>(
      `movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    );

    const newresult: Actor[] = res.data.cast.map(actor => ({
      id: actor.id,
      name: actor.name,
      profile_path: actor.profile_path,
    }));

    return newresult;
  },
);
