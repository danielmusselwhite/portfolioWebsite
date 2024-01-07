import React from 'react';

import './Testimonials.scss';

import { AppWrap } from '../../wrapper';

const Testimonials = () => {
    return(
        <div className="Testimonials">
            <h1>Testimonials</h1>
            <p>This is the Testimonials page</p>
        </div>
    );
}

export default AppWrap(Testimonials, 'testimonials', ['app__flex']);