import React from 'react'

const Course = ({course}) => {

    return(
        <div>
            <Header course = {course}/>
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
        </div>
    )
}


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


export default Course