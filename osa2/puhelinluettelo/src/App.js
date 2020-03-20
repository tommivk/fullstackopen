import React, { useState , useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(()=>{    
      personService.getAll().then(response=>{
      setPersons(response)
    
    })
  },[])

  const addPerson = (event) => {

    event.preventDefault()
  
    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())){
        const p = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        if(p.number === ""){
          const updatedPerson = {
            ...p,
            number: newNumber
           }
          
          showMessage(`Number added for ${p.name}`)
          updateNumber(p.id, updatedPerson)
          setNewNumber('')
          setNewName('')
        }

        else if(window.confirm(`${p.name} is already added to phonebook, replace the old number with new one? `)){
          
          const updatedPerson = {
            ...p,
            number: newNumber
           }
           
          updateNumber(p.id, updatedPerson)
          setNewNumber('')
          setNewName('')
        }
    }else{

    const newNameObject = {
        name: newName,
        number: newNumber
    }
    
    personService.create(newNameObject).then(response => {
      setPersons(persons.concat(response),
      setNewName(''),
      setNewNumber(''),
      showMessage(`Added ${response.name}`)
      )})
    }
  }
  
  const showMessage = (message, time) => {
    setMessage(message)
           setTimeout(() => {
             setMessage(null)
           }, 5000)
  }
  const deletePerson = person => {
     
      if(window.confirm(`Delete ${person.name} ?`)){
      personService.destroy(person.id).then(response => {
      const p = persons.filter(x => x.id !== person.id)
      setPersons(p)
      showMessage(`${person.name} has now been deleted from phonebook`)
      }
    )
  }
}

const updateNumber = (id, updatedObject) => {
    personService.update(id, updatedObject).then(response => {
      
     const filtered = persons.filter((x)=> x.id !== id)
     
     setPersons(filtered.concat(updatedObject).sort((a,b)=>(a.id>b.id)? 1 : (a.id<b.id)? -1 : 0))
     
     showMessage(`Number updated for ${updatedObject.name}`)
    }).catch(error => {
      setErrorMessage(`Information ${updatedObject.name} has already been deleted from server`)
      setTimeout(()=> setErrorMessage(null), 5000)
  })
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
      <Error message = {errorMessage}/>
      <Notification message = {message}/>
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

const Notification = ({message}) => {

  if(message===null){
    return null
  }
  return(
    <div className="message">
      {message}
    </div>
  )

}
const Error = ({message}) => {

  if(message===null){
    return null
  }
  return(
    <div className="error">
      {message}
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
          <ul className = 'note'>
            <li>{name} {number} <button onClick = {remove}>delete</button></li>
            </ul>
        </div>
    )
}

export default App