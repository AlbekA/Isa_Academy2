import React from 'react';
import { Target, Users2, MessageSquare, Award, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenTrialModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenTrialModal }) => {
  const steps = [
    {
      num: "01",
      title: "Бесплатное тестирование уровня",
      desc: "Определяем ваш текущий уровень по шкале CEFR (A1–C1) за 15 минут устной беседы и короткого теста.",
      icon: Target
    },
    {
      num: "02",
      title: "Подбор группы и расписания",
      desc: "Формируем группы от 6 до 8 человек со схожим уровнем. Выбираем утреннее, дневное или вечернее время.",
      icon: Users2
    },
    {
      num: "03",
      title: "80% практики речи на каждом уроке",
      desc: "Никаких скучных лекций. Вы говорите с первых минут, учитесь думать на иностранном языке и снимаете страх ошибок.",
      icon: MessageSquare
    },
    {
      num: "04",
      title: "Сдача экзаменов и сертификат",
      desc: "Каждые 4 недели — срез прогресса. По окончании уровня выдаем сертификат центра и готовим к IELTS / Goethe.",
      icon: Award
    }
  ];

  return (
    <section id="methodology" className="py-16 sm:py-24 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2 uppercase tracking-wider">
            <span>Понятный путь к результату</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Как проходит обучение в Isa Academy
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            От первого знакомства до свободного общения и успешной сдачи международных тестов.
          </p>
        </div>

        {/* 4 Steps Grid (Human editorial numbering without mechanical slashes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl sm:text-2xl font-black text-rose-500/90 tabular-nums">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                      <Icon className="w-5 h-5 text-rose-400" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/80 text-xs text-slate-400">
                  Этап {idx + 1} из 4
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar below steps */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-rose-950/50 via-slate-900 to-slate-950 border border-rose-900/40 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-white">
              Хотите узнать свой точный уровень прямо сейчас?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Пройдите бесплатное 15-минутное тестирование в офисе на ул. Ташкентская 28/1.
            </p>
          </div>
          <button
            onClick={onOpenTrialModal}
            className="w-full sm:w-auto px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all shrink-0 min-h-[48px] flex items-center justify-center gap-2"
          >
            <span>Записаться на тест и пробный урок</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
