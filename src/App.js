import React from 'react';
import './App.css';
import SearchInput from './components/SearchInput'

function App() {
  return (
    <div className="App">
      <h1>Compare your Air</h1>
      <p>Compare the air quality between cities in the UK.</p>
      <p>Select cities to compare using the search tool below.</p>
      <SearchInput/>
    </div>
  );
}

export default App;
