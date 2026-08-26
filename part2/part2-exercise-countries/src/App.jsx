import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Country = (country) => {
  console.log(country)  
  return(
      <>{country.name.official}</>
    )
}

const SearchResults = (searchResults) => {
  if(searchResults.length == 1) return(<Country country={searchResults}/>)
  if(searchResults.length > 10) return(<p>Too many matches, specify another filter</p>)
  if (searchResults.length > 1) return(
    console.log(searchResults),
    <ul>
      {searchResults.map((country) => (
        <li key={country.name.official}>{country.name.official}</li>
      ))}
    </ul>
  )
}




function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  // might be wise to make this 
  useEffect(() => {
    countryService
      .getAll()
      .then(initCountries => {
        console.log(initCountries)
        setCountries(initCountries)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])


  const handleSearchTerm = (event) => {
    const term = event.target.value
    setSearchTerm(event.target.value)
    const filteredCountries = countries.filter((country) => country.name.official.toLowerCase().includes(term.toLowerCase()))
    console.log(filteredCountries)
    setSearchResults(filteredCountries)
  }

  return (
    <div>
      <span>find countries </span>  
      <input
      value={searchTerm}
      onChange={handleSearchTerm}
      />
      <SearchResults searchResults={searchResults}/>
    </div>
  )
}

export default App
