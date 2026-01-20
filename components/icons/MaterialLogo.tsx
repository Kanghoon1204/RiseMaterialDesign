
import React from 'react';

export const MaterialLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#4285F4" />
        <path d="M12 12l9-5v10l-9 5V12z" fill="#0F9D58" />
        <path d="M12 2v10l9 5V7l-9-5z" fill="#F4B400" />
        <path d="M12 12l-9 5V7l9-5v10z" fill="#DB4437" />
    </svg>
);
