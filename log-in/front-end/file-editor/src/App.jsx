import { useState } from 'react'
import './App.css'


function Button({setResReceived, setResponseData}) {

  const handleClick = async () => {
    // Click button to send post request
    try {
      const response = await fetch ('http://localhost:8080/post-req', {method: 'POST'});
      if (response.ok) {
        const data = await response.text();
        setResponseData(data);
        setResReceived(true);
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleClick}>POST</button>
  )
}


// Create user, recording username and password in users.json
function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    // Prevent default behaviour
    event.preventDefault();

    // Create JSON object using form data
    const data = {
      username: username,
      password: password
    };

    // Stringify object so it can be sent to server
    const dataString = JSON.stringify(data);

    // Make fetch request to server
    // This is all that is needed to send data to server
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: dataString
      });
  
      // The following is if I want a response sent back to the client
      if (response.ok) {
        console.log('User data submitted successfully')
      } else {
        console.error('Error submitting user data')
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
        <input 
          type="text" 
          id='username' 
          value={username} 
          onChange={(event) => {setUsername(event.target.value)}}
        />
      <br />
      <label htmlFor="password">Password: </label>
        <input 
          type="text" 
          id='password'
          value={password}
          onChange={(event) => {setPassword(event.target.value)}} />
      <br />
      <button>Register</button>
    </form>
  )
}

function LogIn() {
  // Look for username in users.json file and confirm password is correct

  // username and password are controlled variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      "username": username,
      "password": password
    }

    try {
      const response = await fetch('http://localhost:8080/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      // if (response.ok) {
      //   const responseData = await response.text();
      //   console.log(responseData);
      // }
    } catch (error) {
      console.error('Fetch error:', error);
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
        <button type='submit'>Log In</button>
      </form>
    </>
  )
}

function App() {
  const [responseData, setResponseData] = useState('');
  const [resReceived, setResReceived] = useState(false);

  return (
    <>
      <div className='post-button' style={{border: '1px solid black', marginBottom: '20px'}}>
        <Button 
          setResReceived={setResReceived}
          setResponseData={setResponseData} 
        />
        <div>{(resReceived) ? responseData : 'Click to make a request.'}</div>
      </div>
      <div className='form' style={{border: '1px solid black', padding: '10px', marginBottom: '20px'}}>
          <Register />
      </div>
      <div className='form' style={{border: '1px solid black', padding: '10px'}}>
          <LogIn />
      </div>
    </>
  )
}

export default App
