import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App'

axios.get('http://localhost:3001/api/bloglists').then(response => {
// axios.get('/api/bloglists').then(response => {
  const bloglists = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App bloglists={bloglists} />)
})
