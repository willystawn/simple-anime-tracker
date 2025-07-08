import React, { useState } from 'react';
import { FilterOption, SortOption } from '../types';
import { PlusIcon, SparklesIcon, SearchIcon, FilterIcon } from './Icons';

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
    const [showFilterModal, setShowFilterModal] = useState(false);

    const FilterSortControls = () => (
        <>
            <div>
                <label htmlFor="filter-select" className="block text-light-gray text-sm font-bold mb-2 md:sr-only">Filter by Status</label>
                <select
                    id="filter-select"
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
                 <label htmlFor="sort-select" className="block text-light-gray text-sm font-bold mb-2 md:sr-only">Sort by</label>
                <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="w-full bg-primary/50 border border-gray-700 rounded-lg py-2.5 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors appearance-none"
                >
                    {Object.values(SortOption).map(option => (
                        <option key={option} value={option} className="bg-secondary text-off-white">{option}</option>
                    ))}
                </select>
            </div>
        </>
    );


    return (
        <>
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

                <div className="mt-6 flex flex-col gap-4">
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
                    {/* Desktop controls */}
                    <div className="hidden md:grid md:grid-cols-2 gap-4">
                        <FilterSortControls />
                    </div>
                    {/* Mobile button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setShowFilterModal(true)}
                            className="w-full flex items-center justify-center gap-2 bg-primary/50 border border-gray-700 rounded-lg py-2.5 px-4 text-off-white hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                            <FilterIcon />
                            <span>Filter: <span className="font-semibold">{filter}</span></span>
                            <span className="text-gray-500">|</span>
                            <span>Sort: <span className="font-semibold">{sort}</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        {showFilterModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity" onClick={() => setShowFilterModal(false)}>
                <div className="bg-secondary rounded-xl shadow-2xl p-6 w-full max-w-sm m-4 border border-gray-700" onClick={e => e.stopPropagation()}>
                    <h2 className="text-xl font-bold mb-6 text-off-white">Filter & Sort</h2>
                    <div className="flex flex-col gap-6">
                        <FilterSortControls />
                    </div>
                     <button 
                        onClick={() => setShowFilterModal(false)} 
                        className="mt-8 w-full bg-accent hover:bg-accent-hover text-primary font-bold py-2.5 px-5 rounded-lg transition-colors">
                        Done
                    </button>
                </div>
            </div>
        )}
        </>
    );
};

export default Header;