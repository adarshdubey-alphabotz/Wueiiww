import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { manhwaList, formatViews } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';

const TopChartsPage: React.FC = () => {
  const [tab, setTab] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  const ranked = [...manhwaList].sort((a, b) => {
    if (tab === 'weekly') return b.views - a.views;
    if (tab === 'monthly') return b.likes - a.likes;
    return b.rating - a.rating;
  });

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { bg: 'bg-gold/10', border: 'border-gold', text: 'text-gold', shadow: '0 0 20px hsla(45,100%,50%,0.2)' };
    if (rank === 2) return { bg: 'bg-silver/10', border: 'border-silver', text: 'text-silver', shadow: '' };
    if (rank === 3) return { bg: 'bg-bronze/10', border: 'border-bronze', text: 'text-bronze', shadow: '' };
    return { bg: '', border: 'border-foreground', text: 'text-muted-foreground', shadow: '' };
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-gold" />
            <h1 className="text-display text-5xl sm:text-6xl tracking-wider">
              TOP <span className="text-primary">CHARTS</span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <div className="flex gap-0 border-2 border-foreground mb-8 w-fit" style={{ boxShadow: '3px 3px 0 hsl(0 0% 8%)' }}>
          {(['weekly', 'monthly', 'alltime'] as const).map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-bold transition-all ${i > 0 ? 'border-l-2 border-foreground' : ''} ${
                tab === t ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'
              }`}
            >
              {t === 'weekly' ? 'Weekly' : t === 'monthly' ? 'Monthly' : 'All Time'}
            </button>
          ))}
        </div>

        {/* Ranked list */}
        <div className="space-y-3">
          {ranked.map((m, i) => {
            const rank = i + 1;
            const style = getRankStyle(rank);
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.4 }}
              >
                <Link
                  to={`/manhwa/${m.id}`}
                  className={`flex items-center gap-4 p-4 border-2 ${style.border} hover:bg-primary/5 transition-all group`}
                  style={{ boxShadow: rank <= 3 ? (style.shadow || '3px 3px 0 hsl(0 0% 8%)') : '3px 3px 0 hsl(0 0% 8%)' }}
                >
                  <div className={`w-10 h-10 flex items-center justify-center font-display text-2xl ${style.bg} ${style.text} flex-shrink-0 tracking-wider`}>
                    {rank}
                  </div>
                  <div className={`w-12 h-16 ${m.coverGradient} flex-shrink-0 border border-foreground/20`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg tracking-wide group-hover:text-primary transition-colors truncate">{m.title}</h3>
                    <p className="text-xs text-muted-foreground">{m.author}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {m.genres.slice(0, 2).map(g => (
                        <span key={g} className="px-1.5 py-0.5 text-[9px] border border-foreground/20 text-muted-foreground">{g}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatViews(m.views)}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold fill-gold" />{m.rating}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopChartsPage;
