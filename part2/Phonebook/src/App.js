
import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newPerson, setNewPerson] = useState('')

  const personsToShow = persons

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newPerson,
      important: Math.random() < 0.5,
    }
  
    setPersons(persons.concat(newPersonObject))
    setNewPerson('')
  }

  return (
    <div>
      <div>debug: {newPerson}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={(event) => setNewPerson(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App
