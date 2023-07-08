import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    
    const nameExists = persons.some(person => person.name === newPerson);
  
    if (nameExists) {
      alert(`${newPerson} is already added to the phonebook`);
    } else {
      const newPersonObject = {
        name: newPerson,
        number: newNumber,
        important: Math.random() < 0.5, 
      };
      setPersons(persons.concat(newPersonObject));
      setNewPerson('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search: <input value={searchName} onChange={(event) => setSearchName(event.target.value)} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={(event) => setNewPerson(event.target.value)} />
          <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  );
};

export default App;
