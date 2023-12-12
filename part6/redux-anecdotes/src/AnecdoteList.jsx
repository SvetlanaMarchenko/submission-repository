// AnecdoteList.jsx
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { letsVote } from './reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdotes.anecdotes);
  const filterText = useSelector((state) => state.anecdotes.filter);

  // Используем useMemo для мемоизации отфильтрованных анекдотов
  const filteredAnecdotes = useMemo(() => {
    if (filterText === "") return anecdotes;

    const normalizedFilterText = filterText.toLowerCase();

    return anecdotes.filter(anecdote => {
      const normalizedContent = anecdote.content.toLowerCase();
      return normalizedContent.includes(normalizedFilterText);
    });
  }, [anecdotes, filterText]);

  // Сортируем отфильтрованные анекдоты по убыванию голосов
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);

  // Обработчик голосования
  const votedAnecdote = (id) => {
    console.log('vote', id);
    dispatch(letsVote({ id }));
  };

  // Отображение отсортированных и отфильтрованных анекдотов
  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <form onSubmit={(e) => {
              e.preventDefault();
              votedAnecdote(anecdote.id);
            }}>
              <button type="submit">Vote</button>
              has {anecdote.votes}
            </form>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
