import { useState, useEffect } from 'react'
import blogService from './blogs';
import './index.css'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'

const Filter = ({ searchTitle, setSearchTitle }) => {
  return (
    <div>
      filter shown with <input value={searchTitle} onChange={(event) => setSearchTitle(event.target.value)} />
    </div>
  );
};

const BlogInfo = ({ addBlog: addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, replaceInfoBlog: replaceInfoBlog, blogs }) => {
  const handleAuthorChange = (event) => {
    const newAuthorValue = event.target.value;
    setNewAuthor(newAuthorValue);
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
      </div>
      <div>
        author: <input value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [blogs, setBlog] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
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
        setBlog(response);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {
    console.log(blogs); // This will log the updated blogs array
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  

  const deleteBlog = (id, blogTitle) => {
    if (window.confirm(`Delete '${blogTitle}'?`)) {
      blogService
        .deleteBlogInfo(id)
          .then(() => {
            setBlog(blogs.filter(blog => blog.id !== id));
          })
          .catch(error => {
            console.log('Error deleting blog:', error);
          });
    }
  }

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
    <form onSubmit={addBlog}>
      <input
        value={newTitle}
        // onChange={handleTitleChange}
      />
      <button type="submit">save</button>
    </form>  
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const replaceInfoBlog = (title, newAuthor) => {
    const existingBlog = blogs.find(blog => blog.title === title);

    if (window.confirm(`'${title}' is already added to the phonebook, replace the old Author with the new one?`)) {
      if (existingBlog) {
        const updatedBlog = { ...existingBlog, author: newAuthor };
  
        blogService
          .update(existingBlog.id, updatedBlog)
          .then(returnedBlog => {
            setBlog(blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog)));
            setNewTitle('');
            setNewAuthor('');
          })
          .catch(error => {
            console.log('Error replacing author:', error);
          });
      }
    }
  };
  
  

  const addBlog = event => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor
    };

    blogService
      .create(newBlog)
      .then(response => {
        setBlog(blogs.concat(response));
        setAddedMessage(
          `Added ${newBlog.title}`
        )
        setTimeout(() => {
          setAddedMessage()
        }, 5000)
        setNewTitle(''); 
        setNewAuthor('');
      })
      .catch(error => {
        console.log(error.response.data.error);
        setAddedNegMessage(
          error.response.data.error
        )
        setTimeout(() => {
          setAddedNegMessage()
        }, 5000)
      });
  };

  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.important)

  return (

    <div>
  
      <Notification message={AddedMessage} />

      {user === null ?
        loginForm() :
        blogForm()
      }
      <Filter searchTitle={searchTitle} setSearchTitle={setSearchTitle} classTitle="positive-message" />
      <h3>Add a new</h3>
      <BlogInfo
        addBlog={addBlog}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        replaceInfoBlog={replaceInfoBlog}
        blogs={blogs}
      />
      <h3>Blogs</h3>
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
  );
    
}


export default App
