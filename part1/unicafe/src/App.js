import React, { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;
  const positivePercentage = total > 0 ? (good / total) * 100 : 0;

  return (
    <div>
      <h1>Statistics</h1>
      <p style={{ margin: 0 }}>Good {good}</p>
      <p style={{ margin: 0 }}>Neutral {neutral}</p>
      <p style={{ margin: 0 }}>Bad {bad}</p>
      <p style={{ margin: 0 }}>Total {total}</p>
      <p style={{ margin: 0 }}>Average {average}</p>
      <p style={{ margin: 0 }}>Positive {positivePercentage}%</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
    setFeedbackGiven(true);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setFeedbackGiven(true);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    setFeedbackGiven(true);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>

      {feedbackGiven ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;


// import React, { useState } from 'react';
// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)
//   const [total, setTotal] = useState(0)

//   const handleGoodClick = () => {setGood(good + 1); setTotal(total + 1)};
//   const handleNeutralClick = () => {setNeutral(neutral + 1); setTotal(total + 1)}
//   const handleBadClick = () => {setBad(bad + 1); setTotal(total + 1)}

// const Statistics = ({ good, neutral, bad }) => {
//   const total = good + neutral + bad;
//   const average = total > 0 ? (good - bad) / total : 0;
//   const positivePercentage = total > 0 ? (good / total) * 100 : 0}


//   return (
//     <div>
//       <h1>give feedback</h1>
//       <button onClick={handleGoodClick}> good </button>
//       <button onClick={handleNeutralClick}> neutral </button>
//       <button onClick={handleBadClick}> bad </button>
//       <Statistics good={good} neutral={neutral} bad={bad} />

//       <h1>statistics</h1>
//       <p style={{ margin: 0 }}>Good {good}</p>
//       <p style={{ margin: 0 }}>Neutral {neutral}</p>
//       <p style={{ margin: 0 }}> Bad {bad}</p>
//       <p style={{ margin: 0 }}>all {total}</p>
//       <p style={{ margin: 0 }}>average {average}</p>
//       <p style={{ margin: 0 }}>positive {positivePercentage} %</p>
//     </div>
//   )
// }

// export default App
