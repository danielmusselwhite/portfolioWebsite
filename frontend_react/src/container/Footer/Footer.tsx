import React from 'react';

import './Footer.scss';

import { AppWrap } from '../../wrapper';

const Footer = () => {
    return(
        <div className="Footer">
            <h1>Footer</h1>
            <p>This is the Footer page</p>
        </div>
    );
}

export default AppWrap(Footer, 'footer', ['app__flex']);