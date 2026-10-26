import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { SearchSection } from './components/search/SearchSection';
import { ProgramsSection } from './components/landing/ProgramsSection';
import { PhotoGallery } from './components/landing/PhotoGallery';
import { HowItWorks } from './components/landing/HowItWorks';
import { LocationPaymentSection } from './components/landing/LocationPaymentSection';
import { ReviewsSection } from './components/landing/ReviewsSection';
import { FaqSection } from './components/landing/FaqSection';
import { LeadFormSection } from './components/landing/LeadFormSection';
import { MobileStickyBar } from './components/ui/MobileStickyBar';
import { SourceDetailModal } from './components/search/SourceDetailModal';
import { DialogHistoryDrawer } from './components/search/DialogHistoryDrawer';
import { TrialLessonModal } from './components/landing/TrialLessonModal';
import { SourceDocument, DialogItem } from './types';
import { getSavedDialogues } from './lib/storage';

export default function App() {
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<SourceDocument | null>(null);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState<string>('');
  const [dialogues, setDialogues] = useState<DialogItem[]>([]);

  useEffect(() => {
    setDialogues(getSavedDialogues());
    const handleUpdate = (e: CustomEvent<DialogItem[]>) => {
      setDialogues(e.detail || []);
    };
    window.addEventListener('isa_dialogues_updated' as any, handleUpdate);
    return () => {
      window.removeEventListener('isa_dialogues_updated' as any, handleUpdate);
    };
  }, []);

  const handleOpenSearchWithQuery = (query: string = '') => {
    setActiveSearchQuery(query);
    const searchEl = document.getElementById('knowledge-search');
    if (searchEl) {
      searchEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTrialWithCourse = (courseName: string = '') => {
    setPreselectedCourse(courseName);
    setIsTrialModalOpen(true);
  };

  const handleRestoreDialogue = (dialogue: DialogItem) => {
    setActiveSearchQuery(dialogue.query);
    const searchEl = document.getElementById('knowledge-search');
    if (searchEl) {
      searchEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Top Bar adhering to the Top Bar Contract */}
      <Header
        onOpenSearch={handleOpenSearchWithQuery}
        onOpenTrialModal={() => handleOpenTrialWithCourse()}
        onOpenHistoryModal={() => setIsHistoryDrawerOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section with Real Photos & Live Search */}
        <HeroSection
          onSearchSubmit={handleOpenSearchWithQuery}
          onOpenTrialModal={() => handleOpenTrialWithCourse()}
        />

        {/* 2. Interactive Knowledge Search Section */}
        <SearchSection
          externalQuery={activeSearchQuery}
          onOpenSourceDetail={(source) => setSelectedSource(source)}
          onOpenHistory={() => setIsHistoryDrawerOpen(true)}
          onApplyForCourse={handleOpenTrialWithCourse}
        />

        {/* 3. Language Course Programs & Tuition in Osh */}
        <ProgramsSection
          onSelectCourse={handleOpenTrialWithCourse}
          onSearchProgram={handleOpenSearchWithQuery}
        />

        {/* 4. Real Photos Gallery (Office & Classroom at Tashkentskaya 28/1) */}
        <PhotoGallery />

        {/* 5. How It Works (4-Step Progression) */}
        <HowItWorks
          onOpenTrialModal={() => handleOpenTrialWithCourse()}
        />

        {/* 6. Location (Tashkentskaya 28/1) & All 5 Payment Methods */}
        <LocationPaymentSection />

        {/* 7. Real 2GIS Reviews (5.0 Rating, 30 Ratings) */}
        <ReviewsSection />

        {/* 8. Frequently Asked Questions (FAQ) */}
        <FaqSection />

        {/* 9. Final Lead Capture Section */}
        <LeadFormSection
          initialCourse={preselectedCourse}
          onSuccess={() => {}}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Quick Action Bar (<= 15% viewport height) */}
      <MobileStickyBar
        onOpenTrialModal={() => handleOpenTrialWithCourse()}
      />

      {/* Source Detail Full View Modal */}
      <SourceDetailModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
        onApplyForCourse={handleOpenTrialWithCourse}
      />

      {/* Dialog History Drawer (Requirement: сохраняй в истории последние два диалога) */}
      <DialogHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        dialogues={dialogues}
        onSelectDialogue={handleRestoreDialogue}
      />

      {/* Trial Lesson Quick Booking Modal */}
      <TrialLessonModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        initialCourse={preselectedCourse}
      />

    </div>
  );
}
