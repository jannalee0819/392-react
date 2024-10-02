import { useState } from 'react';
import './App.css';


const schedule = {
  title: "CS Courses for 2018-2019"
};


const App = () => {

  return (
      <header>
        <h1>{schedule.title}</h1>
      </header>
  );
};

export default App;
