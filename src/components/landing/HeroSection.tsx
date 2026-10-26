import React, { useState } from 'react';
import { Search, Star, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../data/academyConfig';

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onOpenTrialModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchSubmit,
  onOpenTrialModal
}) => {
  const [queryInput, setQueryInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      onSearchSubmit(queryInput.trim());
    }
  };

  const handleChipClick = (chip: string) => {
    setQueryInput(chip);
    onSearchSubmit(chip);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Background Ambient Glows (Subtle, non-distracting) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-rose-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Signal (Editorial unboxed text with typographic separators) */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 font-medium">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>Рейтинг 5.0 на 2ГИС</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Ош, ул. Ташкентская 28/1</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-rose-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Лицензированный центр
          </span>
        </div>

        {/* 2-Column Responsive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Column 1: Value Proposition & Hero Search (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5 [text-wrap:balance]">
              Освойте иностранный язык в Оше{' '}
              <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                за 3–6 месяцев
              </span>{' '}
              с гарантией результата
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Английский, немецкий и русский языки от уровня A1 до подготовки к IELTS и Goethe-Zertifikat. 
              80% разговорной практики в малых группах на Ташкентской 28/1. Найдите ответ по расписанию и тарифам за 5 секунд.
            </p>

            {/* Quick Knowledge Search Bar */}
            <div className="w-full max-w-2xl mb-5">
              <form 
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl shadow-black/60 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all"
              >
                <div className="pl-3 pr-2 text-rose-400">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Спросите: стоимость курсов, IELTS, немецкий A1..."
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base px-2 py-2.5 focus:outline-none min-h-[44px]"
                  style={{ fontSize: '16px' }} // Ensures no mobile iOS autozoom
                />
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5 min-h-[44px]"
                >
                  <span>Найти</span>
                  <ArrowRight className="w-4 h-4 hidden sm:inline" />
                </button>
              </form>
            </div>

            {/* Interactive Query Chips */}
            <div className="w-full mb-8">
              <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Быстрые вопросы по источникам:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ACADEMY_CONFIG.popularQueries.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="px-3 py-1.5 text-xs text-slate-300 bg-slate-900/70 hover:bg-slate-800 hover:text-white border border-slate-800 rounded-lg transition-colors whitespace-nowrap min-h-[38px] flex items-center"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenTrialModal}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-950 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
              >
                Записаться на бесплатный пробный урок
              </button>
              
              <a
                href="#programs"
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors min-h-[48px]"
              >
                Все программы и цены
              </a>
            </div>

          </div>

          {/* Column 2: Visual Real Photo Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              
              {/* Primary Real Photo: ISA INTERNATIONAL Reception in Osh */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <img
                  src={ACADEMY_CONFIG.photos.reception}
                  alt="Ресепшн Isa Academy в Оше — ISA INTERNATIONAL"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                
                {/* Floating Real Proof Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Isa Academy / ISA INTERNATIONAL</h4>
                      <p className="text-xs text-slate-300">ул. Ташкентская 28/1, 2 этаж</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-amber-300">5.0 (30 оценок)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Classroom Thumbnail Preview */}
              <div className="p-4 bg-slate-950 flex items-center gap-3 border-t border-slate-800/80">
                <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                  <img
                    src={ACADEMY_CONFIG.photos.classroom}
                    alt="Учебная аудитория Isa Academy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-200">Живые уроки в мини-группах</p>
                  <p className="text-slate-400">Каждый студент говорит 80% времени занятия</p>
                </div>
              </div>

            </div>

            {/* Decorative Location Pin Card */}
            <div className="hidden sm:flex items-center gap-2.5 absolute -bottom-4 -left-4 bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-xl shadow-xl text-xs font-medium text-slate-200">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>300 м от сквера им. Барпы Алыкулова</span>
            </div>

          </div>

        </div>

        {/* Full-width 4-Metric Proof Row Below Hero */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {ACADEMY_CONFIG.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-slate-300 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
