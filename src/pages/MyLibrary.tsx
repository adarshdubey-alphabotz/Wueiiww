import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { manhwaList } from '@/data/mockData';
import ManhwaCard from '@/components/ManhwaCard';
import { BookOpen, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const MyLibrary: React.FC = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<'reading' | 'completed' | 'hold' | 'dropped'>('reading');

  const libraryItems = manhwaList.filter(m => user?.library.includes(m.id));

  const categorized = {
    reading: libraryItems.slice(0, 2),
    completed: libraryItems.slice(2),
    hold: [] as typeof libraryItems,
    dropped: [] as typeof libraryItems,
  };

  const currentTab = categorized[tab];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-display text-5xl sm:text-6xl mb-8 tracking-wider">
            <span className="text-primary">MY</span> LIBRARY
          </h1>
        </ScrollReveal>

        {categorized.reading.length > 0 && (
          <section className="mb-10">
            <h2 className="text-display text-xl mb-3 flex items-center gap-2 tracking-wider">
              <BookOpen className="w-5 h-5 text-primary" /> CONTINUE READING
            </h2>
            <div className="space-y-3">
              {categorized.reading.map(m => (
                <Link key={m.id} to={`/read/${m.id}/5`} className="flex items-center gap-4 brutal-card p-4 group">
                  <div className={`w-12 h-16 ${m.coverGradient} flex-shrink-0 border border-foreground/20`} />
                  <div className="flex-1">
                    <h3 className="font-display text-base tracking-wide group-hover:text-primary transition-colors">{m.title}</h3>
                    <p className="text-xs text-muted-foreground">Chapter 5 · Last read 2 hours ago</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tabs */}
        <div className="flex gap-0 border-2 border-foreground mb-6 w-fit" style={{ boxShadow: '3px 3px 0 hsl(0 0% 8%)' }}>
          {(['reading', 'completed', 'hold', 'dropped'] as const).map((t, i) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-bold transition-all capitalize ${i > 0 ? 'border-l-2 border-foreground' : ''} ${tab === t ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'}`}>
              {t === 'hold' ? 'On Hold' : t}
            </button>
          ))}
        </div>

        {currentTab.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6">
            {currentTab.map(m => <ManhwaCard key={m.id} manhwa={m} />)}
          </div>
        ) : (
          <div className="brutal-card p-12 text-center">
            <p className="text-muted-foreground">No manhwa in this category yet.</p>
            <Link to="/browse" className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-2 hover:underline">
              Browse manhwa <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
