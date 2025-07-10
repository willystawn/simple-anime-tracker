import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { LockClosedIcon } from './Icons';

interface LoginScreenProps {
    onLogin: (password: string) => void;
    error: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shake, setShake] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (error) {
            setShake(true);
            setTimeout(() => setShake(false), 500); // Duration of the shake animation
            setPassword(''); // Clear password on error
        }
    }, [error]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!password || isSubmitting) return;
        setIsSubmitting(true);
        // Simulate network delay for better user feedback
        setTimeout(() => {
            onLogin(password);
            setIsSubmitting(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4 font-sans">
            <style>{`
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                .shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
            <div className={`w-full max-w-sm ${shake ? 'shake' : ''}`}>
                 <div className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-off-white to-light-gray bg-clip-text text-transparent">
                        My Anime Tracker
                    </h1>
                </div>
                <div ref={formRef} className="bg-secondary p-8 rounded-2xl border border-gray-800 shadow-2xl transition-all">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-light-gray text-sm font-bold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <LockClosedIcon className="h-5 w-5 text-gray-500" />
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-primary border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-off-white focus:outline-none focus:ring-2 focus:ring-accent-hover focus:border-accent-hover transition"
                                    required
                                    placeholder="Enter password"
                                    aria-describedby="error-message"
                                />
                            </div>
                        </div>

                        {error && (
                            <p id="error-message" className="text-red-400 text-sm text-center mb-4" role="alert">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || !password}
                            className="w-full bg-accent hover:bg-accent-hover text-primary font-bold py-3 px-5 rounded-lg transition-all duration-300 disabled:bg-accent/50 disabled:cursor-not-allowed flex items-center justify-center mt-4"
                        >
                            {isSubmitting ? 'Unlocking...' : 'Unlock'}
                        </button>
                    </form>
                </div>
                 <p className="text-center text-sm text-gray-500 mt-6">
                    This tracker is password protected.
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
