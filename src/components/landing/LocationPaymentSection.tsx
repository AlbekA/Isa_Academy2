import React from 'react';
import { MapPin, Navigation, Clock, Phone, CreditCard, QrCode, Banknote, Building2, Smartphone, ExternalLink } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../data/academyConfig';

export const LocationPaymentSection: React.FC = () => {
  const paymentIcons: Record<string, any> = {
    'Банковская карта': CreditCard,
    'Оплата по QR-коду': QrCode,
    'Наличные': Banknote,
    'Банковский перевод': Building2,
    'Перевод с карты': Smartphone
  };

  return (
    <section id="location-payment" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2 uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Локация и взаиморасчеты</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Где находится центр и как оплатить
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Удобное расположение в центре г. Ош рядом с парками и ключевыми транспортными развязками.
          </p>
        </div>

        {/* 2-Column Split: Location & Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Address & Landmarks (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase font-mono text-rose-400 font-bold block mb-1">
                  Адрес филиала
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {ACADEMY_CONFIG.address}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  г. Ош, Кыргызстан · 2 этаж (вывеска «ISA INTERNATIONAL»)
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-rose-600/10 border border-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
            </div>

            {/* Landmarks List */}
            <div className="mb-6">
              <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">
                Ключевые городские ориентиры:
              </h4>
              <div className="space-y-3">
                {ACADEMY_CONFIG.landmarks.map((lm, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2.5 text-slate-200 font-medium">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <span>{lm.name}</span>
                    </div>
                    <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                      {lm.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours & Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">График работы:</span>
                  <span>{ACADEMY_CONFIG.workingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Телефон / WhatsApp:</span>
                  <a href={`tel:${ACADEMY_CONFIG.phoneRaw}`} className="text-rose-400 hover:underline">
                    {ACADEMY_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Map / Directions Link Button */}
            <div className="mt-6 pt-4 flex flex-wrap gap-3">
              <a
                href={ACADEMY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
              >
                <span>Связаться по WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://2gis.kg/osh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
              >
                <span>Открыть в 2ГИС Ош</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Payment Methods (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <span className="text-xs uppercase font-mono text-amber-400 font-bold block mb-1">
              Условия и взаиморасчеты
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Способы оплаты
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Оплачивайте обучение любым удобным способом без скрытых комиссий с получением чека.
            </p>

            <div className="space-y-3">
              {ACADEMY_CONFIG.paymentMethods.map((pm, idx) => {
                const Icon = paymentIcons[pm.title] || CreditCard;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white">{pm.title}</h5>
                        <p className="text-[11px] text-slate-400">{pm.desc}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {pm.badge}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-rose-300 block mb-1">Гарантия возврата:</span>
              Если после первого оплаченного урока вы решите, что формат вам не подходит — вернем 100% средств без лишних вопросов.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
