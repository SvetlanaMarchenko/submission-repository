import { createSlice } from '@reduxjs/toolkit'

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
    createAnecdote(state, action) {
      const newNoteText = action.payload;
      state.anecdotes.push({
        content: newNoteText,
        id: getId(),
        votes: 0,
      });
    },
    appendAnecdoteFilter(state, action) {
      state.filter = action.payload.filterText;
    },
    appendAnecdote(state, action) {
      state.anecdotes.push(action.payload);
    },
    setAnecdote(state, action) {
      state.anecdotes = action.payload;
    },
  },
});

export const { createAnecdote, letsVote, appendAnecdoteFilter, appendAnecdote, setAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
