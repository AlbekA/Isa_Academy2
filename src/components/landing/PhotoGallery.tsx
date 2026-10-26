import React from 'react';
import { Camera, MapPin, Users, Award, CheckCircle2 } from 'lucide-react';
import { ACADEMY_CONFIG } from '../../data/academyConfig';

export const PhotoGallery: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-950 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2 uppercase tracking-wider">
            <Camera className="w-4 h-4" />
            <span>Реальные фотографии Isa Academy</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Учитесь в комфортных и современных аудиториях
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Наш образовательный центр расположен в г. Ош по ул. Ташкентская, 28/1 (2 этаж). 
            Просторные кондиционированные классы, профессиональное оборудование и дружелюбная атмосфера.
          </p>
        </div>

        {/* 2-Photo Grid with detailed captions and trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Reception & International Department */}
          <div className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl flex flex-col justify-between">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img
                src={ACADEMY_CONFIG.photos.reception}
                alt="Зона ресепшн и международный отдел ISA INTERNATIONAL в Оше"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>ул. Ташкентская, 28/1, 2 этаж</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Ресепшн и консультации ISA INTERNATIONAL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Здесь мы встречаем студентов, проводим бесплатное устное тестирование уровня, 
                подбираем удобное расписание и консультируем по программам поступления за границу.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Удобная зона ожидания
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Оплата картой и QR
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Classroom & Study Process */}
          <div className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl flex flex-col justify-between">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img
                src={ACADEMY_CONFIG.photos.classroom}
                alt="Учебная аудитория Isa Academy во время занятий"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Малые группы до 8–10 человек</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Живая коммуникация и практические уроки
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Круглый стол для командных дебатов, мультимедийные экраны для аудирования, 
                комфортные стулья и мотивирующая атмосфера для преодоления языкового барьера.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  80% разговорной практики
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Субботний Speaking Club
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
