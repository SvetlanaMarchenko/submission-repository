import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App'

axios.get('http://localhost:3003/api/blogs').then(response => {
// axios.get('/api/blogs').then(response => {
  const blogs = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App blogs={blogs} />)
})
