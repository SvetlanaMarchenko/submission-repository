import { useState, useEffect } from 'react'


import personService from './persons';


const Filter = ({ searchName, setSearchName }) => {
  return (
    <div>
      Search: <input value={searchName} onChange={(event) => setSearchName(event.target.value)} />
    </div>
  );
};

const PersonInfo = ({ addPerson, newName, setNewName, newNumber, setNewNumber, replaceInfoPerson, persons }) => {
  const handleNumberChange = (event) => {
    const newNumberValue = event.target.value;

      setNewNumber(newNumberValue);
  };

  return (
    <form onSubmit={addPerson}>
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




const Persons = ({ persons, deletePerson }) => {
  if (persons.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {persons.map(person => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {
    console.log(persons); // This will log the updated persons array
  }, [persons]);
  

  const deletePerson = (id, personName) => {
    if (window.confirm(`Delete '${personName}'?`)) {
      personService
        .deletePersonInfo(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
          })
          .catch(error => {
            console.log('Error deleting person:', error);
          });
    }
  };

  const replaceInfoPerson = (name, newNumber) => {
    const existingPerson = persons.find(person => person.name === name);

    if (window.confirm(`'${name}' is already added to the phonebook, replace the old number with the new one?`)) {
      if (existingPerson) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id === returnedPerson.id ? returnedPerson : person)));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.log('Error replacing number:', error);
          });
      }
    }
  };
  
  

  const addPerson = event => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName(''); 
        setNewNumber('');
      })
      .catch(error => {
        console.log('Error adding person:', error);
      });
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchName={searchName} setSearchName={setSearchName} />


      <h3>Add a new</h3>

      <PersonInfo
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        replaceInfoPerson={replaceInfoPerson}
        persons={persons}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} deletePerson={deletePerson}/>

    </div>
  );
};

export default App
