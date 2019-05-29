import React from 'react';
import './App.css';
import SearchInput from './components/SearchInput'

function App() {
  return (
    <div >
      <h1 className='title'>Compare your Air</h1>
      <p className='headline'>
         Compare the air quality between cities in the UK.<br/>
         Select cities to compare using the search tool below.
      </p>
      <SearchInput/>
    </div>
  );
}

export default App;
