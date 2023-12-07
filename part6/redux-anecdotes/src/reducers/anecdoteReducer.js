import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../Services/anecdote'

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
});

const initialState = {
  anecdotes: anecdotesAtStart.map(asObject),
  filter: '',
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    letsVote(state, action) {
      const votedAnecdote = action.payload;
      const anecdoteToVote = state.anecdotes.find(a => a.id === votedAnecdote.id);

      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    appendAnecdoteFilter(state, action) {
      state.filter = action.payload.filterText;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      state.anecdotes =  action.payload
    },
  },
});



export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdotes = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { createAnecdote, letsVote, appendAnecdoteFilter, appendAnecdote, setAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
