import React, { useState } from 'react';
import { FilterOption, SortOption } from '../types';
import { SearchIcon, FilterIcon } from './Icons';

interface ControlsBarProps {
    filter: FilterOption;
    setFilter: (filter: FilterOption) => void;
    sort: SortOption;
    setSort: (sort: SortOption) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const ControlsBar: React.FC<ControlsBarProps> = ({
    filter,
    setFilter,
    sort,
    setSort,
    searchTerm,
    setSearchTerm,
}) => {
    const [showFilterModal, setShowFilterModal] = useState(false);

    return (
        <>
            <div className="mb-6 flex flex-col gap-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-secondary border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-off-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                        aria-label="Search animes by title"
                    />
                </div>
                {/* Desktop controls */}
                <div className="hidden md:grid md:grid-cols-2 gap-4">
                    <select
                        id="filter-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as FilterOption)}
                        className="w-full bg-secondary border border-gray-700 rounded-lg py-2.5 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors appearance-none"
                        aria-label="Filter by Status"
                    >
                        {Object.values(FilterOption).map(option => (
                            <option key={option} value={option} className="bg-primary text-off-white">{option}</option>
                        ))}
                    </select>
                     <select
                        id="sort-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="w-full bg-secondary border border-gray-700 rounded-lg py-2.5 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors appearance-none"
                        aria-label="Sort by"
                    >
                        {Object.values(SortOption).map(option => (
                            <option key={option} value={option} className="bg-primary text-off-white">{option}</option>
                        ))}
                    </select>
                </div>
                {/* Mobile button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setShowFilterModal(true)}
                        className="w-full flex items-center justify-center gap-2 bg-secondary border border-gray-700 rounded-lg py-2.5 px-4 text-off-white hover:bg-secondary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <FilterIcon />
                        <span>Filter: <span className="font-semibold">{filter}</span></span>
                        <span className="text-gray-500">|</span>
                        <span>Sort: <span className="font-semibold">{sort}</span></span>
                    </button>
                </div>
            </div>

            {showFilterModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity" onClick={() => setShowFilterModal(false)}>
                    <div className="bg-secondary rounded-xl shadow-2xl p-6 w-full max-w-sm m-4 border border-gray-700" onClick={e => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-6 text-off-white">Filter & Sort</h2>
                        <div className="flex flex-col gap-6">
                            <div>
                                <label htmlFor="modal-filter-select" className="block text-light-gray text-sm font-bold mb-2">Filter by Status</label>
                                <select
                                    id="modal-filter-select"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value as FilterOption)}
                                    className="w-full bg-primary border border-gray-600 rounded-lg py-2.5 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors appearance-none"
                                >
                                    {Object.values(FilterOption).map(option => (
                                        <option key={option} value={option} className="bg-secondary text-off-white">{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="modal-sort-select" className="block text-light-gray text-sm font-bold mb-2">Sort by</label>
                                <select
                                    id="modal-sort-select"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value as SortOption)}
                                    className="w-full bg-primary border border-gray-600 rounded-lg py-2.5 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors appearance-none"
                                >
                                    {Object.values(SortOption).map(option => (
                                        <option key={option} value={option} className="bg-secondary text-off-white">{option}</option>
                                    ))}
                                </select>
                            </div>
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
export default ControlsBar;