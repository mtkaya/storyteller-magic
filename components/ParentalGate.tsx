import React, { useState } from 'react';

interface ParentalGateProps {
  onUnlock: () => void;
  onClose: () => void;
}

const ParentalGate: React.FC<ParentalGateProps> = ({ onUnlock, onClose }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (answer === '20') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-[#1a1625] rounded-3xl p-6 border border-white/10 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/20 p-4 rounded-full mb-4">
            <span className="material-symbols-outlined text-primary text-4xl">lock_person</span>
          </div>
          
          <h3 className="text-white text-xl font-bold mb-2">Parental Control</h3>
          <p className="text-gray-400 text-sm mb-6">
            Please solve to continue:<br/>
            <span className="text-2xl font-bold text-primary mt-2 block">12 + 8 = ?</span>
          </p>

          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter answer"
            className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-center text-white text-xl font-bold mb-4 focus:outline-none focus:ring-2 focus:ring-primary`}
          />

          <button 
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-primary/20"
          >
            Enter Area
          </button>
          
          <div className="mt-4">
            <button className="text-primary text-sm font-semibold border-2 border-primary/20 px-6 py-2 rounded-full hover:bg-primary/10">
              Hold for 3 seconds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentalGate;