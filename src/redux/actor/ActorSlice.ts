import {createSlice} from '@reduxjs/toolkit';
import {ActorState} from 'src/models';
import {RootState} from '../rootReducer';
import {getActor} from './ActorAction';

const initialState: ActorState = {
  actor: {
    id: 0,
    name: '',
    profilePath: '',
    placeOfBirth: '',
    birthday: '',
    biography: '',
    knownAs: [],
    homepage: '',
    popularity: 0,
    gender: 0,
    deathday: '',
    department: '',
  },
  error: '',
  loading: false,
};

const ActorSlice = createSlice({
  name: 'actor',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getActor.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getActor.fulfilled, (state, action) => {
        state.loading = false;
        state.actor = action.payload;
      })
      .addCase(getActor.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      });
  },
});

export default ActorSlice.reducer;
export const actorSelector = (state: RootState) => state.actor;
