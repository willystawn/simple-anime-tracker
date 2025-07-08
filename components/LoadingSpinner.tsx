import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary border-t-accent" role="status" aria-label="Loading"></div>
    );
};

export default LoadingSpinner;