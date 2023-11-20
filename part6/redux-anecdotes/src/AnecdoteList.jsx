
import { useSelector, useDispatch } from 'react-redux';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    // console.log("state is ", state)
    const anecdotes =  state.anecdotes;
    const filterText2 = state.filter;
    if(filterText2 === "") return anecdotes;

    const filteredAnecdotes = anecdotes.filter(anecdote => {
      // console.log("Trying to filter anecdote with content ", anecdote.content,  "by filter text ", filterText2)
      return anecdote.content.includes(filterText2)
    })
    // console.log("filteredAnecdotes:", filteredAnecdotes)
    return filteredAnecdotes
  });

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    console.log('vote', id);
    dispatch({
      type: 'VOTE',          // Correct action type for voting
      id: id,                // Include the ID of the voted anecdote
    });
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
