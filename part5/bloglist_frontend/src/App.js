import { useState, useEffect } from 'react'
import Notification from './Notification'
import blogsService from './blogs';
import './index.css'

const Filter = ({searchTitle, setSearchTitle }) => {
  return (
    <div>
      filter shown with <input value={searchTitle} onChange={(event) => setSearchTitle(event.target.value)} />
    </div>
  );
};

const BlogInfo = ({ addBlog: addBlog, newTitle, setNewTitle, newNumber, setNewNumber, replaceInfoBlog: replaceInfoBlog, blogs }) => {
  const handleNumberChange = (event) => {
    const newNumberValue = event.target.value;

      setNewNumber(newNumberValue);
  };

  return ( 
    <form onSubmit={addBlog}>
      <div>
        title: <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
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
//           {blog.name} {blog.number}
//           <button onClick={() => deleteBlog(blog.id, blog.name)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   );
// };

const App = () => {
  const [blogs, setBlog] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [AddedMessage, setAddedMessage] = useState(null)
  const [AddedNegMessage, setAddedNegMessage] = useState(null)

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

  const replaceInfoBlog = (title, newNumber) => {
    const existingBlog = blogs.find(blog => blog.title === title);

    if (window.confirm(`'${title}' is already added to the phonebook, replace the old number with the new one?`)) {
      if (existingBlog) {
        const updatedBlog = { ...existingBlog, number: newNumber };
  
        blogsService
          .update(existingBlog.id, updatedBlog)
          .then(returnedBlog => {
            setBlog(blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog)));
            setNewTitle('');
            setNewNumber('');
          })
          .catch(error => {
            console.log('Error replacing number:', error);
          });
      }
    }
  };
  
  

  const addBlog = event => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      number: newNumber
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
        setNewNumber('');
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
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        replaceInfoBlog={replaceInfoBlog}
        blogs={blogs}
      />

      <h3>Numbers</h3>

      <Notification message={AddedNegMessage} classTitle="negative-message"/>
      {/* <Blogs deleteBlog={deleteBlog}/> */}

    </div>
  );
};

export default App