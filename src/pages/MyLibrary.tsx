import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/hooks/useApi';
import { BookOpen, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const MyLibrary: React.FC = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<'reading' | 'completed' | 'plan' | 'dropped'>('reading');

  const { data: library, isLoading } = useLibrary(tab === 'reading' ? 'reading' : tab);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-display text-5xl sm:text-6xl mb-8 tracking-wider">
            <span className="text-primary">MY</span> LIBRARY
          </h1>
        </ScrollReveal>

        <div className="flex gap-0 border-2 border-foreground mb-6 w-fit" style={{ boxShadow: '3px 3px 0 hsl(0 0% 8%)' }}>
          {(['reading', 'completed', 'plan', 'dropped'] as const).map((t, i) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-bold transition-all capitalize ${i > 0 ? 'border-l-2 border-foreground' : ''} ${tab === t ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'}`}>
              {t === 'plan' ? 'Plan to Read' : t}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading library...</p>
        ) : library && library.length > 0 ? (
          <div className="space-y-3">
            {library.map(item => (
              <Link key={item.id} to={`/manhwa/${item.slug}`} className="flex items-center gap-4 brutal-card p-4 group">
                {item.cover ? (
                  <img src={item.cover} alt="" className="w-12 h-16 object-cover flex-shrink-0 border border-foreground/20" />
                ) : (
                  <div className="w-12 h-16 bg-muted flex-shrink-0 border border-foreground/20" />
                )}
                <div className="flex-1">
                  <h3 className="font-display text-base tracking-wide group-hover:text-primary transition-colors">{item.title}</h3>
                  {item.latestChapter && (
                    <p className="text-xs text-muted-foreground">Latest: Chapter {item.latestChapter}</p>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
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
