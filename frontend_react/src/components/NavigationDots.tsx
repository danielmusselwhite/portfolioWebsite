import {arrayOfSections} from '../utils/utils';

const NavigationDots = ({ active }: { active: string }) => {
    return (
        <div className="navigation-dots">
            {arrayOfSections.map((section, index) => (
                <a
                    href={`#${section}`}
                    key={section + index}
                    className="app__navigation-dot"
                    style={{ zIndex: 3, ...(active === section ? { backgroundColor: 'hsl(0, 100%, 50%)' } : {}) }} // zIndex is 3 + if the active section is the current section, set the background color to the primary color
              />
            ))}
        </div>
    );
}

export default NavigationDots;