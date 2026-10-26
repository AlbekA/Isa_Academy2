import React from 'react';
import { Phone, MapPin, Instagram, MessageCircle, Star, Download, ShieldCheck } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../data/academyConfig';
import { getSavedLeads } from '../../lib/storage';

export const Footer: React.FC = () => {
  const handleExportLeads = () => {
    const leads = getSavedLeads();
    if (leads.length === 0) {
      alert('Пока нет сохраненных заявок. Заполните тестовую форму на сайте!');
      return;
    }
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `isa-academy-leads-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-850 pt-16 pb-24 lg:pb-16 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-850">
          
          {/* Brand & Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-white font-black text-lg">
                ISA
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Isa Academy
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed mb-4 max-w-sm">
              Образовательный центр и школа иностранных языков в г. Ош. Подготовка к обучению, работе и международным экзаменам с гарантией результата.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-5">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>5.0 рейтинг на 2ГИС (30 проверенных оценок)</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={ACADEMY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="WhatsApp Isa Academy"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={ACADEMY_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Instagram @isa__academy"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`tel:${ACADEMY_CONFIG.phoneRaw}`}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Позвонить"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Курсы и программы
                </a>
              </li>
              <li>
                <a href="#knowledge-search" className="hover:text-white transition-colors text-rose-400">
                  Поиск по материалам
                </a>
              </li>
              <li>
                <a href="#methodology" className="hover:text-white transition-colors">
                  Как мы обучаем
                </a>
              </li>
              <li>
                <a href="#location-payment" className="hover:text-white transition-colors">
                  Ориентиры и оплата
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Отзывы учеников
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Вопросы и ответы
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contacts (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-4">
              Контакты и адрес в Оше
            </h4>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{ACADEMY_CONFIG.address}</p>
                  <p className="text-xs text-slate-400">Ош, Кыргызстан · 2 этаж</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{ACADEMY_CONFIG.phone}</p>
                  <p className="text-xs text-slate-400">Звонки и WhatsApp (Пн-Сб 08:30-20:30)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Instagram className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{ACADEMY_CONFIG.instagram}</p>
                  <p className="text-xs text-slate-400">Новости, анонсы клубов и сторис</p>
                </div>
              </div>
            </div>

            {/* Admin Export Leads */}
            <div className="mt-6 pt-4 border-t border-slate-850">
              <button
                onClick={handleExportLeads}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors min-h-[38px]"
                title="Скачать принятые заявки в формате JSON"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Экспорт заявок (CRM JSON)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Landmarks */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Isa Academy (ISA INTERNATIONAL). Все права защищены.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Ориентиры: Сквер Барпы Алыкулова (~300м)</span>
            <span aria-hidden="true">·</span>
            <span>Школа №2 им. Жигитова (~600м)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
