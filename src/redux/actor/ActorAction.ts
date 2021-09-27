import {API_KEY} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from 'src/helpers/axiosInstance';
import {ActorDetail, ActorDetailApi} from 'src/models';

export const getActor = createAsyncThunk<ActorDetail, number>(
  'actor/getActor',
  async id => {
    const res = await axiosInstance.get<ActorDetailApi>(
      `person/${id}?api_key=${API_KEY}&language=en-US`,
    );
    return {
      id: res.data.id,
      name: res.data.name,
      profilePath: res.data.profile_path,
      birthday: res.data.birthday,
      department: res.data.known_for_department,
      deathday: res.data.deathday,
      knownAs: res.data.also_known_as,
      gender: res.data.gender,
      biography: res.data.biography,
      popularity: res.data.popularity,
      placeOfBirth: res.data.place_of_birth,
      homepage: res.data.homepage,
    };
  },
);
