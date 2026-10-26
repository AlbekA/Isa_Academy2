import React from 'react';
import { Star, MessageSquare, Quote, ShieldCheck, Check } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../data/academyConfig';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      author: "Айгерим Б.",
      role: "Студентка курса General English",
      rating: 5,
      date: "Февраль 2026",
      text: "Иса Академияга чоң рахмат! Бул жерден жөн гана билим эмес, чыныгы өзүңө болгон ишенимди жана эркин сүйлөө практикасын аласың. Мугалимдер өтө сылык, аудиториялары абдан ыңгайлуу!",
      translation: "(Большое спасибо Иса Академии! Здесь получают не просто знания, а настоящую уверенность в себе и практику свободного общения. Учителя очень вежливые, кабинеты уютные!)",
      lang: "ky"
    },
    {
      author: "Азамат Исмаилов",
      role: "Выпускник курса подготовки к IELTS (Score: 7.0)",
      rating: 5,
      date: "Январь 2026",
      text: "Готовился к IELTS с уровня Intermediate. За 3 месяца интенсивных занятий и регулярных Mock-тестов сдал на 7.0 с первого раза! Огромная благодарность преподавателям за разбор критериев Writing и Speaking.",
      lang: "ru"
    },
    {
      author: "Нурлан Кадыров",
      role: "Курс немецкого языка (B1 / Ausbildung)",
      rating: 5,
      date: "Февраль 2026",
      text: "Учу немецкий язык с нуля для программы дуального обучения Ausbildung в Германии. Всё чётко структурировано, понятные правила грамматики и много разговорной речи. Рекомендую всем в Оше!",
      lang: "ru"
    },
    {
      author: "Dr. Farhan Khan",
      role: "Medical Student (Course: Russian for Clinical Practice)",
      rating: 5,
      date: "Март 2026",
      text: "As an international medical student in Osh, Russian was essential for clinical hospital rounds. Isa Academy made medical terms and patient conversations so natural and easy to practice. Best language school!",
      lang: "en"
    }
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2 uppercase tracking-wider">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Социальное доказательство и репутация</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Рейтинг 5.0 на 2ГИС — результат, проверенный учениками
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              30 проверенных оценок и 25 подробных отзывов в карточке 2ГИС г. Ош. Реальные истории успеха наших выпускников.
            </p>
          </div>

          {/* 2GIS Rating Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
              5.0
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-bold text-white">Высший балл на 2ГИС Ош</p>
              <p className="text-slate-400">30 проверенных оценок из 30</p>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-7 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-rose-500/30 absolute -top-2 -left-2 -z-0" />
                  <p className="relative z-10 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    «{rev.text}»
                  </p>
                  {rev.translation && (
                    <p className="text-xs text-slate-400 mt-2 italic leading-relaxed">
                      {rev.translation}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                  <p className="text-xs text-slate-400">{rev.role}</p>
                </div>
                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Проверенный отзыв 2ГИС
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
