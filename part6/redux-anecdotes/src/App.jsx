import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import rootReducer from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes.anecdotes);
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState('');

  const vote = (id) => {
    console.log('vote', id);
    dispatch({
      type: 'VOTE',
      id: id
    });
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    console.log('addAnecdote', newAnecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote,
        id: getId(),
        votes: 0
      }
    });
    setNewAnecdote('');
  };

  const getId = () => (100000 * Math.random()).toFixed(0);

  return (
    <div>
      <h2>Anecdotes</h2>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            type="text"
            value={newAnecdote}
            onChange={(e) => setNewAnecdote(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
