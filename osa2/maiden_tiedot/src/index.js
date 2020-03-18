import React,{useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const App = ()=>{
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState()

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data)
            
        })
    },[])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    return(
        <div>
            <FilterForm onChange = {handleFilterChange}/>
            <Filter filterValue = {filter} countries = {countries}/>
   
        </div>
    )
}

const Filter = ({filterValue, countries}) => {
    let filtered = countries
    if(filterValue){
    filtered = countries.filter((x)=>x.name.toLowerCase().includes(filterValue.toLowerCase()))
}
    console.log(filtered)
    
    if(filtered.length===1){
        return(
            <ShowSingleCountry country = {filtered[0]}/>
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
                    (c)=> <ShowNames key = {c.name} name = {c.name}/>
                )}
            </div>
        )
    }
    return(
        <div>
        {countries.map((c)=> <ShowNames key = {c.name}name = {c.name}/>)}
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
            {props.name}
        </div>
    )
}

const ShowSingleCountry = ({country}) => {
    
    return(
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languages</h3>
                <ul>
                 {country.languages.map((x)=> <li key= {x.name}>{x.name}</li>)}
                </ul>
            <img src = {country.flag} alt = 'flag' height = '112px' width = '200px'></img>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

