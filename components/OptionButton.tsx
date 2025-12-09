import React from 'react';

interface OptionButtonProps {
  label: string;
  onClick: () => void;
  selected?: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ label, onClick, selected }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group
        flex items-center justify-between relative overflow-hidden shadow-sm
        ${selected 
          ? 'bg-christmas-green border-christmas-green text-white font-semibold shadow-md transform scale-[1.02]' 
          : 'bg-white border-christmas-green/30 text-slate-700 hover:border-christmas-green hover:text-christmas-green hover:shadow-md'
        }
      `}
    >
      <span className="font-medium text-base relative z-10">{label}</span>
      <div className={`
        w-5 h-5 rounded-full border-2 flex items-center justify-center relative z-10 transition-colors
        ${selected 
          ? 'border-white bg-white' 
          : 'border-christmas-green/30 group-hover:border-christmas-green'
        }
      `}>
        {selected && <div className="w-2.5 h-2.5 bg-christmas-green rounded-full"></div>}
      </div>
    </button>
  );
};