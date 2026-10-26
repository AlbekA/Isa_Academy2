import React, { useState } from 'react';
import { X, Copy, Check, FileText, Calendar, Tag, ArrowLeft, BookmarkCheck, ExternalLink } from 'lucide-react';
import { SourceDocument } from '../../types';

interface SourceDetailModalProps {
  source: SourceDocument | null;
  onClose: () => void;
  onApplyForCourse?: (courseTitle: string) => void;
}

export const SourceDetailModal: React.FC<SourceDetailModalProps> = ({
  source,
  onClose,
  onApplyForCourse
}) => {
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!source) return null;

  const handleCopyQuote = (text: string, id: string) => {
    navigator.clipboard.writeText(`«${text}» — Источник: Isa Academy (${source.title})`);
    setCopiedQuoteId(id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}#source-${source.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto flex flex-col"
        role="dialog"
        aria-labelledby="source-detail-title"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/60 rounded-xl min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад к поиску</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors min-h-[44px]"
              title="Скопировать ссылку на документ"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Скопировано!' : 'Ссылка'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Source Header Info */}
        <div className="mb-6">
          {/* Metadata unboxed text with separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
            <span className="text-rose-400 font-semibold">{source.category}</span>
            <span aria-hidden="true">·</span>
            <span className="uppercase font-mono text-[11px] text-slate-500">.{source.type}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {source.date}
            </span>
            {source.metadata?.tuition && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-semibold">{source.metadata.tuition}</span>
              </>
            )}
          </div>

          <h2 id="source-detail-title" className="text-xl sm:text-2xl font-bold text-white mb-3">
            {source.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {source.description}
          </p>
        </div>

        {/* Key Attributes Grid if available */}
        {source.metadata && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-xs">
            {source.metadata.level && (
              <div>
                <span className="text-slate-400 block mb-0.5">Уровни:</span>
                <span className="font-semibold text-slate-200">{source.metadata.level}</span>
              </div>
            )}
            {source.metadata.duration && (
              <div>
                <span className="text-slate-400 block mb-0.5">Длительность:</span>
                <span className="font-semibold text-slate-200">{source.metadata.duration}</span>
              </div>
            )}
            {source.metadata.tuition && (
              <div>
                <span className="text-slate-400 block mb-0.5">Стоимость:</span>
                <span className="font-semibold text-amber-300">{source.metadata.tuition}</span>
              </div>
            )}
          </div>
        )}

        {/* Chunks / Sections breakdown */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
            Фрагменты и цитаты источника ({source.chunks.length}):
          </h3>
          <div className="flex flex-col gap-3">
            {source.chunks.map((chunk) => (
              <div 
                key={chunk.id} 
                className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-rose-400">
                    {chunk.pageOrSection || chunk.title}
                  </span>
                  <button
                    onClick={() => handleCopyQuote(chunk.text, chunk.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 bg-slate-900 px-2 py-1 rounded-md border border-slate-800 transition-colors min-h-[36px]"
                    title="Скопировать цитату"
                  >
                    {copiedQuoteId === chunk.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Цитата скопирована</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Копировать цитату</span>
                      </>
                    )}
                  </button>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">{chunk.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {chunk.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Markdown Text Preview */}
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
            Полный текст документа:
          </h3>
          <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 font-mono text-xs sm:text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
            {source.content}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap gap-1.5 text-xs text-slate-400">
            {source.tags.map((tag, idx) => (
              <span key={idx} className="text-slate-400">
                #{tag}{idx < source.tags.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onApplyForCourse && (
              <button
                onClick={() => {
                  onApplyForCourse(source.title);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all min-h-[44px]"
              >
                Записаться по этой программе
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl transition-colors min-h-[44px]"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
