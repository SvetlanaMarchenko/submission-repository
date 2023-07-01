import React, { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {setGood(good + 1); setTotal(total + 1)};
  const handleNeutralClick = () => {setNeutral(neutral + 1); setTotal(total + 1)}
  const handleBadClick = () => {setBad(bad + 1); setTotal(total + 1)}
  

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}> good </button>
      <button onClick={handleNeutralClick}> neutral </button>
      <button onClick={handleBadClick}> bad </button>

      <h1>statistics</h1>
      <p style={{ margin: 0 }}>Good {good}</p>
      <p style={{ margin: 0 }}>Neutral {neutral}</p>
      <p style={{ margin: 0 }}> Bad {bad}</p>
      <p style={{ margin: 0 }}>all {total}</p>
      <p style={{ margin: 0 }}>average {total === 0 ? 0 : (good - bad) / total}</p>
      <p style={{ margin: 0 }}>positive {total === 0 ? 0 : (good * 100) / total} %</p>
    </div>
  )
}

export default App
