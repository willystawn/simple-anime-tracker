
import React from 'react';

interface EpisodeChecklistProps {
    totalEpisodes: number;
    watchedEpisodes: number[];
    onUpdate: (watched: number[]) => void;
}

const EpisodeChecklist: React.FC<EpisodeChecklistProps> = ({ totalEpisodes, watchedEpisodes, onUpdate }) => {
    const watchedSet = new Set(watchedEpisodes);

    const handleToggle = (epNumber: number) => {
        const newWatchedSet = new Set(watchedSet);
        if (newWatchedSet.has(epNumber)) {
            newWatchedSet.delete(epNumber);
        } else {
            newWatchedSet.add(epNumber);
        }
        onUpdate(Array.from(newWatchedSet));
    };

    return (
        <div>
            <h4 className="text-md font-semibold text-light-gray mb-3">Episodes</h4>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-6 lg:grid-cols-8 gap-1.5 max-h-48 overflow-y-auto pr-2 -mr-2">
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
        </div>
    );
};

export default EpisodeChecklist;