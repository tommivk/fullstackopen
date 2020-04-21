import React from 'react';
import ReactDOM from 'react-dom';
import { CoursePart } from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App: React.FC = () => {
  const courseName = 'Half Stack application development';

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
  ];
  courseParts.forEach((part) => {
    switch (part.name) {
      case 'Fundamentals':
        break;
      case 'Using props to pass data':
        break;
      case 'Deeper type usage':
        break;
      case 'New part':
        break;
      default:
        return assertNever(part);
    }
  });

  console.log(courseParts);
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  console.log(courseParts);

  return (
    <div>
      {courseParts.map((p) => (
        <div key={p.name}>
          <Part key={p.name} coursePart={p}></Part>
          <p></p>
        </div>
      ))}
    </div>
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <div>
          <strong>name:</strong> {coursePart.name}
          <div>
            <strong>description:</strong> {coursePart.description}
          </div>
          <div>
            <strong>exerciseCount:</strong> {coursePart.exerciseCount}
          </div>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <strong>name:</strong> {coursePart.name}
          <div>
            <strong>groupProjectCount:</strong> {coursePart.groupProjectCount}
          </div>
          <div>
            <strong>exerciseCount:</strong> {coursePart.exerciseCount}
          </div>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <strong>name:</strong> {coursePart.name}
          <div>
            {' '}
            <strong>description:</strong> {coursePart.description}
          </div>
          <div>
            {' '}
            <strong>exerciseCount:</strong> {coursePart.exerciseCount}
          </div>
          <div>
            {' '}
            <strong>exerciseSubmissionLink:</strong>{' '}
            {coursePart.exerciseSubmissionLink}
          </div>
        </div>
      );
    case 'New part':
      return (
        <div>
          <strong>name:</strong> {coursePart.name}
          <div>
            {' '}
            <strong>description:</strong> {coursePart.description}
          </div>
          <div>
            {' '}
            <strong>exerciseCount:</strong> {coursePart.exerciseCount}
          </div>
          <div>
            {' '}
            <strong>url:</strong> {coursePart.url}
          </div>
        </div>
      );
    default:
      return null;
  }
};

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const exercises = courseParts.reduce((a, b) => a + b.exerciseCount, 0);
  return (
    <div>
      <p>Number of exercises {exercises}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
