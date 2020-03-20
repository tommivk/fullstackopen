import React,{useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const App = ()=>{
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState()
    const [weather, setWeather] = useState([])
    const [ country, setCountry ] = useState('Helsinki')

        
        useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data)
            
        })
    },[])

   
    useEffect (() => { 
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`).then(response => {
             setWeather(response.data)
             
         })
        },[country])
   
    
   
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    const changeCountry = (c) =>{
        setCountry(c)
    }
   
    
    return(
        <div>
            <FilterForm onChange = {handleFilterChange}/>
            <Filter setFilter = {setFilter} filterValue = {filter} countries = {countries} changeCountry = {changeCountry} weather = {weather}/>
        </div>
    )
}

const WeatherInfo = ({weather}) => {
    
    
    return(
        <div>
            <p>Temperature: {weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons[0]} alt='pic'></img>
        <p>Wind: {weather.current.wind_speed} km/s Wind direction: {weather.current.wind_dir}</p>
        <p>Humidity: {weather.current.humidity}%</p>
        </div>
    )
}
const Filter = ({filterValue, countries, setFilter, changeCountry, weather}) => {
    let filtered = countries
    if(filterValue){
    filtered = countries.filter((x)=>x.name.toLowerCase().includes(filterValue.toLowerCase()))
}
   
    
    if(filtered.length===1){
        
        return(
            
            <ShowSingleCountry country = {filtered[0]} changeCountry = {changeCountry} weather = {weather} />
        )
    }
    if(filtered.length>10){
        return(
            <div>Too many matches, specify another filter</div>
        )
    }
    if(filterValue && filtered.length===0){
        return(
            <div>No matches</div>
        )
    }

    
    if(filterValue){
        return(
            <div>
                {countries.filter((x)=>x.name.toLowerCase().includes(filterValue.toLowerCase())).map(
                    (c)=> <ShowNames setFilter = {setFilter} key = {c.name} name = {c.name}/>
                )}
            </div>
        )
    }
    return(
        <div>
        {countries.map((c)=> <ShowNames setFilter = {setFilter} key = {c.name}name = {c.name}/>)}
        </div>
    )

}

const FilterForm = (props) => {
    
    return(
        <div>
            <form>
                Find countries  <input onChange = {props.onChange}></input>
                <br/>
                <br/>
                
            </form>
        </div>
    )
}

const ShowNames = (props) => {

    return(
        <div>
            {props.name} <button onClick = {()=> props.setFilter(props.name)}>show</button> 
        </div>
    )
}


const ShowSingleCountry = ({country, weather, changeCountry}) => {
     
    return(
        <div>
            {useEffect((()=>{
      changeCountry(country.capital)
  }),[country, changeCountry])
    }
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languages</h3>
                <ul>
                 {country.languages.map((x)=> <li key= {x.name}>{x.name}</li>)}
                </ul>
            <img src = {country.flag} alt = 'flag' height = '112px' width = '200px'></img>

            <WeatherInfo weather = {weather}/>
            
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

