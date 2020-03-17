import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
        alert(`${newName} is already added to phonebook`)
    }else{

    const newNameObject = {
        name: newName,
        number: newNumber
    }
    
    setPersons(persons.concat(newNameObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNumberChange = (event) => {
     setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> <br />
          number: <input value = {newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p)=><Number key = {p.name} name = {p.name} number = {p.number} />)}
    </div>
  )

}

const Number = (props) => {
    return(
        <div>
            
           <p>{props.name} {props.number}</p>
            
        </div>
    )
} 

export default App