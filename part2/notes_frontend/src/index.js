import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App'

// axios.get('http://localhost:3001/api/notes').then(response => {
axios.get('/api/notes').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})