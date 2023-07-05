const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }
  
  const Course = (props) => {
    console.log(Course, props)
    return (
      <div>
          <p>
            {props.id}
          </p>
      </div>
    )
  }

    const Header = (props) => {
      console.log("header:", props)
      return (
        <div>
          <h1>{props.course}</h1>
        </div>
      )
    }

    const Content = (props) => {
      return (
        <div>
          {props.parts.map((part, index) => (
            <Part key={index} name={part.name} exercises={part.exercises} />
          ))}
        </div>
      );
    };

      const Part = (props) => {
        console.log(props)
        return (
          <p>
            {props.name} {props.exercises}
          </p>
        );
      };



      // const Total = (props) => {
      //   console.log(props)
      //   return (
      //     <div>
      //       <p>
      //         Number of exercises {props.exercises}
      //       </p>
      //     </div>
      //   )
      // }



        return (
          <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Course course={course} />
            {/* <Total exercises={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} /> */}
          </div>
        );
      };

export default App;
