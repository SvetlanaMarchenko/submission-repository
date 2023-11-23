import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App';
import anecdoteService from './services/anecdote'
import anecdoteReducer, { setAnecdote } from './reducers/anecdoteReducer'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
  }
})

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(setAnecdote(anecdotes))
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

