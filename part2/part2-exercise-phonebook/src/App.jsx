import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const [newMessage, setNewMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const refreshMessage = () => setTimeout(() => {setNewMessage(null); setIsError(false);}, 5000)

  useEffect(() => {
    personService
      .getAll()
      .then(initPersons => {
        const addedPerson = initPersons.concat({'name': 'Jimmy Skills', 'number' : '5131234587' })
        setPersons(addedPerson)
      })
      .catch(error => {
        setNewMessage(`An error has occured: ${error}`)
        console.log(error)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName != '' && newNumber != '') {
      const isAlreadyEntered = persons.find((person)=> person.name === newName)
      console.log(isAlreadyEntered)
      if (isAlreadyEntered == undefined) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1
        }

        personService
          .create(personObject)
          .then(newPerson => {
            setIsError(false)
            setNewMessage(`Added ${newPerson.name}`)
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
            refreshMessage()
          })
          .catch(error => {
            setIsError(true)
            setNewMessage(`An error has occured: ${error}`)
            refreshMessage()
          })

      } else {
        updatePerson(isAlreadyEntered)
      }
    } else {
      alert('Please provide input in all fields')
    }
  }

  const removePerson = (id) => {
    const personToDelete =  persons.find(person => person.id === id)
    const answer = confirm(`Delete ${personToDelete.name}?`)
    if (answer) {
    personService
      .remove(id)
      .then(() => {
        const updatedArray = persons.filter(person => person.id != id)
        setPersons(updatedArray)
        setNewName('')
        setNewNumber('')
        refreshMessage()
      })
      .catch(() => {
        setIsError(true)
        setNewMessage(`Information of ${personToDelete.name} has already been removed from server`)
        refreshMessage()
      })
    } 
  }

  const updatePerson = (selectedPerson) => {
    const answer = confirm(`${selectedPerson.name} is already added to phonebook, replace the old number with a new one?`)
    if(answer) {
      const updatedPerson = {...selectedPerson, number: newNumber}
      personService
        .update(selectedPerson.id, updatedPerson)
        .then(returnedPerson => {
          const updatedPersonIndex = persons.findIndex(x => x.id == returnedPerson.id)
          setPersons(persons.with(updatedPersonIndex, returnedPerson))
          setIsError(false)
          setNewMessage(`Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`)
          setNewName('')
          setNewNumber('')
          refreshMessage()
      })
        .catch((error) => {
          setIsError(true)
          setNewMessage(`An error has occured: ${error}`)
          refreshMessage()
      })
    }
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} error={isError}/>
      <Filter handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete ={removePerson}/>
    </div>
  )
}

export default App