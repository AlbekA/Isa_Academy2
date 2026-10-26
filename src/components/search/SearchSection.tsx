import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Filter, Sparkles, BookOpen, Clock, ArrowRight, Quote, FileText, Check, Copy, History, SlidersHorizontal } from 'lucide-react';
import { searchSources, generateSmartAnswer } from '../../lib/searchEngine';
import { saveDialogue, getSavedDialogues } from '../../lib/storage';
import { CourseCategory, SourceType, SourceDocument, SearchResult, SmartAnswer, DialogItem } from '../../types';
import { ACADEMY_CONFIG } from '../../data/academyConfig';
import { ACADEMY_SOURCES } from '../../data/sources';

interface SearchSectionProps {
  externalQuery?: string;
  onOpenSourceDetail: (source: SourceDocument) => void;
  onOpenHistory: () => void;
  onApplyForCourse: (course: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  externalQuery,
  onOpenSourceDetail,
  onOpenHistory,
  onApplyForCourse
}) => {
  const [query, setQuery] = useState(externalQuery || '');
  const [category, setCategory] = useState<CourseCategory | 'all'>('all');
  const [formatType, setFormatType] = useState<SourceType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'title'>('relevance');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync with external query prop (e.g. from Hero or quick chips)
  useEffect(() => {
    if (externalQuery !== undefined && externalQuery !== query) {
      setQuery(externalQuery);
    }
  }, [externalQuery]);

  // Execute Search
  const searchResults = useMemo(() => {
    return searchSources({
      query,
      category,
      type: formatType,
      sortBy
    });
  }, [query, category, formatType, sortBy]);

  // Generate Smart Answer
  const smartAnswer = useMemo(() => {
    return generateSmartAnswer(query, searchResults);
  }, [query, searchResults]);

  // Requirement: "сохраняй в истории последние два диалога"
  // Whenever user searches with a substantial query (>= 3 chars) and results are found,
  // save this dialogue into the strictly capped 2-item history!
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length >= 3 && searchResults.length > 0 && smartAnswer) {
      const topResult = searchResults[0];
      saveDialogue({
        query: trimmed,
        answerSummary: smartAnswer.summary,
        topSourceTitle: topResult.source.title,
        topSourceSlug: topResult.source.slug,
        resultsCount: searchResults.length
      });
    }
  }, [query, searchResults.length, smartAnswer]);

  const handleCopyQuote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categoriesList: { label: string; value: CourseCategory | 'all' }[] = [
    { label: 'Все категории', value: 'all' },
    { label: 'Английский язык', value: 'Английский язык' },
    { label: 'Немецкий язык', value: 'Немецкий язык' },
    { label: 'Русский язык', value: 'Русский язык' },
    { label: 'Тарифы и оплата', value: 'Тарифы и оплата' },
    { label: 'Методология', value: 'Методология и правила' },
    { label: 'О центре и локации', value: 'О центре и локации' }
  ];

  return (
    <section id="knowledge-search" className="py-14 sm:py-20 bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1.5 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>База знаний и программа курсов</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Интеллектуальный поиск по материалам Isa Academy
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
              Мгновенные ответы по учебным программам, ценам, расписанию, экзаменам и правилам центра в г. Ош.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenHistory}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/60 rounded-xl transition-colors min-h-[44px]"
            >
              <History className="w-4 h-4 text-amber-400" />
              <span>История 2 диалогов</span>
            </button>

            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded-xl min-h-[44px]"
            >
              <SlidersHorizontal className="w-4 h-4 text-rose-400" />
              <span>Фильтры</span>
            </button>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative mb-6">
          <div className="relative flex items-center bg-slate-950 border border-slate-700 rounded-2xl p-2.5 shadow-xl focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
            <div className="pl-3 pr-2 text-rose-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Введите запрос: стоимость обучения, подготовка к IELTS, немецкий A1, адрес..."
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base px-2 py-2 focus:outline-none min-h-[44px]"
              style={{ fontSize: '16px' }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center mr-1"
                aria-label="Очистить поиск"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className={`mb-8 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
            
            {/* Category Segmented Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categoriesList.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors min-h-[38px] whitespace-nowrap ${
                    category === cat.value
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sorting and Format Filters */}
            <div className="flex items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-rose-500 min-h-[38px]"
                >
                  <option value="relevance">По релевантности</option>
                  <option value="date">По дате обновления</option>
                  <option value="title">По названию (А-Я)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Формат:</span>
                <select
                  value={formatType}
                  onChange={(e) => setFormatType(e.target.value as any)}
                  className="bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-rose-500 min-h-[38px]"
                >
                  <option value="all">Все форматы</option>
                  <option value="md">Markdown (.md)</option>
                  <option value="pdf">PDF (.pdf)</option>
                  <option value="docx">DOCX (.docx)</option>
                  <option value="table">Таблицы цен</option>
                  <option value="json">JSON (.json)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Smart Concise Answer Box ("Краткий ответ") */}
        {smartAnswer && (
          <div className="mb-8 p-5 sm:p-6 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border border-rose-900/50 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Краткий ответ на основе первоисточников Isa Academy
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                Точность: 100% без выдумок
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed mb-4">
              {smartAnswer.summary}
            </p>

            {/* Direct Quote Box */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 mb-4 text-xs sm:text-sm text-slate-300 italic flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{smartAnswer.directQuote}</span>
              </div>
              <button
                onClick={() => handleCopyQuote(smartAnswer.directQuote, 'smart-quote')}
                className="text-[11px] text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0 min-h-[36px]"
                title="Скопировать точную цитату"
              >
                {copiedId === 'smart-quote' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Cited Sources */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Цитируемые документы:</span>
              {smartAnswer.citedSources.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const found = ACADEMY_SOURCES.find(item => item.id === s.sourceId);
                    if (found) onOpenSourceDetail(found);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors min-h-[36px]"
                >
                  <FileText className="w-3 h-3 text-rose-400" />
                  <span>{s.title}</span>
                  {s.section && <span className="text-[11px] text-slate-400">({s.section})</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span>
              Найдено источников: <strong className="text-white font-mono">{searchResults.length}</strong>
            </span>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-rose-400 hover:underline min-h-[44px] flex items-center"
              >
                Сбросить поиск
              </button>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="py-14 text-center bg-slate-950/50 rounded-2xl border border-slate-800 p-6">
              <BookOpen className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-slate-200 mb-1">
                Ничего не найдено по запросу «{query}»
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                Попробуйте изменить формулировку, выбрать другую категорию или использовать один из популярных запросов.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {ACADEMY_CONFIG.popularQueries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(q)}
                    className="px-3 py-1.5 text-xs text-slate-300 bg-slate-900 border border-slate-700 rounded-lg hover:border-rose-500 transition-colors min-h-[38px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map(({ source, score, matchedChunks }) => {
                const primaryChunk = matchedChunks[0];
                return (
                  <div
                    key={source.id}
                    className="group bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all shadow-sm hover:shadow-lg"
                  >
                    {/* Source Card Metadata (Zero-pill discipline: unboxed text with separators) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                      <span className="text-rose-400 font-semibold">{source.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase font-mono text-[11px] text-slate-500">.{source.type}</span>
                      <span aria-hidden="true">·</span>
                      <span>{source.date}</span>
                      {source.metadata?.tuition && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-300 font-semibold">{source.metadata.tuition}</span>
                        </>
                      )}
                      {score > 0 && query && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[11px] font-mono text-emerald-400">
                            совпадение: {Math.min(100, score)}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Source Title */}
                    <h3 
                      onClick={() => onOpenSourceDetail(source)}
                      className="text-base sm:text-lg font-bold text-white group-hover:text-rose-400 transition-colors cursor-pointer mb-2"
                    >
                      {source.title}
                    </h3>

                    {/* Snippet with match highlighting */}
                    <div className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                      {primaryChunk ? (
                        <p 
                          dangerouslySetInnerHTML={{ 
                            __html: primaryChunk.highlightedSnippet 
                          }} 
                        />
                      ) : (
                        <p>{source.description}</p>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/70">
                      <div className="flex flex-wrap gap-1.5 text-xs text-slate-400">
                        {source.tags.slice(0, 4).map((tag, i) => (
                          <span key={i} className="text-slate-400">
                            #{tag}{i < Math.min(3, source.tags.length - 1) ? ' ·' : ''}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onOpenSourceDetail(source)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors min-h-[44px]"
                        >
                          <span>Читать источник</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          onClick={() => onApplyForCourse(source.title)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors min-h-[44px]"
                        >
                          Записаться
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
