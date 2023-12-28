import { useState, useEffect } from 'react';

export const useWindowResize = () => {
    const [initialX, setInitialX] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setInitialX(width);
            console.log('width: ', width);
        };

        // Initialize setInitialX
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return initialX;
};

export const arrayOfSections = ['home', 'about', 'work', 'skills', 'work experience', 'testimonials', 'contact'];