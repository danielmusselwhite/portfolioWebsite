import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import images from '../../constants/images';
import './About.scss';
import {useWindowResize} from '../../utils/utils'; // Import the custom hook (event listener) for window resize event

const abouts = [
    { title: "Master of Science in Software Systems Engineering", description: "Talk about my degree from University College London", imgUrl: images.ucl},
    { title: "Bachelor of Science in Computer Science Artificeial Intlligence", description: "Talk about my degree from University of Nottingham", imgUrl: images.uon},
    { title: "Backend Development", description: "Talk abouut technologies I am experienced in and give examples of some backend related projects from uni + work + personal", imgUrl: images.backend},
    { title: "Frontend Development", description: "Talk abouut technologies I am experienced in and give examples of uni + work + personal", imgUrl: images.frontend},
    { title: "Cloud Development", description: "Talk abouut technologies I am experienced in and give examples of some projects from uni + work + personal", imgUrl: images.cloud}
];

const About = () => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null); // selectedItem is the index of the selected item in the abouts array of objects
    const profilesRef = useRef<HTMLDivElement>(null); // Ref to the div containing the abouts cards, allowing us to dynamically get the divs properties
    const windowWidth  = useWindowResize(); // attaching the custom hook to listen for windowResize event so windowWidth is updated when window is resized
    
    // Function to calculate the x offset required to centre the selected item
    const calculateXOffset = (index: number | null) => {

        // If the index of the selected item is not null and the selected item is not null and the selected item is the same as the index
        if (index !== null && selectedItem !== null && selectedItem == index && profilesRef.current) {
            // Calculate the x offset required to centre the selected item
            const itemWidth = profilesRef.current.children[index].clientWidth; // The width of the selected item
            const itemLeft = (profilesRef.current.children[index] as HTMLElement).offsetLeft; // The leftMost coordinate of the selected item
            const windowCenter = windowWidth / 2; // The center of the window
            const offset = windowCenter - (itemLeft + itemWidth / 2); // Offset = center of window - the coordinate of the items current centre on the x axis
            return offset;
        }
        // Else, return 0 as we do not want to move the item
        return 0;
    };

    // #region Event Handlers to handle selecting and deselecting an item

    // handleItemClick; called using onClickEvent for the about card motion.div's
    const handleItemClick = (index: number | null) => {
        setSelectedItem(index === selectedItem ? null : index);
    };

    // handleClickAnywhere; called using event listener on the document
    const handleClickAnywhere = (event: MouseEvent) => {
        if (profilesRef.current) {
            let clickedInsideProfile = false;
            profilesRef.current.childNodes.forEach((child) => {
                const item = child as HTMLElement;
                const itemRect = item.getBoundingClientRect();
                if (itemRect.left <= event.clientX && event.clientX <= itemRect.right &&
                    itemRect.top <= event.clientY && event.clientY <= itemRect.bottom) {
                    clickedInsideProfile = true;
                }
            });
    
            if (!clickedInsideProfile) {
                setSelectedItem(null);
            }
        }
    };

    // useEffect hook to add event listener to the document to handle clicking anywhere
    useEffect(() => {
        document.addEventListener('mousedown', handleClickAnywhere); // Add event listener to the document to handle clicking anywhere
        return () => { // Cleanup function to remove event listener when component unmounts
            document.removeEventListener('mousedown', handleClickAnywhere);
        };
    }, []);
    
    // #endregion

    return (
        <div id="about">
            <h2 className="head-text">
                Inspired To Build <span>Innovative</span> Solutions To <span>Your</span> Problems
            </h2>
            <div ref={profilesRef} className="app__profiles">
                {/* for each about in the abouts array of objects, create and populate a motion div */}
                {abouts.map((about, index) => (
                    <motion.div
                        whileInView={{ 
                            opacity: [0,0.95],  
                            transition:{ duration: 0.8, type: 'easeInOut' }}
                        }
                        whileHover={ selectedItem !== index ? {scale: 1.1} : {scale: 1.5} }
                        transition={{ duration: 0.5, type: 'tween' }}
                        className="app__profile-item"
                        key={about.title + index}

                        animate={{
                            scale: selectedItem === index ? 1.4 : 1, // If selected, scale up to 1.4, else scale to 1
                            x: calculateXOffset(index), // Move horizontally to the center or stay at original position
                            zIndex: selectedItem === index ? 2 : 1, // If selected, move to the front so other cards don't overlap
                            transition:{ duration: 0.2, type: 'tween' }
                        }}
                        onClick={() => handleItemClick(index)} // onClick event handler to handle selecting and deselecting an item
                    >
                    <img src={about.imgUrl} alt={about.title} />
                        <h2 className="bold-text" style={{ marginTop: 20}}>{about.title}</h2>
                        {/* only show the p (description) if the selectedItem is the same as the index */}
                        {
                            selectedItem === index && (<p className="p-text" style={{marginTop: 10}}>{about.description}</p>)
                        }
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
export default About;