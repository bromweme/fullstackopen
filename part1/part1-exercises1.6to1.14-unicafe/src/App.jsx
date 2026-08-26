import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistics = (props) => {
  if(props.all != 0){
  const average = (props.good - props.bad) / props.all
  const positiveRatio = (props.good / props.all) * 100
  const positivePercent = `${positiveRatio.toFixed(2)}%`;
  
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
            <SatisticLine text='good' statistic={props.good}/>
            <SatisticLine text='neutral' statistic={props.neutral}/>
            <SatisticLine text='bad' statistic={props.bad}/>
            <SatisticLine text='all' statistic={props.all}/>
            <SatisticLine text='average' statistic={average}/>
            <SatisticLine text='positive' statistic={positivePercent}/>
        </tbody>
      </table>
    </>
  )}
  else return(<><p>No feedback given</p></>)
}

const SatisticLine = (props) => {
  return(
    <tr>{props.text} {props.statistic}</tr>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    let newGood = good + 1
    setGood(newGood)
    let newAll = all + 1
    setAll(newAll)
  }

  const handleNeutral = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
    let newAll = all + 1
    setAll(newAll)
  }

  const handleBad = () => {
    let newBad = bad + 1
    setBad(newBad)
    let newAll = all + 1
    setAll(newAll)
  }

  const handleAll = () => {
    let newBad = bad + 1
    setBad(newBad)
    let newAll = all + 1
    setAll(newAll)
  }

  return (
    <>
    <h1>give feedback</h1>
    <Button handleClick={handleGood} text='good'/>
    <Button handleClick={handleNeutral} text='neutral'/>
    <Button handleClick={handleBad} text='bad'/>
    <Statistics 
      good={good} 
      neutral={neutral} 
      bad={bad} 
      all={all}
    />
    </>
    
  )
}

export default App
