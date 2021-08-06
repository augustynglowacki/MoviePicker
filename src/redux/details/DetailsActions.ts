import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from 'src/helpers/axiosInstance';
import {
  Actor,
  DetailsActorsAxiosResponse,
  ContentType,
  MovieDetails,
  TvSeriesDetails,
  TvSeriesDetailsAxiosResponse,
} from 'src/models';
import {MovieDetailsApi} from 'src/models/movies';

export const getMovieDetails = createAsyncThunk<MovieDetails, number>(
  'details/getMovieDetails',
  async id => {
    const res = await axiosInstance.get<MovieDetailsApi>(
      `movie/${id}?api_key=${API_KEY}&language=en-US`,
    );
    return {
      id: res.data.id,
      overview: res.data.overview,
      title: res.data.title,
      voteAverage: res.data.vote_average,
      posterPath: res.data.poster_path,
      runtime: res.data.runtime,
      releaseDate: res.data.release_date,
      genres: res.data.genres,
      contentType: ContentType.Movie,
    };
  },
);

export const getMovieActors = createAsyncThunk<Actor[], number>(
  'details/getMovieActors',
  async id => {
    const res = await axiosInstance.get<DetailsActorsAxiosResponse>(
      `movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    );
    return res.data.cast.map(actor => ({
      id: actor.id,
      name: actor.name,
      profilePath: actor.profile_path,
    }));
  },
);
export const getTvSeriesActors = createAsyncThunk<Actor[], number>(
  'details/getTvSeriesActors',
  async id => {
    const res = await axiosInstance.get<DetailsActorsAxiosResponse>(
      `tv/${id}/credits?api_key=${API_KEY}&language=en-US`,
    );
    return res.data.cast.map(actor => ({
      id: actor.id,
      name: actor.name,
      profilePath: actor.profile_path,
    }));
  },
);

export const getTvSeriesDetails = createAsyncThunk<TvSeriesDetails, number>(
  'tvSerieDetails/getTvSerieDetails',
  async id => {
    const res = await axiosInstance.get<TvSeriesDetailsAxiosResponse>(
      `tv/${id}?api_key=${API_KEY}&language=en-US`,
    );
    return {
      title: res.data.name,
      episodesCount: res.data.number_of_episodes,
      seasonsCount: res.data.number_of_seasons,
      voteAverage: res.data.vote_average,
      posterPath: res.data.poster_path,
      id: res.data.id,
      overview: res.data.overview,
      genres: res.data.genres,
      contentType: ContentType.TvSerie,
    };
  },
);
