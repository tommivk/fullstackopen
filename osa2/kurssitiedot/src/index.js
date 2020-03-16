import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {

    return(
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Content = ({parts}) => {
 
    return(
        <div>
           
            {parts.map((p) => 
             <Part key = {p.id} name = {p.name} exercises = {p.exercises} />
             )}
             
        </div>
    )
}
const Part = ({name, exercises}) => {
  
    return(
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}

const Total = ({parts}) => {

    return(
        <div>
            <strong>Total of {parts.reduce((sum, {exercises}) => sum + exercises, 0)} exercises</strong>
          
        </div>
    )
}

const Course = ({course}) => {

    return(
        <div>
            <Header course = {course}/>
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
        </div>
    )
}

const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
   
    return (
      <div>
        {courses.map((c) => <Course key = {c.id} course = {c} />)}
       
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))