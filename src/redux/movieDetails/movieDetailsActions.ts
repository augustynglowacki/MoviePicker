import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from 'src/helpers/axiosInstance';
import {
  Actor,
  MovieDetails,
  TvSeriesDetails,
  TvSeriesDetailsAxiosResponse,
} from 'src/models';
import {MovieDetailsApi} from 'src/models/movie';

interface MovieActorsAxiosResponse {
  cast: Actor[];
}

export const getMovieDetails = createAsyncThunk<MovieDetails, number>(
  'movieDetails/getMovieDetails',
  async id => {
    const res = await axiosInstance.get<MovieDetailsApi>(
      `movie/${id}?api_key=${API_KEY}&language=en-US`,
    );

    const newresult: MovieDetails = {
      id: res.data.id,
      overview: res.data.overview,
      title: res.data.title,
      vote_average: res.data.vote_average,
      poster_path: res.data.poster_path, //camels
      runtime: res.data.runtime,
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
      //bad naming and ts problems
      id: actor.id,
      name: actor.name,
      profile_path: actor.profile_path,
    }));

    return newresult;
  },
);

export const getTvSeries = createAsyncThunk<TvSeriesDetails, number>(
  'tvSerieDetails/getTvSerieDetails',
  async id => {
    const res = await axiosInstance.get<TvSeriesDetailsAxiosResponse>(
      `tv/${id}?api_key=${API_KEY}&language=en-US`,
    );

    const newResult: TvSeriesDetails = {
      title: res.data.name,
      number_of_episodes: res.data.number_of_episodes,
      number_of_seasons: res.data.number_of_seasons,
      vote_average: res.data.vote_average,
      poster_path: res.data.poster_path,
      id: res.data.id,
      overview: res.data.overview,
      genres: res.data.genres,
    };
    return newResult;
  },
);
