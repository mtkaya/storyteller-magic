import React from 'react';
import { SUBSCRIPTION_PLANS } from '../data';

interface SubscriptionProps {
  onBack: () => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark pb-8">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={onBack} className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="px-6 pb-6 text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/20 mb-4">
           <span className="material-symbols-outlined text-3xl text-primary">diamond</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Unlock the Magic</h1>
        <p className="text-white/60 text-sm">Create unlimited stories and let your imagination soar without limits.</p>
      </div>

      <div className="flex flex-col gap-4 px-4 overflow-y-auto">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative rounded-3xl p-6 border ${plan.isPopular ? 'border-secondary/50 shadow-[0_0_30px_-10px_rgba(127,19,236,0.3)]' : 'border-white/10'} ${plan.color}`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-xs text-white/70">{plan.period}</span>}
                </div>
              </div>
              <div className="size-8 rounded-full bg-white/20 flex items-center justify-center">
                 <span className="material-symbols-outlined text-white text-sm">
                    {plan.id === 'premium' ? 'workspace_premium' : plan.id === 'pro' ? 'bolt' : 'person'}
                 </span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-white/90">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold text-sm transition-transform active:scale-95 shadow-lg ${plan.id === 'basic' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-bg-dark hover:bg-gray-100'}`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-center text-[10px] text-white/30 mt-6 px-8">
        Recurring billing. Cancel anytime. <br/> By continuing you agree to our Terms of Service.
      </p>
    </div>
  );
};

export default Subscription;