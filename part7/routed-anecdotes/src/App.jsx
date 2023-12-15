import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch, // Можете удалить этот импорт, если он не используется
} from "react-router-dom";


const Menu = () => {
  return (
    <h1>Software anecdotes</h1>
  );
}


const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find(n => n.id === Number(id));

  // Check if anecdote is undefined before accessing its properties
  if (!anecdote) {
    return (
      <div>
        <p>Anecdote not found</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes </p>
      <p>For more info, see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);



const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)


const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })

    setContent('');
    setAuthor('');
    setInfo('');
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button type="submit"> create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { 
      id: 1,
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0
    },
    {
      id: 2,
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0
    }
  ])

  const padding = {
    paddingRight: 5
  }

  const [notification, setNotification] = useState('')

  


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));

    // Set the notification message
    setNotification(`A new anecdote "${anecdote.content}" created!`);

    // Clear the notification after 5 seconds
    setTimeout(() => {
      setNotification('');
    }, 5000);

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">Menu</Link>
          <Link style={padding} to="/anecdotes">anecdotes</Link>
          <Link style={padding} to="/createNew">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>
      
        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/createNew" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element= {<About />} />
          <Route path="/" element={<Menu />} />
        </Routes>
      </Router>
      <div>
        {notification && <p>{notification}</p>}
        <br />
        <em>
          Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
          See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
        </em>
      </div>
    </div>
  )
}

export default App
