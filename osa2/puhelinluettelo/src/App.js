import React, { useState , useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(()=>{    
      personService.getAll().then(response=>{
      setPersons(response)
    
    })
  },[])

  const addPerson = (event) => {

    event.preventDefault()
 
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
        alert(`${newName} is already added to phonebook`)
    }else{

    const newNameObject = {
        name: newName,
        number: newNumber
    }
    
    personService.create(newNameObject).then(response => {
      setPersons(persons.concat(response),
      setNewName(''),
      setNewNumber('')
      )})
    }
  }

  const deletePerson = person => {
     
      if(window.confirm(`Delete ${person.name} ?`)){
      personService.destroy(person.id).then(response => {
      const p = persons.filter(x => x.id !== person.id)
      setPersons(p)
      }
    )
  }
}


  const handleNumberChange = (event) => {
     setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange={handleFilterChange}/>
      <PersonForm onSubmit = {addPerson} newName={newName} newNumber = {newNumber} 
      handleNameChange = {handleNameChange} 
      handleNumberChange = {handleNumberChange}/>
     
      <h2>Numbers</h2>
      <Numbers persons = {persons} filter = {newFilter} deletePerson = {deletePerson}/>
      
    </div>
  )
  }

const PersonForm = (props) => {
    return(
        <form onSubmit = {props.onSubmit}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} /> <br />
          number: <input value = {props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

const Filter = (props) => {
    
 
    return(
        <div>
            <strong>Filter by name</strong>

            <input value = {props.newFilter} onChange = {props.handleFilterChange} />
           
            <br />
            <br />
        </div>
    )
}

const Numbers = ({persons, filter, deletePerson}) => {
    
    if(filter===""){
    return(
        <div>
            
            {persons.map((p)=><Person key = {p.name} name = {p.name} number = {p.number} remove = {()=> deletePerson(p)}/>)}
        </div>
    )
    }else{
        return(
            <div>
               {persons.filter((x)=>x.name.toLowerCase()
               .includes(filter.toLowerCase())).map((m) => 
               <Person key = {m.name} name = {m.name} number = {m.number} remove = {()=> deletePerson(m)}/>)}
            </div>
        )
    }
} 
const Person = ({name, number, remove}) => {
   
    return(
        <div>
            <p>{name} {number} <button onClick = {remove}>delete</button></p>
        </div>
    )
}

export default App