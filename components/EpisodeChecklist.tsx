
import React, { useState } from 'react';

interface EpisodeChecklistProps {
    totalEpisodes: number;
    watchedEpisodes: number[];
    onUpdate: (watched: number[]) => void;
}

const EPISODE_GRID_THRESHOLD = 24;

const EpisodeChecklist: React.FC<EpisodeChecklistProps> = ({ totalEpisodes, watchedEpisodes, onUpdate }) => {
    const [showGrid, setShowGrid] = useState(totalEpisodes <= EPISODE_GRID_THRESHOLD);
    const [markUntil, setMarkUntil] = useState('');
    const watchedSet = new Set(watchedEpisodes);

    const handleToggle = (epNumber: number) => {
        const newWatchedSet = new Set(watchedSet);
        if (newWatchedSet.has(epNumber)) {
            newWatchedSet.delete(epNumber);
        } else {
            newWatchedSet.add(epNumber);
        }
        onUpdate(Array.from(newWatchedSet).sort((a,b) => a - b));
    };

    const handleMarkUntil = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const episodeNumber = parseInt(markUntil, 10);
        if (isNaN(episodeNumber) || episodeNumber < 1) {
            setMarkUntil('');
            return;
        }
        const newWatched = Array.from({ length: Math.min(episodeNumber, totalEpisodes) }, (_, i) => i + 1);
        onUpdate(newWatched);
        setMarkUntil('');
    };

    const handleMarkAll = () => {
        const allEpisodes = Array.from({ length: totalEpisodes }, (_, i) => i + 1);
        onUpdate(allEpisodes);
    };

    const handleClearAll = () => {
        onUpdate([]);
    };

    const renderGrid = () => (
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-6 lg:grid-cols-8 gap-1.5 max-h-32 overflow-y-auto pr-2 -mr-2">
            {Array.from({ length: totalEpisodes }, (_, i) => i + 1).map(ep => (
                <label key={ep} className="flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={watchedSet.has(ep)}
                        onChange={() => handleToggle(ep)}
                        className="hidden"
                    />
                    <span className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-mono cursor-pointer transition-all duration-200 border border-transparent ${
                        watchedSet.has(ep)
                            ? 'bg-accent text-primary font-bold shadow-md shadow-accent/30'
                            : 'bg-primary hover:border-accent text-light-gray'
                    }`}>
                        {ep}
                    </span>
                </label>
            ))}
        </div>
    );

    if (totalEpisodes > EPISODE_GRID_THRESHOLD) {
        return (
            <div>
                <h4 className="text-md font-semibold text-light-gray mb-3">Episodes</h4>
                <div className="space-y-3">
                    <form onSubmit={handleMarkUntil} className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Mark up to ep..."
                            value={markUntil}
                            onChange={(e) => setMarkUntil(e.target.value)}
                            className="w-full bg-primary border border-gray-600 rounded-lg py-2 px-3 text-off-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-accent transition"
                            min="1"
                            max={totalEpisodes}
                            aria-label="Mark watched up to a specific episode"
                        />
                        <button 
                            type="submit"
                            className="bg-accent hover:bg-accent-hover text-primary font-bold py-2 px-4 rounded-lg transition-colors flex-shrink-0"
                            aria-label="Set watched episodes"
                        >
                            Set
                        </button>
                    </form>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={handleMarkAll} className="w-full bg-primary/60 hover:bg-primary border border-gray-700 text-sm text-light-gray font-medium py-2 px-3 rounded-lg transition-colors">Mark All</button>
                        <button onClick={handleClearAll} className="w-full bg-primary/60 hover:bg-primary border border-gray-700 text-sm text-light-gray font-medium py-2 px-3 rounded-lg transition-colors">Clear All</button>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setShowGrid(!showGrid)}
                            className="text-accent hover:text-accent-hover text-sm font-semibold py-1 transition-colors"
                        >
                            {showGrid ? 'Hide Episode Grid' : 'Show Episode Grid'}
                        </button>
                    </div>
                    {showGrid && <div className="pt-3 border-t border-gray-700/50 mt-2">{renderGrid()}</div>}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h4 className="text-md font-semibold text-light-gray mb-3">Episodes</h4>
            {renderGrid()}
        </div>
    );
};

export default EpisodeChecklist;
