import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Filter from './Filter'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
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