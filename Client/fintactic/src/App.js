import logo from './logo.svg';
import './App.css';
import React ,{useState, useEffect}  from 'react';

function App() {
  const [BE_time, setBE_time] = useState(0);
  useEffect(() => {
    fetch('/time').then(res => res.json())
    .then(data => {
      setBE_time(data.time);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This will be our Project !!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Time Comming from Flask Backend : {BE_time} </p>
      </header>
    </div>
  );
}

export default App;