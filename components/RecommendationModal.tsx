import React from 'react';
import { Recommendation } from '../types';
import { SparklesIcon } from './Icons';

interface RecommendationModalProps {
    recommendation: Recommendation;
    onClose: () => void;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ recommendation, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="recommendation-title">
            <div className="bg-secondary rounded-xl shadow-2xl p-6 w-full max-w-md m-4 border border-gray-700" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <div className='flex items-center gap-3'>
                      <SparklesIcon className="h-6 w-6 text-brand-purple" />
                      <h2 id="recommendation-title" className="text-2xl font-bold text-off-white">Here's a Suggestion!</h2>
                    </div>
                     <button onClick={onClose} className="text-light-gray hover:text-off-white text-3xl leading-none font-bold" aria-label="Close modal">&times;</button>
                </div>
                <div className="space-y-4 my-6 p-4 bg-primary/50 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-semibold text-accent">{recommendation.title}</h3>
                    <p className="text-light-gray">{recommendation.reason}</p>
                </div>
                <div className="mt-6 text-right">
                     <button onClick={onClose} className="bg-accent hover:bg-accent-hover text-primary font-bold py-2.5 px-5 rounded-lg transition-colors">
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecommendationModal;