import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  people: [],
  isLoading: false,
  error: null,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    getPeopleStart: state => {
      state.isLoading = true;
    },
    getPeopleSuccess: (state, action) => {
      state.people = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getPeopleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getPeopleStart, getPeopleSuccess, getPeopleFailure } =
  peopleSlice.actions;

export const fetchPeople = () => async dispatch => {
  try {
    dispatch(getPeopleStart());
    const response = await axios.get('https://swapi.dev/api/people');
    const people = response.data.results;
    const peopleWithFilms = await Promise.all(
      people.map(async person => {
        const films = await Promise.all(
          person.films.map(async film => {
            const response = await axios.get(film);
            return response.data;
          }),
        );
        person.films = films;
        return person;
      }),
    );
    dispatch(getPeopleSuccess(peopleWithFilms));
  } catch (err) {
    dispatch(getPeopleFailure(err.message));
  }
};

export default peopleSlice.reducer;
