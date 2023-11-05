import { useState, useEffect, useRef } from 'react'
import blogService from './blogs'
import './index.css'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'
import PropTypes from 'prop-types'
import LoginForm from './components/LoginForm'

const BlogInfo = (addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl,newLikes, setNewLikes, replaceInfoBlog, blogs ) => {
  const handleAuthorChange = (event) => {
    const newAuthorValue = event.target.value
    setNewAuthor(newAuthorValue)
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [AddedMessage, setAddedMessage] = useState(null)
  const [AddedNegMessage, setAddedNegMessage] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(response => {
        setBlogs(response)
      })
      .catch(error => {
        console.log('Error fetching data:', error)
      })
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const deleteBlog = (id, blog) => {
    if (window.confirm(`Remove blog '${blog.id}'?`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(error => {
          console.log('Error deleting blog:', error)
        })
    }
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong password or login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 } // Увеличьте количество лайков
    blogService
      .update(blog.id, updatedBlog) // Передайте идентификатор блога и обновленные данные
      .then(returnedBlog => {
        // Обновите состояние блогов на фронтенде, если нужно
        setBlogs(blogs.map(b => (b.id === returnedBlog.id ? returnedBlog : b)))
      })
      .catch(error => {
        // Обработка ошибок
        console.error(error)
      })
  }
  const replaceInfoBlog = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => (b.id === returnedBlog.id ? returnedBlog : b)))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes('')
      })
      .catch(error => {
        console.log('Error updating blog:', error)
      })
  }


  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleLogoutClick = event => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <Notification message={AddedMessage} />

      {user === null ? (
        <>
          <h1>log in to application</h1>
          {loginForm()}
        </>
      ) : (
        <div>
          <h3>Blogs</h3>
          <p>{user.name} logged in
            <button onClick={handleLogoutClick}>Logout</button></p>
          {blogForm()}
          <h3>Add a new</h3>
          <BlogInfo
            addBlog={addBlog}
            handleLike= {handleLike}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newAuthor={newAuthor}
            setNewAuthor={setNewAuthor}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
            newLikes={newLikes}
            setNewLikes={setNewLikes}
            replaceInfoBlog={replaceInfoBlog}
            blogs={blogs}
            deleteBlog={deleteBlog}
          />
          <Notification message={AddedNegMessage} classTitle="negative-message" />
          <div>
            {sortedBlogs.map(blog => (
              <div key={blog.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Blog key={blog.id} blog={{ title: blog.title }}>
                    <Togglable buttonLabel="show" ref={blogFormRef}>
                      {blog.author}<br />
                      {blog.likes} <button onClick={() => replaceInfoBlog(blog)}>Like</button><br />
                      {blog.url}
                    </Togglable>
                    <button onClick={() => deleteBlog(blog.id, blog)}>remove</button>
                    <Togglable> buttonLabel forgotten... </Togglable>
                  </Blog>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App





