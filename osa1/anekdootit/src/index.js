import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)]) 


  const randomNumber = () => Math.ceil(Math.random()*anecdotes.length-1) 

  const setVote = () => {
     const copy = [...points]
     copy[0][selected] +=1;
     setPoints(copy) 
  }
 
  return (
    <div>
      <h1>Anectode of the day</h1>
      {props.anecdotes[selected]} <br />
      has {points[0][selected]} votes <br />
      <button onClick = {setVote}>Vote</button>
      <button onClick = {()=>setSelected(randomNumber)}>Next anecdote</button>
      <MostVoted points = {points} anectodes = {props.anecdotes} />
    </div>
  )
}


const MostVoted = ({points, anectodes}) => {
  
    let mostVotes = 0

    for(let i=0; i<points[0].length;i++){  
        if(points[0][i]>points[0][mostVotes]){
            mostVotes = i
        }
    }
    return(
        <div>
            <h2>Anecdote with the most votes</h2>
             {anecdotes[mostVotes]} <br />
             Has {points[0][mostVotes]} votes
        </div>
    )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)