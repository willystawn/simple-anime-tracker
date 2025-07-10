import React from 'react';
import { PlusIcon, SparklesIcon } from './Icons';

interface HeaderProps {
    onAddAnime: () => void;
    onGetRecommendation: () => void;
    isRecommending: boolean;
}

const Header: React.FC<HeaderProps> = ({
    onAddAnime,
    onGetRecommendation,
    isRecommending,
}) => {
    return (
        <header className="bg-secondary/70 backdrop-blur-lg sticky top-0 z-20 border-b border-gray-800">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-3">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-br from-off-white to-light-gray bg-clip-text text-transparent">
                        My Anime Tracker
                    </h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onGetRecommendation}
                            disabled={isRecommending}
                            className="flex items-center gap-2 bg-brand-purple hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                            aria-label={isRecommending ? "Getting suggestion" : "Suggest an anime"}
                        >
                            <SparklesIcon />
                            {isRecommending ? 'Thinking...' : 'Suggest Anime'}
                        </button>
                        <button
                            onClick={onAddAnime}
                            className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                            aria-label="Add new anime"
                        >
                           <PlusIcon />
                           Add Anime
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;