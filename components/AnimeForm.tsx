import React, { useState, useEffect } from 'react';
import { Anime } from '../types';

interface AnimeFormProps {
    onClose: () => void;
    onSubmit: (anime: Omit<Anime, 'created_at' | 'watched_episodes'> & { id?: string }) => void;
    animeToEdit?: Anime | null;
}

const AnimeForm: React.FC<AnimeFormProps> = ({ onClose, onSubmit, animeToEdit }) => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [totalEpisodes, setTotalEpisodes] = useState(12);

    const isEditing = !!animeToEdit;

    useEffect(() => {
        if (isEditing) {
            setTitle(animeToEdit.title);
            setImageUrl(animeToEdit.image_url || '');
            setTotalEpisodes(animeToEdit.total_episodes);
        }
    }, [animeToEdit, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || totalEpisodes <= 0) {
            alert("Please provide a valid title and number of episodes.");
            return;
        }
        onSubmit({
            id: animeToEdit?.id,
            title,
            image_url: imageUrl || null,
            total_episodes: totalEpisodes,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
            <div className="bg-secondary rounded-xl shadow-2xl p-8 w-full max-w-md m-4 border border-gray-700" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6 text-off-white">{isEditing ? 'Edit Anime' : 'Add New Anime'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-light-gray text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-primary border border-gray-600 rounded-lg py-3 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent-hover focus:border-accent-hover transition"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image_url" className="block text-light-gray text-sm font-bold mb-2">Image URL (Optional)</label>
                        <input
                            type="url"
                            id="image_url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full bg-primary border border-gray-600 rounded-lg py-3 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent-hover focus:border-accent-hover transition"
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="total_episodes" className="block text-light-gray text-sm font-bold mb-2">Total Episodes</label>
                        <input
                            type="number"
                            id="total_episodes"
                            value={totalEpisodes}
                            onChange={(e) => setTotalEpisodes(parseInt(e.target.value, 10) || 1)}
                            min="1"
                            className="w-full bg-primary border border-gray-600 rounded-lg py-3 px-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent-hover focus:border-accent-hover transition"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <button type="button" onClick={onClose} className="text-light-gray bg-primary hover:bg-gray-700 font-bold py-2.5 px-5 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-accent hover:bg-accent-hover text-primary font-bold py-2.5 px-5 rounded-lg transition-colors">
                            {isEditing ? 'Save Changes' : 'Add Anime'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnimeForm;