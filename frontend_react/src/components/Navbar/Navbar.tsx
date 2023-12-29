import React, { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import {useWindowResize, arrayOfSections} from '../../utils/utils'; // Import the custom hook (event listener) for window resize event
import { images } from '../../constants';
import './Navbar.scss';

const Navbar = () => {
    const [toggle, setToggle] = useState(false); // Toggle for hamburger menu

    // Set initialX to value of useWindowResize() (custom hook listening for window resize event)
    // This will update the value of initialX when the window is resized
    const initialX = useWindowResize(); // used to animate the menu, sliding in from the left ensuring it starts from correct size
    
    // Main code of NavBar
    return(
        <nav className="app__navbar">

            {/* The default navbar (eg if screen is wide enough) */}
            <div className="app__navbar-logo">
                <img src={images.logo} alt="logo" />
            </div>

            <ul className="app__navbar-links">
                {arrayOfSections.map((item) => (
                    <li className="app__flex p-text" key={`link-${item}`}>
                    <div />
                    {/* link to scroll to a subsection of the page */}
                    <a href={`#${item}`}>{item}</a> 
                    </li>
                    ))}
            </ul>

            
            {/* The hamburger menu (if screen is too narrow eg for mobiles) */}
            <div className="app__navbar-menu">
                <HiMenuAlt4 onClick={() => setToggle(true)} /> {/*Toggle True when hamburger is clicked*/}

                {/* When toggle is true (hamburger has been clicked), show the menu */}
                {toggle && (

                /*Animate the menu, scrolling in*/
                <motion.div 
                    initial={{ x: initialX }} // Initial position outside the view
                    animate={{ x: 0 }} // Animation to slide in
                    transition={{ duration: 0.5, ease: 'easeIn' }}
                >
                    <HiX onClick={() => setToggle(false)} /> {/*Toggle False when X button is clicked*/}
                    <ul> {/*populating list of menu items*/}
                    {arrayOfSections.map((item) => (
                        <li key={item}>
                        {/* link to scroll to a subsection of the page */}
                        <a href={`#${item}`} onClick={() => setToggle(false)}> {/*Toggle False when menu item is clicked, as we don't want menu to still appear after navigating*/}
                            {item}
                        </a>
                        </li>
                    ))}
                    </ul>
                </motion.div>
                )}
            </div>

        </nav>
    );
};

export default Navbar;