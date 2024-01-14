import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import images from '../../constants/images';
import './About.scss';
import { urlFor, client } from '../../client'; // Import the sanity client and urlFor function to get content from sanity
import renderHTML from '../../utils/htmlRender';


import { AppWrap, MotionWrap } from '../../wrapper';

//todo - in sanity update the abouts

// defining custom About type matching up the one used in Sanity
type About = {
    title: string;
    imgUrl: string;
    description: string;
    numericalOrder: number;
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
            const sortedData = data.sort((a: About, b: About) => a.numericalOrder - b.numericalOrder); // sort the abouts by numericalOrder
            setAbouts(sortedData);
        });
    }, []);
    // #endregion

    // #region Logic to select and deselect an item
    // constants used in the logic to select and deselect an item
    const [selectedItem, setSelectedItem] = useState<number | null>(null); // selectedItem is the index of the selected item in the abouts array of objects

    // #region Event Handlers to handle selecting and deselecting an item
    // handleItemClick; called using onClickEvent for the about card motion.div's
    const handleItemClick = (index: number | null) => {
        if (index === selectedItem) {
          setSelectedItem(null);
        } else {
          setSelectedItem(index);
        }
      };

    // handleClickPopup - which closes popup
    const handleClickPopup = () => {
        if (selectedItem !== null) {
            setSelectedItem(null); // deselect the item
        }
    };
    
    // #endregion
    // #endregion

    const Popup = ({ content }: { content: About}) => {
        return (
          <div className="popupAbout">
            <div className="popupContent" onClick={() => handleClickPopup()}>
              <h2>{content.title}</h2>
              <img src={urlFor(content.imgUrl).url()} alt={content.title} />
              <p>{renderHTML(content.description)}</p>
            </div>
          </div>
        );
      };
      

    return (
        <div>
            <h2 className="head-text">
                Inspired To Build <span>Innovative</span> Solutions To <span>Your</span> Problems
            </h2>
            <div className="app__profiles">
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

                        onClick={() => handleItemClick(index)} // onClick event handler to handle selecting and deselecting an item
                    >
                    <img src={urlFor(about.imgUrl).url()} alt={about.title} />
                        <h2 className="bold-text" style={{ marginTop: 20}}>{about.title}</h2>
                    </motion.div>
                ))}
            </div>
           
            {selectedItem !== null && (
                <Popup
                content={abouts[selectedItem]}
                />
            )}

        </div>
    );
};

export default AppWrap(
    MotionWrap(About, 'app__about'),
    'about',
    'app__whitebg',
);