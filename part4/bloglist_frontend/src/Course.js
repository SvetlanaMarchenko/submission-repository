import React from 'react';

const Course = (props) => {
  const { name, parts } = props.course;

  const Header = () => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    );
  };

  const Content = () => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };

  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    );
  };

  const Total = () => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
      <div>
        <p>
          <strong>Total of {totalExercises} exercises</strong>
        </p>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
};

export default Course;
