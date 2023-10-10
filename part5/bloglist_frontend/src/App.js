import { useState, useEffect } from 'react'
import Notification from './Notification'
import blogsService from './blogs';
import './index.css'
import Blog from './components/Blog'

const Filter = ({searchTitle, setSearchTitle }) => {
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




// const Blogs = ({ blogs, deleteBlog }) => {
//   if (blogs.length === 0) {
//     return <div>Loading...</div>
//   }

//   return (
//     <ul>
//       {blogs.map(blog => (
//         <li key={blog.name}>
//           {blog.name} {blog.author}
//           <button onClick={() => deleteBlog(blog.id, blog.name)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   );
// };

const App = () => {
  const [blogs, setBlog] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [AddedMessage, setAddedMessage] = useState(null)
  const [AddedNegMessage, setAddedNegMessage] = useState(null)
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    blogsService
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
  

  const deleteBlog = (id, blogTitle) => {
    if (window.confirm(`Delete '${blogTitle}'?`)) {
      blogsService
        .deleteBlogInfo(id)
          .then(() => {
            setBlog(blogs.filter(blog => blog.id !== id));
          })
          .catch(error => {
            console.log('Error deleting blog:', error);
          });
    }
  };

  const replaceInfoBlog = (title, newAuthor) => {
    const existingBlog = blogs.find(blog => blog.title === title);

    if (window.confirm(`'${title}' is already added to the phonebook, replace the old Author with the new one?`)) {
      if (existingBlog) {
        const updatedBlog = { ...existingBlog, author: newAuthor };
  
        blogsService
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

    blogsService
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
      <h2>Bloglist</h2>
      <Notification message={AddedMessage} />

      <Filter searchTitle={searchTitle} setSearchTitle={setSearchTitle} classTitle="positive-message"  />


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

      <Notification message={AddedNegMessage} classTitle="negative-message"/>
      {/* <Blogs deleteBlog={deleteBlog}/> */}
      <div>
        {blogsToShow.map(blog => 
          <Blog
          title={blog.title}
          blog={blog}
          />
        )}
      </div>

    </div>
  );
};

export default App