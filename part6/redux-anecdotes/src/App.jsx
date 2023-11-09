import { useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import reducer from './reducers/anecdoteReducer';

const store = createStore(reducer);

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch({
      type: 'VOTE',
      id: id
    });
  };

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
      <form onSubmit={(e) => e.preventDefault()}>
        <div><input type="text" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);

export default App;
