import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap} from '../../wrapper';
import { urlFor, client } from '../../client'; // Import the sanity client and urlFor function to get content from sanity
import renderHTML from '../../utils/htmlRender';

import './Work.scss';

// defining custom Work type matching up the one used in Sanity
type Work = {
    title: string;
    description: string;
    projectLink: string;
    codeLink: string;
    imgUrl: string;
    tags: string[];
};

const Work = () => {

    // #region Logic to fetch and filter data from sanity
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1})
    const [works, setWorks] = useState<Work[]>([]);
    const [filterWork, setFilterWork] = useState<Work[]>([]); 
    const [linkFilter, setLinkFilter] = useState('Both');

    // Function to toggle the link filter between Public, Private and Both
    const toggleLinkFilter = () => {
        let newFilter;
        if (linkFilter === 'Public')
            newFilter = 'Private';
        
        else if (linkFilter === 'Private') 
            newFilter = 'Both';
        else 
            newFilter = 'Public';
        
        setLinkFilter(newFilter);
        handleWorkFilter(newFilter, activeFilter);
    };

    // Function to toggle the selected tag
    const toggleTag = (tag: string) => {
        if (activeFilter === tag) {
            // if item is already All, then do nothing; else set item to All
            if(activeFilter === 'All') return;
        }
        setActiveFilter(tag);
        handleWorkFilter(linkFilter, tag);
    };

    // useEffect to fetch data from sanity
    useEffect(() => {
        const query = '*[_type == "works"]'; // query to get all work from sanity

        client.fetch(query)
            .then((data: Work[]) => { // Provide the correct type for the data parameter
                setWorks(data);
                setFilterWork(data);
            })

    }, []);


    // Function to handle the filter of the work items
    const handleWorkFilter = (newFilter: string, newTag:string) => {

        setAnimateCard({ y: 100, opacity: 0 }); // Animate the work items out of the screen
    
        setTimeout(() => { // Set a timeout to allow the animation to finish before updating the filterWork state variable
            setAnimateCard({ y: 0, opacity: 1 }); // Animate the work items back into the screen
        
            // If the item that was clicked on is 'All' then set the filterWork state variable to all of the work items, otherwise filter the work items based on the item that was clicked on
            if (newTag === 'All') { 
                setFilterWork(works.filter((work) =>
                    newFilter === 'Public' ? work.projectLink || work.codeLink : 
                        newFilter === 'Private' ? !work.projectLink && !work.codeLink : 
                            true
                ));
            } 
            else {
                setFilterWork(works.filter((work) => 
                    work.tags.includes(newTag) &&
                    (
                        newFilter === 'Public' ? work.projectLink || work.codeLink : 
                            newFilter === 'Private' ? !work.projectLink && !work.codeLink : 
                                true
                    )
                ));
            }
        }, 500);
    };
    // #endregion


    return(
        <div>
            <h2 className="head-text">
                <span>Portfolio</span> Of My Recent <span>Works</span>
            </h2>

            <div className="app__work-filter">
                {
                    // create array of all of the unique 'tags' for all elements in works + 'All' and map over them to create a filter item for each
                    // used to filter the work item cards
                    [...new Set(works.flatMap(work => work.tags))].sort().concat(["All"]).map((item, index) => (
                        <div className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`} key={index} onClick={() => toggleTag(item)}>
                            <p>{item}</p>
                        </div>
                    ))
                }
            </div>

            <div className="app__work-visibilityButton">
                <button className="app__work-visibilityButton-btn" onClick={toggleLinkFilter}>{linkFilter}</button>
            </div>

            <motion.div animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.5}} className="app__work-portfolio">

                {/* Mapping over the filterWork array to render a list of work items */}
                {filterWork.map((work, index) => (
                    <div className="app__work-item app__flex" key={index}>
                        {/* The Image and elements that overlay on it when hovered over */}
                        <div className="app__work-img app__flex">
                            <img src={urlFor(work.imgUrl).url()} alt={work.title} />
                            
                            {/* hover shade block to mouse over the image, containing the github and project links */}
                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                                className="app__work-hover app__flex"
                            >
                                {/* Renders a link to the project if available. */}
                                {work.projectLink && (
                                    <a href={work.projectLink} target="_blank" rel="noreferrer">
                                        <motion.div
                                            whileInView={{ scale: [0, 1] }}
                                            whileHover={{ scale: [1, 0.90] }}
                                            transition={{ duration: 0.25 }}
                                            className="app__flex"
                                        >
                                            <AiFillEye />
                                        </motion.div>
                                    </a>
                                )}

                                {/* Renders a link to the code if available. */}
                                {work.codeLink && (
                                    <a href={work.codeLink} target="_blank" rel="noreferrer">
                                        <motion.div
                                            whileInView={{ scale: [0, 1] }}
                                            whileHover={{ scale: [1, 0.90] }}
                                            transition={{ duration: 0.25 }}
                                            className="app__flex"
                                        >
                                            <AiFillGithub />
                                        </motion.div>
                                    </a>
                                )}
                            </motion.div>
                        </div>

                        {/* The title and description displayed under the image*/}
                        <div className="app__work-content app__flex">
                            <h4 className="bold-text">{work.title}</h4>
                            <p className="p-text p-description" style={{ marginTop: 10 }}>{renderHTML(work.description)}</p>

                            <div className="app__work-tag app__flex">
                                <p className="p-text">{work.tags[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </motion.div>

        </div>
    );
}

export default AppWrap(Work, 'work', ['app__work']);