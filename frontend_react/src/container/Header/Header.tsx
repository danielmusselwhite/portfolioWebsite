import React from 'react';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Header.scss';

// scaleVariants constant used for animating the circles containing the programming languages
const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

// Header component
const Header = () => (
    <div id="home" className="app__header app__flex">

        {/* Div animating from left to opaque, containing name + description badge */}
        <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
            className="app__header-info"
        >
            <div className="app__header-badge">
            <div className="badge-cmp app__flex">
                <span>👋</span>
                <div style={{ marginLeft: 20 }}>
                <p className="p-text">Hello, I am</p>
                <h1 className="head-text">Daniel</h1>
                </div>
            </div>

            <div className="tag-cmp app__flex">
                <p className="p-text">Software Engineer</p>
                <p className="p-text">FullStack Developer</p>
                <p className="p-text">BackEnd Specialist</p>
            </div>

            <div className="tag-cmp app__flex">
                <p className="p-text">MSc in Software Engineering</p>
                <p className="p-text">BSc in Artificial Intelligence</p>
            </div>

            </div>
        </motion.div>



        {/* motion div fading into view, containing profile image + circle */}
        {/* children of div will fade in after a further delay */}
        <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.8, delayChildren: 0.8 }}
            className="app__header-img"
        >
            <img src={images.profile} alt="profile_bg" />
            <motion.img
            whileInView={{ scale: [0, 1] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            src={images.circle}
            alt="profile_circle"
            className="overlay_circle"
            />
        </motion.div>


        {/* motion div containing the circles of programming languages I have most commonly used */}
        <motion.div
            variants={scaleVariants}
            whileInView={scaleVariants.whileInView}
            className="app__header-circles"
        >
            {/* use map lambda function to iterate through array of images, and display each image in a div with a circular background */}
            {[images.python, images.cs, images.java].map((circle, index) => (
            <div className="circle-cmp app__flex" key={`circle-${index}`}>
                <img src={circle} alt="profile_bg" />
            </div>
            ))}
        </motion.div>
    </div>
);

export default Header;
