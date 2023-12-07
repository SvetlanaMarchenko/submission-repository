import { useEffect } from 'react'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Filter from './Filter'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())  
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