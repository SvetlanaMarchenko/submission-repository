import {useDispatch } from 'react-redux';
import anecdoteService from './Services/anecdote'
import { createAnecdote } from './reducers/anecdoteReducer';

const NewAnecdote  = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewAnecdote