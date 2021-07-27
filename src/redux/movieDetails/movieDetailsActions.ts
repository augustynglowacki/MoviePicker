import {TvShowsDetailsAxiosResponse} from './../../models/TvShowsDetailsAxiosResponse';
import {Actor} from './../../models/Actor';
import {MovieActorsAxiosResponse} from './../../models/MovieActorsAxiosResponse';
import {MovieDetails} from './../../models/MovieDetails';
import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import {TvShowsDetails} from '../../models/TvShowsDetails';

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

export const getTvShows = createAsyncThunk<TvShowsDetails, number>(
  'tvShowDetails/getTvShowDetails',
  async id => {
    console.log(id);

    const res = await axiosInstance.get<TvShowsDetailsAxiosResponse>(
      `tv/${id}?api_key=${API_KEY}&language=en-US`,
    );

    const newResult: TvShowsDetails = {
      title: res.data.name,
      number_of_episodes: res.data.number_of_episodes,
      number_of_seasons: res.data.number_of_seasons,
      vote_average: res.data.vote_average,
      poster_path: res.data.poster_path,
      seasons: res.data.seasons,
      id: res.data.id,
      overview: res.data.overview,
      genres: res.data.genres,
    };
    return newResult;
  },
);
