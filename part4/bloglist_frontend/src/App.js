import { useState, useEffect } from 'react'
import Notification from './Notification'
import bloglistService from './bloglists';
import './index.css'

const Filter = ({ searchName, setSearchName }) => {
  return (
    <div>
      filter shown with <input value={searchName} onChange={(event) => setSearchName(event.target.value)} />
    </div>
  );
};

const BloglistInfo = ({ addBloglist, newName, setNewName, newNumber, setNewNumber, replaceInfoBloglist, bloglists }) => {
  const handleNumberChange = (event) => {
    const newNumberValue = event.target.value;

      setNewNumber(newNumberValue);
  };

  return (
    <form onSubmit={addBloglist}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
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




const Bloglists = ({ bloglists, deleteBloglist }) => {
  if (bloglists.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <ul>
      {bloglists.map(bloglist => (
        <li key={bloglist.name}>
          {bloglist.name} {bloglist.number}
          <button onClick={() => deleteBloglist(bloglist.id, bloglist.name)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [bloglists, setBloglist] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [AddedMessage, setAddedMessage] = useState(null)
  const [AddedNegMessage, setAddedNegMessage] = useState(null)

  useEffect(() => {
    bloglistService
      .getAll()
      .then(response => {
        setBloglist(response);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {
    console.log(bloglists); // This will log the updated bloglists array
  }, [bloglists]);
  

  const deleteBloglist = (id, bloglistName) => {
    if (window.confirm(`Delete '${bloglistName}'?`)) {
      bloglistService
        .deleteBloglistInfo(id)
          .then(() => {
            setBloglist(bloglists.filter(bloglist => bloglist.id !== id));
          })
          .catch(error => {
            console.log('Error deleting bloglist:', error);
          });
    }
  };

  const replaceInfoBloglist = (name, newNumber) => {
    const existingBloglist = bloglists.find(bloglist => bloglist.name === name);

    if (window.confirm(`'${name}' is already added to the phonebook, replace the old number with the new one?`)) {
      if (existingBloglist) {
        const updatedBloglist = { ...existingBloglist, number: newNumber };
  
        bloglistService
          .update(existingBloglist.id, updatedBloglist)
          .then(returnedBloglist => {
            setBloglist(bloglists.map(bloglist => (bloglist.id === returnedBloglist.id ? returnedBloglist : bloglist)));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.log('Error replacing number:', error);
          });
      }
    }
  };
  
  

  const addBloglist = event => {
    event.preventDefault();
    const newBloglist = {
      name: newName,
      number: newNumber
    };

    bloglistService
      .create(newBloglist)
      .then(response => {
        setBloglist(bloglists.concat(response));
        setAddedMessage(
          `Added ${newBloglist.name}`
        )
        setTimeout(() => {
          setAddedMessage()
        }, 5000)
        setNewName(''); 
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

  const bloglistsToShow = bloglists.filter(bloglist =>
    bloglist.name.toLowerCase().includes(searchName.toLowerCase())
  );


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={AddedMessage} />

      <Filter searchName={searchName} setSearchName={setSearchName} className="positive-message"  />


      <h3>Add a new</h3>

      <BloglistInfo
        addBloglist={addBloglist}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        replaceInfoBloglist={replaceInfoBloglist}
        bloglists={bloglists}
      />

      <h3>Numbers</h3>

      <Notification message={AddedNegMessage} className="negative-message"/>
      <Bloglists bloglists={bloglistsToShow} deleteBloglist={deleteBloglist}/>

    </div>
  );
};

export default App