import React from 'react';

import './Footer.scss';

import { AppWrap, MotionWrap } from '../../wrapper';

const Footer = () => {
    return(
        <div className="Footer">
            <h1>Footer</h1>
            <p>This is the Footer page</p>
        </div>
    );
}

export default AppWrap(
    MotionWrap(Footer, 'app__footer'),
    'contact',
    'app__primarybg',
  );