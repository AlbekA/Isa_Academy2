import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Как проходит первый бесплатный пробный урок?",
      a: "На пробном занятии вы знакомитесь с преподавателем и учебной группой, проходите короткое устное тестирование для определения уровня (A1–C1) и сразу участвуете в разговорных упражнениях. Это позволяет лично оценить методику, комфорт аудиторий и дружелюбную атмосферу до внесения оплаты."
    },
    {
      q: "Какие языки вы преподаете в центре в Оше?",
      a: "В Isa Academy открыты направления: Английский язык (General English, интенсивный IELTS, разговорный клуб), Немецкий язык (A1–B2, подготовка к Goethe-Zertifikat и программе Ausbildung) и Русский язык (РКИ для иностранных студентов, деловой и школьный русский)."
    },
    {
      q: "Помогает ли Isa Academy поступить в Германию по программе Ausbildung?",
      a: "Да, наш международный департамент ISA INTERNATIONAL готовит студентов с нуля до уровней B1 и B2, необходимых для официального заключения контракта Ausbildung в Германии (медицина, отельный бизнес, IT). Мы также помогаем в подготовке резюме Europass и прохождении визового интервью."
    },
    {
      q: "Сколько человек обучается в группе?",
      a: "Мы строго ограничиваем размер групп до 6–8 человек (максимум 10). Благодаря этому преподаватель успевает уделить внимание каждому студенту, и вы говорите на иностранном языке не менее 80% времени каждого урока."
    },
    {
      q: "Что происходит, если я пропущу занятие?",
      a: "При предупреждении администратора за 4 часа до начала занятия ваш урок не сгорает. Вы можете отработать материал в параллельной группе подходящего уровня либо получить индивидуальные пояснения и конспект от преподавателя."
    },
    {
      q: "Где именно расположен центр и как до него добраться?",
      a: "Наш адрес: г. Ош, ул. Ташкентская, дом 28/1, 2 этаж. Мы находимся всего в 300 метрах от Сквера имени Барпы Алыкулова и в 350 метрах от перекрестка улиц Насирдина Исанова и Ташкентской. Перед зданием есть удобная парковка."
    },
    {
      q: "Какие способы оплаты вы принимаете?",
      a: "Поддерживаются все 5 способов: наличные в кассу на 2 этаже с чеком, банковские карты (Visa, Mastercard, Элкарт через терминал), оплата по QR-коду (МБанк, О!Деньги, Optima24, Бакай) и безналичный перевод для организаций."
    },
    {
      q: "Выдается ли сертификат по окончании уровня?",
      a: "Да, после успешной сдачи финального теста (минимум 75% правильных ответов) студенту вручается официальный двуязычный сертификат Isa Academy с указанием пройденного уровня по общеевропейской шкале CEFR и количества академических часов."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Ответы на частые вопросы</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Часто задаваемые вопросы (FAQ)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Всё, что важно знать о записи, методике, гарантиях и расписании занятий.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-rose-400 transition-colors min-h-[48px]"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <span className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
