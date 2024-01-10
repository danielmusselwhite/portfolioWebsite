import React from 'react'

import { About, Header, Footer, Work, Skills, WorkExperience} from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => {
    return(
        <div className="app">
            <Navbar />
            <Header />
            <About />
            <Work />
            <Skills />
            <WorkExperience />
            <Footer />
        </div>
    );
}

export default App;