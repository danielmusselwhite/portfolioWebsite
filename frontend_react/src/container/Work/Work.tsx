import React from 'react';

import './Work.scss';

import { AppWrap } from '../../wrapper';

const Work = () => {
    return(
        <div className="Work">
            <h1>Work</h1>
            <p>This is the Work page</p>
        </div>
    );
}

export default AppWrap(Work, 'work', ['app__flex']);