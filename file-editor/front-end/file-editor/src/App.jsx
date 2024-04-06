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

// Controlled username input
function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Need to handle form data differently in React app
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password
    }

    console.log(userData);

    try {
      const response = await fetch('http://localhost:8080/submit-form', { 
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData), // Can only pass strings in the body?
      });
      
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
        <input 
          type="text"
          id='username'
          value={username}
          onChange={(event) => setUsername(event.target.value)} />
        <br></br>
        <label htmlFor="password">Password: </label>
          <input 
            type="text"
            id='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
        <br></br>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

function App() {

  return (
    <>
      <h1>Enter your details</h1>
      <Form />
    </>
  )
}

export default App
