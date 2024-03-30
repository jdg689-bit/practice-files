import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      // .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error(`Error fetching message: ${error}`));
  }, []);

  return (
    <div className='App'>
      <h1>New message from the backend: </h1>
      <p>{message}</p>

    </div>
  );

}

export default App
