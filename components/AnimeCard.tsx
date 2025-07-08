import React, { useState } from 'react';
import { Anime } from '../types';
import EpisodeChecklist from './EpisodeChecklist';
import ConfirmationModal from './ConfirmationModal';
import { TrashIcon, EditIcon } from './Icons';

interface AnimeCardProps {
    anime: Anime;
    onUpdateWatched: (animeId: string, watched_episodes: number[]) => void;
    onDelete: (animeId: string) => void;
    onEdit: (anime: Anime) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onUpdateWatched, onDelete, onEdit }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const progress = anime.total_episodes > 0 ? (anime.watched_episodes.length / anime.total_episodes) * 100 : 0;

    const handleConfirmDelete = () => {
        onDelete(anime.id);
        setShowDeleteConfirm(false);
    };

    return (
        <div className="bg-secondary rounded-xl shadow-lg overflow-hidden flex flex-col group relative border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1">
            <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => onEdit(anime)}
                    className="text-white bg-black/50 hover:bg-accent hover:text-primary rounded-full p-2 transition-colors"
                    aria-label="Edit anime"
                >
                    <EditIcon className="h-4 w-4" />
                </button>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-white bg-black/50 hover:bg-red-500 rounded-full p-2 transition-colors"
                    aria-label="Delete anime"
                >
                   <TrashIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="h-64 w-full overflow-hidden">
                <img 
                    src={anime.image_url || 'https://via.placeholder.com/400x600.png?text=No+Image'} 
                    alt={anime.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x600.png?text=No+Image'; }}
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-off-white mb-3 truncate" title={anime.title}>{anime.title}</h3>
                
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-light-gray mb-1.5">
                        <span>Progress</span>
                        <span>{anime.watched_episodes.length} / {anime.total_episodes}</span>
                    </div>
                    <div className="w-full bg-primary rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-teal-400 to-accent h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex-grow">
                  <EpisodeChecklist
                      totalEpisodes={anime.total_episodes}
                      watchedEpisodes={anime.watched_episodes}
                      onUpdate={(newWatched) => onUpdateWatched(anime.id, newWatched)}
                  />
                </div>
            </div>
            {showDeleteConfirm && (
                <ConfirmationModal
                    title="Delete Anime"
                    message={`Are you sure you want to delete "${anime.title}" from your list?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
        </div>
    );
};

export default AnimeCard;