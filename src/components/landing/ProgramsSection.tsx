import React, { useState } from 'react';
import { BookOpen, Check, ArrowRight, Clock, Users, Star, Sparkles } from 'lucide-react';

interface ProgramsSectionProps {
  onSelectCourse: (courseName: string) => void;
  onSearchProgram: (keyword: string) => void;
}

interface ProgramItem {
  id: string;
  language: string;
  title: string;
  levels: string;
  duration: string;
  groupSize: string;
  price: string;
  featured?: boolean;
  features: string[];
  searchTag: string;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectCourse,
  onSearchProgram
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'en' | 'de' | 'ru'>('all');

  const programs: ProgramItem[] = [
    {
      id: 'en-general',
      language: 'en',
      title: 'General English (Общий курс)',
      levels: 'A1 (Starter) – B2 (Upper-Intermediate)',
      duration: '3 месяца на уровень (12 уроков/мес)',
      groupSize: '6–8 человек',
      price: '3 500 сом / месяц',
      features: [
        '80% времени урока — разговорная речь и диалоги',
        'Постановка беглого произношения без зубрежки',
        'Бесплатный Speaking Club по субботам',
        'Учебники Oxford и Cambridge с аудио'
      ],
      searchTag: 'General English'
    },
    {
      id: 'en-ielts',
      language: 'en',
      title: 'Интенсивная подготовка к IELTS (6.5–7.5+)',
      levels: 'B1+ до Advanced C1',
      duration: '2.5 – 3 месяца (12 уроков + 2 Mock Tests)',
      groupSize: '4–6 человек',
      price: '4 500 сом / месяц',
      featured: true,
      features: [
        'Детальный разбор всех 4 модулей (Listening, Reading, Writing, Speaking)',
        'Проверка эссе по официальным критериям British Council / IDP',
        'Полноформатные пробные экзамены Mock Tests в реальном тайминге',
        'Подготовка к получению грантов в вузы Европы и США'
      ],
      searchTag: 'IELTS'
    },
    {
      id: 'de-ausbildung',
      language: 'de',
      title: 'Немецкий язык: A1, A2, B1 и Ausbildung',
      levels: 'A1 – B2 (Goethe-Zertifikat / ÖSD)',
      duration: '3 месяца на уровень',
      groupSize: '6–8 человек',
      price: '4 000 сом / месяц',
      featured: true,
      features: [
        'Целевая подготовка к переезду в Германию по Ausbildung',
        'Отработка грамматики и бытовой лексики с первого занятия',
        'Тренировка собеседований с немецкими работодателями',
        'Подготовка пакета документов для немецкого посольства'
      ],
      searchTag: 'Немецкий язык'
    },
    {
      id: 'ru-rki',
      language: 'ru',
      title: 'Русский как иностранный (РКИ) и для студентов',
      levels: 'A1 (с нуля) – B2 (продвинутый)',
      duration: '2 – 4 месяца',
      groupSize: '5–8 человек',
      price: '3 000 сом / месяц',
      features: [
        'Специализированная программа для иностранных студентов Оша',
        'Медицинская терминология и диалоги с пациентами клиник',
        'Преодоление языкового барьера в городе и быту',
        'Индивидуальный график под расписание пар в вузе'
      ],
      searchTag: 'Русский язык'
    },
    {
      id: 'individual',
      language: 'all',
      title: 'Индивидуальные занятия (1-на-1)',
      levels: 'Любой язык (ENG / DEU / RUS)',
      duration: 'Гибкий персональный график',
      groupSize: '1 студент + преподаватель',
      price: '8 500 сом / 12 занятий',
      features: [
        '100% внимания преподавателя к вашим личным целям',
        'Программа под ваши задачи: работа, собеседование, переезд',
        'Возможность переноса уроков без сгорания оплаты',
        'Быстрый старт в любой день недели'
      ],
      searchTag: 'Индивидуальные занятия'
    }
  ];

  const filtered = activeTab === 'all' 
    ? programs 
    : programs.filter(p => p.language === activeTab || p.language === 'all');

  return (
    <section id="programs" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Направления обучения</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Языковые курсы в Isa Academy г. Ош
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
            Выберите направление под свои цели: учёба за рубежом, программа Ausbildung в Германии, карьера или комфортная жизнь.
          </p>
        </div>

        {/* Tab Controls (Functional buttons with click handlers) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
              activeTab === 'all' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Все курсы
          </button>
          <button
            onClick={() => setActiveTab('en')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
              activeTab === 'en' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Английский
          </button>
          <button
            onClick={() => setActiveTab('de')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
              activeTab === 'de' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Немецкий
          </button>
          <button
            onClick={() => setActiveTab('ru')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
              activeTab === 'ru' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Русский
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all ${
              item.featured
                ? 'bg-slate-900/90 border-2 border-rose-600/80 shadow-2xl shadow-rose-950/40'
                : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 shadow-md'
            }`}
          >
            {item.featured && (
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Популярный выбор</span>
              </div>
            )}

            <div>
              {/* Metadata unboxed text with separators */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                <span className="text-rose-400 font-semibold">{item.levels}</span>
                <span aria-hidden="true">·</span>
                <span>{item.groupSize}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                {item.title}
              </h3>

              <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-slate-800">
                <span className="text-2xl font-black text-white tabular-nums tracking-tight">
                  {item.price}
                </span>
              </div>

              <div className="space-y-2.5 mb-6">
                {item.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2 shrink-0">
              <button
                onClick={() => onSelectCourse(item.title)}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md transition-all min-h-[44px]"
              >
                Записаться на пробный урок
              </button>
              
              <button
                onClick={() => onSearchProgram(item.searchTag)}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 min-h-[38px]"
              >
                <span>Найти программу и план в базе</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
