import React, { useState, useEffect} from 'react';
import { motion } from 'framer-motion';

import images from '../../constants/images';

import './About.scss';

const abouts = [
    { title: "Master of Science in Software Systems Engineering", description: "Talk about my degree from University College London", imgUrl: images.ucl},
    { title: "Bachelor of Science in Computer Science Artificeial Intlligence", description: "Talk about my degree from University of Nottingham", imgUrl: images.uon},
    { title: "Backend Development", description: "Talk abouut technologies I am experienced in and give examples of some backend related projects from uni + work + personal", imgUrl: images.backend},
    { title: "Frontend Development", description: "Talk abouut technologies I am experienced in and give examples of uni + work + personal", imgUrl: images.frontend},
    { title: "Cloud Development", description: "Talk abouut technologies I am experienced in and give examples of some projects from uni + work + personal", imgUrl: images.cloud}
]

const About = () => {
    return(
        <div id="about">
            <h2 className="head-text">
                Inspired To Build <span>Innovative</span> Solutions To <span>Your</span> Problems
            </h2>

            <div className="app__profiles">
                {/* for each about in the abouts array of objects, create and populate a motion div */}
                {abouts.map((about,index) => (
                    <motion.div 

                        

                        whileInView={{ opacity: [0,1],
                        scale: [1.1,1] }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, type: 'tween' }}
                        className="app__profile-item"
                        key={about.title + index}
                    >
                        <img src={about.imgUrl} alt={about.title} />
                        <h2 className="bold-text" style={{ marginTop: 20}}>{about.title}</h2>
                        <p className="p-text" style={{marginTop: 10}}>{about.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
export default About;