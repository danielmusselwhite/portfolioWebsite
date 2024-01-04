import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import images from '../../constants/images';
import './About.scss';
import {useWindowResize} from '../../utils/utils'; // Import the custom hook (event listener) for window resize event
import { urlFor, client } from '../../client'; // Import the sanity client and urlFor function to get content from sanity

// defining custom About type matching up the one used in Sanity
type About = {
    title: string;
    imgUrl: string;
    description: string;
  };

const About = () => {

    // #region Logic to fetch data from sanity
    const [abouts, setAbouts] = useState([]); // abouts is an array of objects, each object is an about card

    // useEffect hook to fetch data from sanity at the start of the component mounting and populate the abouts array of objects
    useEffect(() => {
        const query = '*[_type == "abouts"]'; // query to get all abouts from sanity

        // fetch data from sanity using the query and populate the abouts array of objects
        client.fetch(query).then((data) => {
            console.log(data);
        setAbouts(data);
        });
    }, []);
    // #endregion

    // #region Logic to select and deselect an item
    // constants used in the logic to select and deselect an item
    const [selectedItem, setSelectedItem] = useState<number | null>(null); // selectedItem is the index of the selected item in the abouts array of objects
    const profilesRef = useRef<HTMLDivElement>(null); // Ref to the div containing the abouts cards, allowing us to dynamically get the divs properties
    const windowWidth  = useWindowResize(); // attaching the custom hook to listen for windowResize event so windowWidth is updated when window is resized
    
    // Function to calculate the x offset required to centre the selected item
    const calculateXOffset = (index: number | null, width:number) => {

        // If the index of the selected item is not null and the selected item is not null and the selected item is the same as the index
        if (index !== null && selectedItem !== null && selectedItem == index && profilesRef.current) {
            // Calculate the x offset required to centre the selected item
            // const itemWidth = profilesRef.current.children[index].clientWidth; // The width of the selected item
            const itemWidth = width;
            const itemLeft = (profilesRef.current.children[index] as HTMLElement).offsetLeft; // The leftMost coordinate of the selected item
            const windowCenter = windowWidth / 2; // The center of the window
            const offset = windowCenter - (itemLeft + itemWidth / 2); // Offset = center of window - the coordinate of the items current centre on the x axis
            return offset;
        }
        // Else, return 0 as we do not want to move the item
        return 0;
    };
    
    // Helper function to get the animation properties for the motion.div
    const getAnimationProps = (index: number) => {
        const isSelected = selectedItem === index;

        const widthPx: number = 400;

        // if isSelected is true, return selected animation properties
        if (isSelected) {
          return {
            width: widthPx+"px",
            x: calculateXOffset(index, widthPx), // Center horizontally
            zIndex: 2,
            transition: { duration: 0.2, type: 'tween' },
          };
        }
        // else, return deselected animation properties
        return {
            width: '100%',
            x:0,
            scale: 1,
            zIndex: 1,
            transition: { duration: 0.2, type: 'tween' },
        };
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
    // #endregion

    return (
        <div id="about">
            <h2 className="head-text">
                Inspired To Build <span>Innovative</span> Solutions To <span>Your</span> Problems
            </h2>
            <div ref={profilesRef} className="app__profiles">
                {/* for each about in the abouts array of objects, create and populate a motion div */}
                {abouts.map((about: About, index: number) => (
                    <motion.div
                        whileInView={{ 
                            opacity: [0,0.95],  
                            transition:{ duration: 0.8, type: 'easeInOut' }}
                        }
                        whileHover={ 
                            {scale: 1.1, 
                            cursor: 'pointer'}
                            }
                        transition={{ duration: 0.5, type: 'tween' }}
                        className="app__profile-item"
                        key={about.title + index}

                        animate={getAnimationProps(index)}
                        onClick={() => handleItemClick(index)} // onClick event handler to handle selecting and deselecting an item
                    >
                    <img src={urlFor(about.imgUrl).url()} alt={about.title} />
                        <h2 className="bold-text" style={{ marginTop: 20}}>{about.title}</h2>
                        {/* only show the p (description) if the selectedItem is the same as the index */}
                        {
                            selectedItem === index && (
                                <div style={{ overflowY: 'auto', maxHeight: '200px', width: '100%' }}>
                                    <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
                                </div>
                            )
                        }
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
export default About;