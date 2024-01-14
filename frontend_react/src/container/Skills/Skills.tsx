import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import './Skills.scss';
import { urlFor, client } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';

import renderHTML from '../../utils/htmlRender';

// defining custom Skill type matching up the one used in Sanity
type Skill = {
    name: string;
    bgColor: string;
    icon: string;
};
// defining custom Experience type matching up the one used in Sanity
type Experience = {
    year: string;
    works: WorkExperience[];
    icon: string;
};
// defining custom workExperience type matching up the one used in Sanity
type WorkExperience = {
    name: string;
    company: string;
    desc: string;
};

const Skills = () => {

    // #region Logic to fetch and filter data from sanity
    const [skills, setSkills] = useState<Skill[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);

    // useEffect to fetch data from sanity
    useEffect(() => {
        const skillsQuery = '*[_type == "skills"]'; // query to get all skills from sanity
        const experiencesQuery = '*[_type == "experiences"]'; // query to get all experiences from sanity

        client.fetch(skillsQuery).then((skills: Skill[]) => {
            setSkills(skills.sort((a, b) => a.name.localeCompare(b.name))); // sorting name alphabetically
        });
        client.fetch(experiencesQuery).then((experiences: Experience[]) => {
            setExperiences(experiences.sort((a, b) => parseInt(b.year) - parseInt(a.year))); // sorting in descending order so most recent experience is first
        });
    }, []);
    // #endregion


    return(
        <div>
            <h2 className="head-text"><span>Skills</span> and <span>Experience</span></h2>

            <div className="app__skillsAndExp-container">

                {/* Div contianing the Skills badges */}
                <div className="app__skills-container">

                    <motion.div className="app__skills-list">

                    {/* Mapping through the skill's retrieved from sanity to dynamically create a badge for each */}
                    {skills.map((skill: Skill) => (
                        <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.8 }}
                        className="app__skills-item app__flex"
                        key={skill.name}
                        >
                            <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                                <img src={urlFor(skill.icon).url()} alt={skill.name} />
                            </div>
                            <p className="p-text">{skill.name}</p>
                        </motion.div>
                    ))}

                    </motion.div>

                </div>

                {/* Div containing the Experience */}
                <div className="app__skills-exp">
                    {experiences.map((experience) => (
                    <motion.div
                    className="app__skills-exp-item"
                    key={experience.year}
                    >
                        <div className="app__skills-exp-year">
                            <p className="bold-text">{experience.year}</p>
                        </div>
                        <motion.div className="app__skills-exp-works">
                            {experience.works.map((work, index) => (
                                <>
                                    <motion.div
                                    whileInView={{ opacity: [0, 1] }}
                                    transition={{ duration: 0.5 }}
                                    className="app__skills-exp-work"
                                    data-tip // data-tip is used to create a tooltip
                                    data-for={`${work.name}-${index}`} // data-for is used to specify the id of the tooltip
                                    key={`${work.name}-${index}`} 
                                    >
                                        <h4 className="bold-text">{work.name}</h4>
                                        <p className="p-text">{work.company}</p>
                                    </motion.div>
                                    <ReactTooltip
                                    id={`${work.name}-${index}`} // unique id of the tooltip
                                    effect="solid"
                                    arrowColor="#fff"
                                    className="skills-tooltip"
                                    >
                                        {renderHTML(work.desc)}
                                    </ReactTooltip>
                                </>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'skills',
    'app__whitebg',
  );