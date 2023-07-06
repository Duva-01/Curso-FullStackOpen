import React from 'react';
import ReactDOM from 'react-dom';
import Course from './modulo/Course';

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
      ],
    },
    {
      id: 2,
      name: 'Introduction to JavaScript',
      parts: [
        {
          name: 'Variables and Data Types',
          exercises: 5,
          id: 1,
        },
        {
          name: 'Functions',
          exercises: 8,
          id: 2,
        },
        {
          name: 'Arrays',
          exercises: 12,
          id: 3,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
