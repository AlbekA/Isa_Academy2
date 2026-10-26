import { DialogItem, LeadSubmission } from '../types';

const DIALOG_STORAGE_KEY = 'isa_academy_last_two_dialogs';
const LEADS_STORAGE_KEY = 'isa_academy_leads';

/**
 * Requirement: "сохраняй в истории последние два диалога"
 * Strictly preserves the last 2 dialogues in session/localStorage.
 */
export function getSavedDialogues(): DialogItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DIALOG_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, 2);
    }
    return [];
  } catch (e) {
    console.error('Error reading dialog history', e);
    return [];
  }
}

export function saveDialogue(item: Omit<DialogItem, 'id' | 'timestamp'>): DialogItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedDialogues();
    const newEntry: DialogItem = {
      ...item,
      id: 'dlg-' + Date.now(),
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    // Filter out identical query if repeated, and strictly keep the last 2
    const filtered = current.filter(d => d.query.toLowerCase() !== item.query.toLowerCase());
    const updated = [newEntry, ...filtered].slice(0, 2);

    localStorage.setItem(DIALOG_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('isa_dialogues_updated', { detail: updated }));
    return updated;
  } catch (e) {
    console.error('Error saving dialogue', e);
    return [];
  }
}

export function clearDialogues(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DIALOG_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('isa_dialogues_updated', { detail: [] }));
}

/**
 * Lead management storage & export
 */
export function saveLead(leadData: Omit<LeadSubmission, 'id' | 'createdAt'>): LeadSubmission {
  const lead: LeadSubmission = {
    ...leadData,
    id: 'lead-' + Date.now(),
    createdAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    const leads: LeadSubmission[] = raw ? JSON.parse(raw) : [];
    leads.unshift(lead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving lead', e);
  }

  return lead;
}

export function getSavedLeads(): LeadSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
