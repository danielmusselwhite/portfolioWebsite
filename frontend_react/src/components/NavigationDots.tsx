import {arrayOfSections} from '../utils/utils';

const NavigationDots = ({ active }: { active: string }) => {
    return (
        <div className="navigation-dots">
            {arrayOfSections.map((section, index) => (
                <a
                    href={`#${section}`}
                    key={section + index}
                    className="app__navigation-dot"
                    style={active === section ? { backgroundColor: 'hsl(0, 100%, 50%)' } : {}}
              />
            ))}
        </div>
    );
}

export default NavigationDots;