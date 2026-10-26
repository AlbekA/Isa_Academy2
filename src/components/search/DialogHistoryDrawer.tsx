import React from 'react';
import { History, X, Clock, ArrowRight, Trash2, Search, BookOpen } from 'lucide-react';
import { DialogItem } from '../../types';
import { clearDialogues } from '../../lib/storage';

interface DialogHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dialogues: DialogItem[];
  onSelectDialogue: (dialogue: DialogItem) => void;
}

export const DialogHistoryDrawer: React.FC<DialogHistoryDrawerProps> = ({
  isOpen,
  onClose,
  dialogues,
  onSelectDialogue
}) => {
  if (!isOpen) return null;

  const handleClear = () => {
    clearDialogues();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="dialog-history-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 id="dialog-history-title" className="text-lg font-bold text-white">
                История последних 2 диалогов
              </h3>
              <p className="text-xs text-slate-400">
                Сохраненные запросы и ответы поисковой базы
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Закрыть историю"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dialogues List */}
        {dialogues.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Clock className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="font-semibold text-slate-300">История пуста</p>
            <p className="text-xs mt-1 text-slate-400 max-w-xs mx-auto">
              Задайте любой вопрос в поиске, и система сохранит последние 2 диалога для быстрого доступа.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Сохранено диалогов: {dialogues.length} из 2</span>
              <button
                onClick={handleClear}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-1 hover:underline min-h-[44px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Очистить историю
              </button>
            </div>

            {dialogues.map((dlg, idx) => (
              <div
                key={dlg.id || idx}
                className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-amber-400/90 font-semibold">
                    Диалог #{idx + 1}
                  </span>
                  <span>{dlg.timestamp}</span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-1.5">
                    <Search className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>«{dlg.query}»</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                    {dlg.answerSummary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 truncate max-w-[240px]">
                    <BookOpen className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{dlg.topSourceTitle}</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectDialogue(dlg);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors p-1.5 min-h-[44px]"
                  >
                    <span>Восстановить</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors min-h-[44px]"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
