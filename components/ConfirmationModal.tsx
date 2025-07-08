import React from 'react';

interface ConfirmationModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onCancel}>
            <div className="bg-secondary rounded-xl shadow-2xl p-8 w-full max-w-md m-4 border border-gray-700" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 text-off-white">{title}</h2>
                <p className="text-light-gray mb-8">{message}</p>
                <div className="flex items-center justify-end gap-4">
                    <button onClick={onCancel} className="text-light-gray bg-primary hover:bg-gray-700 font-bold py-2.5 px-5 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-lg transition-colors">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;