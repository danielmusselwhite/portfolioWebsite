import React from 'react';

import './WorkExperience.scss';

import { AppWrap } from '../../wrapper';

const WorkExperience = () => {
    return(
        <div className="WorkExperience">
            <h1>WorkExperience</h1>
            <p>This is the WorkExperience page</p>
        </div>
    );
}

export default AppWrap(WorkExperience, 'workExperience', ['app__flex']);