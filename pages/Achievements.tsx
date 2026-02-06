import React from 'react';
import { BADGES } from '../data';

const Achievements: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark bg-star-dust pb-24">
      <div className="sticky top-0 z-40 bg-bg-dark/80 backdrop-blur-md p-4 flex items-center justify-center border-b border-white/5">
         <h2 className="text-white text-xl font-bold">Achievements</h2>
      </div>

      {/* Stats */}
      <div className="flex gap-4 p-4">
         <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-2">
                 <span className="material-symbols-outlined text-primary">auto_stories</span>
                 <span className="text-white/60 text-xs font-bold uppercase">Stories Read</span>
             </div>
             <p className="text-3xl font-bold text-white">12</p>
         </div>
         <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-2">
                 <span className="material-symbols-outlined text-primary">stars</span>
                 <span className="text-white/60 text-xs font-bold uppercase">Sleep Score</span>
             </div>
             <p className="text-3xl font-bold text-white">450</p>
         </div>
      </div>

      <div className="px-4 pt-4 pb-2">
         <h3 className="text-white text-lg font-bold">Your Badges</h3>
         <p className="text-white/40 text-xs">Read more stories to unlock magical rewards!</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
          {BADGES.map(badge => (
              <div key={badge.id} className={`flex flex-col items-center gap-3 text-center p-4 rounded-2xl border relative overflow-hidden ${badge.isLocked ? 'bg-white/5 border-white/5 opacity-60 grayscale' : 'bg-primary/5 border-primary/30 shadow-[0_4px_20px_-4px_rgba(238,140,43,0.15)]'}`}>
                  {/* Watercolor effect background for unlocked */}
                  {!badge.isLocked && <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none"></div>}
                  
                  <div className="relative size-20 rounded-full flex items-center justify-center bg-bg-card border-4 border-white/10 shadow-inner">
                      <span className={`material-symbols-outlined text-4xl ${badge.isLocked ? 'text-white/20' : 'text-white drop-shadow-md'}`}>{badge.icon}</span>
                      {!badge.isLocked && <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${badge.colorClass} opacity-20`}></div>}
                  </div>
                  
                  <div className="relative z-10">
                      <p className="text-white font-bold text-sm">{badge.name}</p>
                      <p className={`text-xs mt-1 ${badge.isLocked ? 'text-white/30' : 'text-primary'}`}>{badge.description}</p>
                  </div>

                  {badge.isLocked && (
                      <div className="absolute top-2 right-2">
                          <span className="material-symbols-outlined text-white/20 text-sm">lock</span>
                      </div>
                  )}
              </div>
          ))}
      </div>
    </div>
  );
};

export default Achievements;