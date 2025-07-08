import React from 'react';
import { FilterOption, SortOption } from '../types';
import { PlusIcon, SparklesIcon, SearchIcon } from './Icons';

interface HeaderProps {
    onAddAnime: () => void;
    onGetRecommendation: () => void;
    isRecommending: boolean;
    filter: FilterOption;
    setFilter: (filter: FilterOption) => void;
    sort: SortOption;
    setSort: (sort: SortOption) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    onAddAnime,
    onGetRecommendation,
    isRecommending,
    filter,
    setFilter,
    sort,
    setSort,
    searchTerm,
    setSearchTerm
}) => {
    return (
        <header className="bg-secondary/70 backdrop-blur-lg sticky top-0 z-20 border-b border-gray-800">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-off-white to-light-gray bg-clip-text text-transparent">
                        My Anime Tracker
                    </h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onGetRecommendation}
                            disabled={isRecommending}
                            className="flex items-center gap-2 bg-brand-purple hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                        >
                            <SparklesIcon />
                            {isRecommending ? 'Thinking...' : 'Suggest Anime'}
                        </button>
                        <button
                            onClick={onAddAnime}
                            className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                        >
                           <PlusIcon />
                           Add Anime
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-primary/50 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-off-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                        />
                    </div>
                    <div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as FilterOption)}
                            className="w-full bg-primary/50 border border-gray-700 rounded-lg py-2.5 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors appearance-none"
                        >
                            {Object.values(FilterOption).map(option => (
                                <option key={option} value={option} className="bg-secondary text-off-white">{option}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOption)}
                            className="w-full bg-primary/50 border border-gray-700 rounded-lg py-2.5 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors appearance-none"
                        >
                            {Object.values(SortOption).map(option => (
                                <option key={option} value={option} className="bg-secondary text-off-white">{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;