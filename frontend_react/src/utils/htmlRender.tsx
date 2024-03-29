import React from 'react';

const renderHTML = (text: string) => {
    text = text.replace(/\t/g, '⠀⠀'); // replace tabs with 4 spaces
    const regex = /<([^>]+)>/g;
    const matches = text.split(regex);

    return matches.map((part, index) => {
        if (index % 2 === 1) {
            switch (part.toLowerCase()) {
                case 'br':
                    return <br key={index} />;
                // Add cases for other tags if needed
                default:
                    return null;
            }
        } else {
            return part;
        }
    });
};

export default renderHTML;