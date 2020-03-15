import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick = {()=>setGood(good + 1)} text = 'good' />
      <Button onClick = {()=>setNeutral(neutral + 1)} text = 'neutral' />
      <Button onClick = {()=>setBad(bad + 1)} text = 'bad' />
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>   
    </div>
  )
}
const Statistics = (props) => {
    const{good, bad, neutral} = props
   
    if(good === 0 && bad === 0 & neutral === 0){
        return(
            <div>
                <h2>Statistics</h2>
                <p>No Feedback given</p>
            </div>
        )
    }
    return(
        
        <div>
        <h2>Statistics</h2>
        
        <table>
        <tbody>
         
        <StatisticsLine text = 'good' value = {good} />
        <StatisticsLine text = 'neutral' value = {neutral} />
        <StatisticsLine text = 'bad' value = {bad} />
        <StatisticsLine text = 'all' value = {good + bad + neutral} />
        <StatisticsLine text = 'average' value = {(good-bad)/(good+bad+neutral)} />
        <StatisticsLine text = 'positive' value = {good/(good+bad+neutral)*100} symbol = '%'/>
        </tbody>
        </table>
        </div>
    )
}

const StatisticsLine = ({text, value, symbol}) => {
    return(
        <tr><td>{text}</td><td>{value}{symbol}</td></tr>
    )
}

const Button = ({onClick, text}) => {

    return(
        <button onClick = {onClick}>{text}</button>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)