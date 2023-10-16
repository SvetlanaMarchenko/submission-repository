import { useState, useEffect, useRef } from 'react'
import blogService from './blogs';
import './index.css'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'




const BlogInfo = ({addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl, replaceInfoBlog, blogs }) => {
  const handleAuthorChange = (event) => {
    const newAuthorValue = event.target.value;
    setNewAuthor(newAuthorValue);
  };
};

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
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
        setBlogs(response);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  
  // const deleteBlog = (id, blogTitle) => {
  //   if (window.confirm(`Delete '${blogTitle}'?`)) {
  //     blogService
  //       .deleteBlogInfo(id)
  //         .then(() => {
  //           setBlogs(blogs.filter(blog => blog.id !== id));
  //         })
  //         .catch(error => {
  //           console.log('Error deleting blog:', error);
  //         });
  //   }
  // }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
    )
  
    const blogsToShow = showAll
      ? blogs
      : blogs.filter(blog => blog.important)

      
      

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

  const replaceInfoBlog = (title, newAuthor, url) => {
    const existingBlog = blogs.find(blog => blog.title === title);

    if (window.confirm(`'${title}' is already added to the phonebook, replace the old Author with the new one?`)) {
      if (existingBlog) {
        const updatedBlog = { ...existingBlog, author: newAuthor };
  
        blogService
          .update(existingBlog.id, updatedBlog)
          .then(returnedBlog => {
            setBlogs(blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog)));
            setNewTitle('');
            setNewAuthor('');
            setNewUrl('');
          })
          .catch(error => {
            console.log('Error replacing author:', error);
          });
      }
    }
  };
  

  

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleLogoutClick = event => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
  }

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
<<<<<<< HEAD
          {blogForm()}
=======
>>>>>>> origin/main
          <h3>Add a new</h3>
          <BlogInfo
            addBlog={addBlog}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newAuthor={newAuthor}
            setNewAuthor={setNewAuthor} 
            newUrl={newUrl}
            setNewUrl={setNewUrl}
            replaceInfoBlog={replaceInfoBlog}
            blogs={blogs}
          />
          <Notification message={AddedNegMessage} classTitle="negative-message" />
          {/* <Blogs deleteBlog={deleteBlog}/> */}
          <div>
            {blogsToShow.map(blog => 
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
  



export default App





