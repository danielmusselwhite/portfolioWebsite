import React from 'react';

import './Skills.scss';

import { AppWrap } from '../../wrapper';

const Skills = () => {
    return(
        <div className="Skills">
            <h1>Skills</h1>
            <p>This is the Skills page</p>
        </div>
    );
}

export default AppWrap(Skills, 'skills', ['app__skills']);