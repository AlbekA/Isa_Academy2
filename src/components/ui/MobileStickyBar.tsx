import React from 'react';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../data/academyConfig';

interface MobileStickyBarProps {
  onOpenTrialModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenTrialModal }) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 shadow-2xl safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2 h-12">
        
        {/* WhatsApp Fast Button */}
        <a
          href={ACADEMY_CONFIG.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors min-h-[44px]"
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Direct Call Button */}
        <a
          href={`tel:${ACADEMY_CONFIG.phoneRaw}`}
          className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 min-h-[44px] min-w-[44px]"
          aria-label="Позвонить в академию"
        >
          <Phone className="w-4 h-4 text-rose-400" />
        </a>

        {/* Primary Trial Booking CTA */}
        <button
          onClick={onOpenTrialModal}
          className="flex-[1.5] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950 transition-all min-h-[44px]"
        >
          <CalendarCheck className="w-4 h-4 shrink-0" />
          <span className="truncate">Пробный урок</span>
        </button>

      </div>
    </div>
  );
};
