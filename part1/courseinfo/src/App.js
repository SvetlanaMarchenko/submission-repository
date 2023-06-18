const Header = (props) => {
  console.log("header:", props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.name1} exercises={props.exercises1} />
      <Part name={props.name2} exercises={props.exercises2} />
      <Part name={props.name3} exercises={props.exercises3} />
    </div>
  );
};

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Number of exercises {props.exercises}
      </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content
        name1={parts[0].name}
        exercises1={parts[0].exercises} 
        name2={parts[1].name}
        exercises2={parts[1].exercises}
        name3={parts[2].name}
        exercises3={parts[2].exercises}
      />

      <Total exercises={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  );
};

export default App;
