import React from 'react';
import { X } from 'lucide-react';
import { LeadFormSection } from './LeadFormSection';

interface TrialLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
}

export const TrialLessonModal: React.FC<TrialLessonModalProps> = ({
  isOpen,
  onClose,
  initialCourse
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="trial-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Закрыть модальное окно"
        >
          <X className="w-5 h-5" />
        </button>

        <LeadFormSection 
          initialCourse={initialCourse} 
          onSuccess={() => {
            // keep open for message, or auto-close after delay
          }} 
        />
      </div>
    </div>
  );
};
