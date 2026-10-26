import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Phone, History } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../data/academyConfig';
import { getSavedDialogues } from '../../lib/storage';
import { DialogItem } from '../../types';

interface HeaderProps {
  onOpenSearch: (initialQuery?: string) => void;
  onOpenTrialModal: () => void;
  onOpenHistoryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenTrialModal,
  onOpenHistoryModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogues, setDialogues] = useState<DialogItem[]>([]);

  useEffect(() => {
    setDialogues(getSavedDialogues());
    const handleUpdate = (e: CustomEvent<DialogItem[]>) => {
      setDialogues(e.detail || []);
    };
    window.addEventListener('isa_dialogues_updated' as any, handleUpdate);
    return () => {
      window.removeEventListener('isa_dialogues_updated' as any, handleUpdate);
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Clean Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1"
          aria-label="Isa Academy Главная"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
            ISA
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors">
              Isa Academy
            </span>
            <span className="text-[11px] text-slate-400 leading-none">
              Ош · Языковой центр
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Single Line, Desktop) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-slate-300">
          <a href="#programs" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Курсы и языки
          </a>
          <a href="#knowledge-search" className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-rose-400">
            <Search className="w-3.5 h-3.5" />
            Поиск по базе
          </a>
          <a href="#methodology" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Методика
          </a>
          <a href="#location-payment" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Локация и оплата
          </a>
          <a href="#reviews" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Отзывы (5.0)
          </a>
          <a href="#faq" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            FAQ
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Dialog History Button (Requirement: сохраняй в истории последние два диалога) */}
          {dialogues.length > 0 && (
            <button
              onClick={onOpenHistoryModal}
              className="relative hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-rose-500 min-h-[44px]"
              title="Открыть последние 2 сохраненных диалога поиска"
            >
              <History className="w-4 h-4 text-amber-400" />
              <span>Диалоги</span>
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] flex items-center justify-center font-bold">
                {dialogues.length}
              </span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={onOpenTrialModal}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-md shadow-rose-950 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-rose-400 min-h-[44px] whitespace-nowrap"
          >
            Пробный урок
          </button>

          {/* Mobile Menu Toggle (Min touch target 44px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-400 hover:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation (Bottom Sheet / Fullscreen Mobile standard) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-slate-950/95 border-b border-slate-800 p-6 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-base font-semibold text-slate-200">
            <a 
              href="#programs" 
              onClick={closeMobileMenu}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 transition-colors"
            >
              Курсы английского, немецкого и русского
            </a>
            <a 
              href="#knowledge-search" 
              onClick={() => { closeMobileMenu(); onOpenSearch(''); }}
              className="py-2.5 px-3 rounded-lg bg-rose-950/40 text-rose-400 border border-rose-900/40 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Поиск по источникам и ценам
            </a>
            <a 
              href="#methodology" 
              onClick={closeMobileMenu}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 transition-colors"
            >
              Методология и преподаватели
            </a>
            <a 
              href="#location-payment" 
              onClick={closeMobileMenu}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 transition-colors"
            >
              Адрес (Ташкентская 28/1) и Оплата
            </a>
            <a 
              href="#reviews" 
              onClick={closeMobileMenu}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 transition-colors"
            >
              Отзывы 2ГИС (Рейтинг 5.0)
            </a>
            <a 
              href="#faq" 
              onClick={closeMobileMenu}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 transition-colors"
            >
              Частые вопросы (FAQ)
            </a>

            {dialogues.length > 0 && (
              <button
                onClick={() => { closeMobileMenu(); onOpenHistoryModal(); }}
                className="w-full text-left py-2.5 px-3 rounded-lg bg-amber-950/30 text-amber-300 border border-amber-900/30 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-400" />
                  История последних 2 диалогов
                </span>
                <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                  {dialogues.length}
                </span>
              </button>
            )}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <a
                href={`tel:${ACADEMY_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 font-semibold min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-rose-400" />
                {ACADEMY_CONFIG.phone}
              </a>
              <button
                onClick={() => { closeMobileMenu(); onOpenTrialModal(); }}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-900/50 min-h-[48px]"
              >
                Записаться на бесплатный урок
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
