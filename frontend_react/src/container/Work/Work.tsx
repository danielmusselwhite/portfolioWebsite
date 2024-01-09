import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap} from '../../wrapper';
import { urlFor, client } from '../../client'; // Import the sanity client and urlFor function to get content from sanity

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
    const [works, setWorks] = useState<Work[]>([]); // Provide the correct type for the works state variable
    const [filterWork, setFilterWork] = useState<Work[]>([]); // Provide the correct type for the filterWork state variable

    useEffect(() => {
        const query = '*[_type == "works"]'; // query to get all work from sanity

        client.fetch(query)
            .then((data: Work[]) => { // Provide the correct type for the data parameter
                setWorks(data);
                setFilterWork(data);
            })

    }, []);

    // #endregion

    const handleWorkFilter = (item: any) => {
        setActiveFilter(item);
        setAnimateCard({ y: 100, opacity: 0 });
    
        setTimeout(() => {
        setAnimateCard({ y: 0, opacity: 1 });
    
          if (item === 'All') {
            setFilterWork(works);
          } else {
            setFilterWork(works.filter((work) => work.tags.includes(item)));
          }
        }, 500);
    };


    return(
        <div>
            <h2 className="head-text">
                <span>Portfolio</span> Of My Recent <span>Personal Projects</span>
            </h2>

            <div className="app__work-filter">
                {
                    // create array of all of the unique 'tags' for all elements in works + 'All' and map over them to create a filter item for each
                    [...new Set(works.flatMap(work => work.tags)), 'All'].sort().map((item, index) => (
                        <div className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`} key={index} onClick={() => handleWorkFilter(item)}>
                            <p>{item}</p>
                        </div>
                    ))
                }
            </div>

            <motion.div animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.5}} className="app__work-portfolio">

                {filterWork.map((work, index) => (
                    <div className="app__work-item app__flex" key={index}>
                        <div className="app__work-img app__flex">
                            <img src={urlFor(work.imgUrl).url()} alt={work.title} />
                            
                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                                className="app__work-hover app__flex"
                            >
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
                            </motion.div>
                        </div>


                        <div className="app__work-content app__flex">
                            <h4 className="bold-text">{work.title}</h4>
                            <p className="p-text p-description" style={{ marginTop: 10 }}>{work.description}</p>

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

export default AppWrap(Work, 'work', ['app__flex']);