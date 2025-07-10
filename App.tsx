
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from './services/supabase';
import { getAnimeRecommendation } from './services/geminiService';
import { Anime, SortOption, FilterOption, Recommendation } from './types';
import AnimeCard from './components/AnimeCard';
import AnimeForm from './components/AnimeForm';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import LoadingSpinner from './components/LoadingSpinner';
import RecommendationModal from './components/RecommendationModal';
import { FolderIcon } from './components/Icons';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingAnime, setEditingAnime] = useState<Anime | null>(null);
    const [filter, setFilter] = useState<FilterOption>(FilterOption.Active);
    const [sort, setSort] = useState<SortOption>(SortOption.TitleAZ);
    const [searchTerm, setSearchTerm] = useState('');

    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
    const [isRecommending, setIsRecommending] = useState(false);

    const appPassword = import.meta.env.VITE_APP_PASSWORD;
    const [isAuthenticated, setIsAuthenticated] = useState(!appPassword);
    const [loginError, setLoginError] = useState<string | null>(null);

    const fetchAnimes = useCallback(async () => {
        if (!supabase) return;
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
            .from('animes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching animes:', error);
            setError(`Failed to fetch animes: ${error.message}. Please check your Supabase connection and RLS policies.`);
        } else {
            setAnimes(data as Anime[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (isSupabaseConfigured && isAuthenticated) {
            fetchAnimes();
        } else if (!isSupabaseConfigured) {
            setLoading(false);
        }
    }, [fetchAnimes, isAuthenticated]);

    const handleLogin = (password: string) => {
        if (password === appPassword) {
            setIsAuthenticated(true);
            setLoginError(null);
        } else {
            setLoginError("Incorrect password. Please try again.");
            // Optional: clear password field on error
        }
    };

    const handleFormSubmit = async (formData: Omit<Anime, 'created_at' | 'watched_episodes'> & { id?: string }) => {
        if (!supabase) return;

        const { id, ...animeData } = formData;

        if (id) { // Update existing anime
            const { data, error } = await supabase
                .from('animes')
                .update(animeData)
                .eq('id', id)
                .select();
            
            if (error) {
                console.error('Error updating anime:', error);
                setError(`Failed to update anime: ${error.message}`);
            } else if (data) {
                const updatedAnime = data[0] as Anime;
                setAnimes(prev => prev.map(a => a.id === id ? { ...a, ...updatedAnime } : a));
                handleCloseForm();
            }
        } else { // Add new anime
            const { data, error } = await supabase
                .from('animes')
                .insert([{ ...animeData, watched_episodes: [] }])
                .select();

            if (error) {
                console.error('Error adding anime:', error);
                setError(`Failed to add anime: ${error.message}`);
            } else if (data) {
                const newAnime = data[0] as Anime;
                setAnimes(prev => [newAnime, ...prev]);
                handleCloseForm();
            }
        }
    };

    const handleUpdateWatched = async (animeId: string, watched_episodes: number[]) => {
        if (!supabase) return;
        const { error } = await supabase
            .from('animes')
            .update({ watched_episodes })
            .eq('id', animeId);
        
        if (error) {
            console.error('Error updating watched episodes:', error);
            setError(`Failed to update progress: ${error.message}`);
        } else {
            setAnimes(prev => prev.map(a => a.id === animeId ? { ...a, watched_episodes } : a));
        }
    };

    const handleDeleteAnime = async (animeId: string) => {
        if (!supabase) return;
        const { error } = await supabase
            .from('animes')
            .delete()
            .eq('id', animeId);
        
        if (error) {
            console.error('Error deleting anime:', error);
            setError(`Failed to delete anime: ${error.message}`);
        } else {
            setAnimes(prev => prev.filter(a => a.id !== animeId));
        }
    };

    const handleGetRecommendation = async () => {
        setIsRecommending(true);
        setRecommendation(null);
        setError(null);
        try {
            const animeTitles = animes.map(a => a.title);
             if (animeTitles.length === 0) {
                setError("Add some anime to your list first to get a recommendation!");
                setIsRecommending(false);
                return;
            }
            const result = await getAnimeRecommendation(animeTitles);
            setRecommendation(result);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : "Sorry, I couldn't get a recommendation right now.";
            setError(errorMessage);
        } finally {
            setIsRecommending(false);
        }
    };

    const handleOpenAddForm = () => {
        setEditingAnime(null);
        setShowFormModal(true);
    };

    const handleOpenEditForm = (anime: Anime) => {
        setEditingAnime(anime);
        setShowFormModal(true);
    };

    const handleCloseForm = () => {
        setShowFormModal(false);
        setEditingAnime(null);
    };

    const filteredAndSortedAnimes = useMemo(() => {
        return animes
            .filter(anime => {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const titleMatch = anime.title.toLowerCase().includes(lowerCaseSearchTerm);

                if (!titleMatch) return false;

                switch (filter) {
                    case FilterOption.Active:
                         return anime.watched_episodes.length < anime.total_episodes;
                    case FilterOption.Watching:
                        return anime.watched_episodes.length > 0 && anime.watched_episodes.length < anime.total_episodes;
                    case FilterOption.Completed:
                        return anime.watched_episodes.length === anime.total_episodes;
                    case FilterOption.PlanToWatch:
                        return anime.watched_episodes.length === 0;
                    case FilterOption.All:
                    default:
                        return true;
                }
            })
            .sort((a, b) => {
                switch (sort) {
                    case SortOption.Progress:
                        const progressA = (a.watched_episodes.length / a.total_episodes) * 100;
                        const progressB = (b.watched_episodes.length / b.total_episodes) * 100;
                        return progressB - progressA;
                    case SortOption.TitleZA:
                        return b.title.localeCompare(a.title);
                    case SortOption.TitleAZ:
                    default:
                        return a.title.localeCompare(b.title);
                }
            });
    }, [animes, filter, sort, searchTerm]);
    
    if (!isSupabaseConfigured) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4 font-sans">
                <div className="bg-secondary p-8 rounded-2xl border border-gray-800 shadow-2xl text-center max-w-2xl transform hover:scale-105 transition-transform duration-300">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Configuration Error</h1>
                    <p className="text-off-white mb-4">
                        This application requires a connection to a Supabase database.
                    </p>
                    <p className="text-light-gray">
                        To fix this, please set the <code className="bg-primary px-2 py-1 rounded-lg text-accent">SUPABASE_URL</code> and <code className="bg-primary px-2 py-1 rounded-lg text-accent">SUPABASE_ANON_KEY</code> environment variables. You can find these in your Supabase project settings.
                    </p>
                    <p className="text-sm text-gray-500 mt-6">
                        Once configured, refresh the page.
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginScreen onLogin={handleLogin} error={loginError} />;
    }


    return (
        <div className="min-h-screen bg-primary font-sans">
            <Header
                onAddAnime={handleOpenAddForm}
                onGetRecommendation={handleGetRecommendation}
                isRecommending={isRecommending}
            />

            <main className="container mx-auto p-4 md:p-8">
                <ControlsBar
                    filter={filter}
                    setFilter={setFilter}
                    sort={sort}
                    setSort={setSort}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {loading && <div className="flex justify-center mt-16"><LoadingSpinner /></div>}
                
                {error && (
                    <div className="text-center text-red-400 bg-secondary/50 border border-red-800 p-4 rounded-lg my-4 max-w-2xl mx-auto">
                        <h3 className="font-bold mb-2">An Error Occurred</h3>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && filteredAndSortedAnimes.length === 0 && !error && (
                     <div className="text-center text-light-gray mt-16 flex flex-col items-center">
                        <FolderIcon className="h-24 w-24 text-gray-700 mb-4" />
                        <h2 className="text-2xl font-bold text-off-white">Your Watchlist is Empty</h2>
                        <p className="mt-2 max-w-md">Looks like you haven't added any anime yet. Click the "Add Anime" button to get started!</p>
                    </div>
                )}
                
                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAndSortedAnimes.map(anime => (
                            <AnimeCard
                                key={anime.id}
                                anime={anime}
                                onUpdateWatched={handleUpdateWatched}
                                onDelete={handleDeleteAnime}
                                onEdit={handleOpenEditForm}
                            />
                        ))}
                    </div>
                )}
            </main>

            {showFormModal && (
                <AnimeForm
                    onClose={handleCloseForm}
                    onSubmit={handleFormSubmit}
                    animeToEdit={editingAnime}
                />
            )}
             {recommendation && (
                <RecommendationModal
                    recommendation={recommendation}
                    onClose={() => setRecommendation(null)}
                />
            )}
        </div>
    );
};

export default App;
