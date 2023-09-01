import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect run, value is now', value)

    if (value) {
      console.log('fetching country data...')
      axios
        .get(`https://restcountries.com/v3/name/${value}`)
        .then(response => {
          const filteredCountries = response.data.map(country => ({
            common: country.name.common,
            official: country.name.official,
            capital: country.capital,
            area: country.area,
            flag: country.flags[0],
            languages: country.languages ? Object.values(country.languages) : []
          }))
          setCountries(filteredCountries)
        })
        .catch(error => {
          console.error('Error fetching country data:', error)
          setCountries([])
        })
    } else {
      setCountries([])
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setValue(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <div>
        {countries.length === 0 ? (
          <div></div>
        ) : (
          countries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            <div>
              {countries.length === 1 ? (
                <div>
                  <h1>{countries[0].common} </h1>
                  <div>Capital: {countries[0].capital}</div>
                  <div>Area: {countries[0].area}</div>
                  <h3>Languages:</h3>
                  <ul>
                    {countries[0].languages.map((language, index) => (
                      <li key={index}>{language}</li>
                    ))}
                  </ul>
                  <img src={countries[0].flag} alt={`${countries[0].common} flag`} />
                </div>  
              ) : (
                countries.map((country, index) => (
                  <div key={index}>
                    <div>{country.common}</div>
                  </div>
                ))
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
  
  
  
}  

export default App




