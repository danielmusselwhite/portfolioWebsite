import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { jarallax } from 'jarallax'; // Import Jarallax library
import ReactTooltip from 'react-tooltip'; 

import { images } from '../../constants';
import './Header.scss';

import { AppWrap, MotionWrap } from '../../wrapper';

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
const Header = () => {

    useEffect(() => {
        // Automatically update the emoji on component mount
        updateEmoji();
        updateEmojiWhiteList();

        // Initialize Jarallax when the component mounts
        if (typeof document !== 'undefined') {
            jarallax(document.querySelectorAll('.jarallax'), {});
        }
    }, []);


    const [emoji, setEmoji] = useState('👋'); // Initial emoji state
    const [emojiWhiteList, setEmojiWhiteList] = useState(''); // Initial emoji whitelist state
    

    // Function to fetch emoji from Go backend
    const updateEmoji = async () => {
        try {
            const response = await fetch('http://localhost:8080/get-emoji');
            const data = await response.json();
            setEmoji(data.emoji);
        } catch (error) {
            console.error('Error fetching emoji:', error);
        }
    };

    // Function to fetch emojiWhitelist from Go backend
    const updateEmojiWhiteList = async () => {
        try {
            const response = await fetch('http://localhost:8080/get-emoji-whitelist');
            const data = await response.json();
            setEmojiWhiteList(data.emojiWhitelist);
        } catch (error) {
            // use wave emoji as default if error occurs
            setEmojiWhiteList('');
            console.error('Error fetching emoji whitelist:', error);
        }
    };

      
    return(
        <div className="app__header app__flex jarallax">

            {/* Div animating from left to opaque, containing name + description badge */}
            <motion.div
                whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                transition={{ duration: 0.8 }}
                className="app__header-info"
            >
                <div className="app__header-badge">
                <div className={"badge-cmp app__flex" + (emojiWhiteList ? " badge-cmp-go" : "")}
                    data-tip 
                    data-for='emojiToolTip'
                    key='emojiToolTip'>
                    <span className="emoji">
                        {emoji}
                    </span>

                    {/* tooltip saying emoji is updateable only appears if the whitelist is not empty (initial go request succeeded) */}
                    {emojiWhiteList && (
                        <ReactTooltip
                            id='emojiToolTip'
                            effect="solid"
                            arrowColor="#fff"
                            className="skills-tooltip"
                        >
                            <p className="p-text" style={{"textAlign":"center"}}>You can update me with a POST request to set_emoji<br/>Valid Emoji's Below:<br/>{emojiWhiteList}</p>
                        </ReactTooltip>
                    )}

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
};

export default AppWrap(
    MotionWrap(Header, 'app__header'),
    'home',
    'app__primarybg',
  );