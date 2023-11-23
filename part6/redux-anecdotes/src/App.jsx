import { useEffect } from 'react'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Filter from './Filter'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdote'
import { setAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdote(anecdotes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
      
    </div>
  )
}

export default App