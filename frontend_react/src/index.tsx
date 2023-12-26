import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'; // importing custom App class
import './index.css'; 

// Putting the React App(../src/App.tsx) inside of the div with id root inside of ../public/index.html
ReactDOM.render(<App />, document.getElementById('root'));