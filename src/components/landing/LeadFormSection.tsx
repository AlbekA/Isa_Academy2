import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Sparkles, Phone, User, Calendar, Clock, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveLead } from '../../lib/storage';
import { ACADEMY_CONFIG } from '../../data/academyConfig';

interface LeadFormSectionProps {
  initialCourse?: string;
  onSuccess?: () => void;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  initialCourse,
  onSuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [course, setCourse] = useState(initialCourse || 'Английский язык (General)');
  const [format, setFormat] = useState<'offline' | 'online'>('offline');
  const [time, setTime] = useState<'morning' | 'afternoon' | 'evening'>('evening');
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(true);
  
  // Honeypot field for anti-spam
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If initialCourse changes from parent (e.g. clicking course card)
  React.useEffect(() => {
    if (initialCourse) {
      setCourse(initialCourse);
    }
  }, [initialCourse]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+996')) {
      val = '+996 ' + val.replace(/\D/g, '');
    }
    setPhone(val);
  };

  const validate = () => {
    const errs: { fullName?: string; phone?: string; consent?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Укажите ваше имя (минимум 2 буквы)';
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      errs.phone = 'Укажите корректный номер телефона (например, +996 707 18 20 03)';
    }

    if (!consent) {
      errs.consent = 'Необходимо согласие на обработку заявки';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot trigger
    if (honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      saveLead({
        fullName: fullName.trim(),
        phone: phone.trim(),
        course,
        format,
        preferredTime: time,
        comment: comment.trim() || undefined
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // Safe fallback
      }

      if (onSuccess) onSuccess();
    }, 600);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with premium border */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-950/60 text-rose-400 border border-rose-900/50 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Первый урок бесплатно</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Запишитесь на бесплатный пробный урок
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Определим ваш уровень, подберем мини-группу и составим персональный план изучения за 1 день.
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-12 px-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Заявка успешно принята!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                Спасибо, {fullName}! Администратор Isa Academy свяжется с вами по номеру <strong className="text-white">{phone}</strong> в течение 15 минут для подтверждения времени урока на ул. Ташкентская 28/1.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFullName('');
                    setPhone('+996 ');
                  }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold rounded-xl transition-colors min-h-[44px]"
                >
                  Отправить еще одну заявку
                </button>
                <a
                  href={ACADEMY_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors min-h-[44px] flex items-center gap-2"
                >
                  <span>Написать нам в WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Anti-spam Honeypot (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_url_check"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {/* Name & Phone in 1 col mobile / 2 col desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Ваше имя *
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Например: Айбек или Алина"
                      className={`w-full bg-slate-900 border rounded-xl pl-10 pr-3 py-3 text-white text-sm focus:outline-none min-h-[48px] transition-colors ${
                        errors.fullName ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-700 focus:border-rose-500'
                      }`}
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Номер телефона / WhatsApp *
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+996 707 18 20 03"
                      className={`w-full bg-slate-900 border rounded-xl pl-10 pr-3 py-3 text-white text-sm focus:outline-none min-h-[48px] transition-colors ${
                        errors.phone ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-700 focus:border-rose-500'
                      }`}
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Интересующий курс
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-3 text-white text-sm focus:outline-none focus:border-rose-500 min-h-[48px]"
                  style={{ fontSize: '16px' }}
                >
                  <option value="Английский язык (General)">Английский язык — General English (A1–C1)</option>
                  <option value="Подготовка к IELTS (6.5–7.5+)">Английский язык — Подготовка к IELTS</option>
                  <option value="Немецкий язык (A1–B1)">Немецкий язык — A1, A2, B1 с нуля</option>
                  <option value="Немецкий B2 / Ausbildung">Немецкий язык — Ausbildung и переезд в Германию</option>
                  <option value="Русский как иностранный (РКИ)">Русский язык — РКИ для иностранных студентов</option>
                  <option value="Индивидуальное обучение 1-на-1">Индивидуальные занятия (1 на 1)</option>
                </select>
              </div>

              {/* Format & Preferred Time in 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Формат занятий
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormat('offline')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all min-h-[44px] ${
                        format === 'offline'
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      Офлайн в Оше
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormat('online')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all min-h-[44px] ${
                        format === 'online'
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      Онлайн
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Удобное время
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTime('morning')}
                      className={`py-2.5 px-1 rounded-xl text-xs font-semibold border transition-all min-h-[44px] ${
                        time === 'morning'
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      Утро
                    </button>
                    <button
                      type="button"
                      onClick={() => setTime('afternoon')}
                      className={`py-2.5 px-1 rounded-xl text-xs font-semibold border transition-all min-h-[44px] ${
                        time === 'afternoon'
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      День
                    </button>
                    <button
                      type="button"
                      onClick={() => setTime('evening')}
                      className={`py-2.5 px-1 rounded-xl text-xs font-semibold border transition-all min-h-[44px] ${
                        time === 'evening'
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      Вечер
                    </button>
                  </div>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-900 border-slate-700 mt-0.5 shrink-0"
                  />
                  <span>
                    Даю согласие на обработку персональных данных и получение обратной связи от Isa Academy для записи на пробный урок.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-rose-400 mt-1">{errors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-rose-600 hover:bg-rose-500 active:scale-[0.99] text-white font-bold text-base rounded-2xl shadow-xl shadow-rose-950 transition-all flex items-center justify-center gap-2 min-h-[52px] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Отправка данных...</span>
                ) : (
                  <>
                    <span>Записаться на бесплатный пробный урок</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Мы не передаем ваши данные третьим лицам. Без спама.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
