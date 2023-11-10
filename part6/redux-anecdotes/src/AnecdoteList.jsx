import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.anecdotes);
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch({
      type: 'VOTE',
      id: id,
    });
  };

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
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
    </div>
  );
};
export default AnecdoteList