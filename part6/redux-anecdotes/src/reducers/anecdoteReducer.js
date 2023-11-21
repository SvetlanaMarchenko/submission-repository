import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

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
