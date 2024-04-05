import { useState } from 'react'
import './App.css'


function Button() {
  const handleClick = async () => {
    // Send request to backend to create a log file if it doesn't exist
    try {
      const response = await fetch('http://localhost:8080/createFile', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleClick}>Click me</button>
  )
}


function App() {

  return (
    <>
      <h1>Click the button to log the current time</h1>
      <Button />
    </>
  )
}

export default App
