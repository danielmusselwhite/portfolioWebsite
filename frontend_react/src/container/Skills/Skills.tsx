import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import './Skills.scss';
import { urlFor, client } from '../../client';
import { AppWrap } from '../../wrapper';

// defining custom Skill type matching up the one used in Sanity
type Skill = {
    name: string;
    bgColor: string;
    icon: string;
};
// defining custom Experience type matching up the one used in Sanity
type Experience = {
    year: string;
    works: string;
    icon: WorkExperience[];
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
            setSkills(skills);
        });
        client.fetch(experiencesQuery).then((experiences: Experience[]) => {
            setExperiences(experiences);
        });
    }, []);
    // #endregion


    return(
        <div>
            <h2 className="head-text"><span>Skills</span> and <span>Experience</span></h2>

            {/* Div contianing the Skills badges */}
            <div className="app__skills__container">

                <motion.div className="app__skills-list">

                {/* Mapping through the skill's retrieved from sanity to dynamically create a badge for each */}
                {skills.map((skill) => (
                    <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
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


            {/* TODO - Add work experience */}





        </div>
    );
}

export default AppWrap(Skills, 'skills', ['app__skills']);