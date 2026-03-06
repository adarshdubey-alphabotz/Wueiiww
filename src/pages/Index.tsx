import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, TrendingUp, Star, Sparkles, Award, Play, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { manhwaList, allGenres, formatViews } from '@/data/mockData';
import ManhwaCard from '@/components/ManhwaCard';
import MagneticButton from '@/components/MagneticButton';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const CarouselSection: React.FC<{ title: string; icon: React.ReactNode; items: typeof manhwaList; delay?: number }> = ({ title, icon, items, delay = 0 }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <ScrollReveal delay={delay}>
      <section className="relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-display text-2xl sm:text-3xl flex items-center gap-3 tracking-wider">
            <span className="w-10 h-10 border-2 border-foreground flex items-center justify-center" style={{ boxShadow: '2px 2px 0 hsl(0 0% 8%)' }}>{icon}</span>
            {title}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className="p-2.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all active:scale-95" style={{ boxShadow: '2px 2px 0 hsl(0 0% 8%)' }}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll(1)} className="p-2.5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all active:scale-95" style={{ boxShadow: '2px 2px 0 hsl(0 0% 8%)' }}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {items.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start"
            >
              <ManhwaCard manhwa={m} />
            </motion.div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
};

const FeaturedCard: React.FC<{ manhwa: typeof manhwaList[0]; index: number }> = ({ manhwa, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <Link to={`/manhwa/${manhwa.id}`} className="group block">
      <div className={`aspect-[2/3] ${manhwa.coverGradient} relative border-2 border-foreground overflow-hidden`} style={{ boxShadow: '4px 4px 0 hsl(0 0% 8%)' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-lg text-white tracking-wide leading-tight group-hover:text-primary transition-colors">{manhwa.title}</h3>
          <p className="text-xs text-white/70 mt-1">{manhwa.author}</p>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-white/60">
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold fill-gold" />{manhwa.rating}</span>
            <span>·</span>
            <span>{formatViews(manhwa.views)} views</span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const HomePage: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.96]);

  const featured = manhwaList[0];
  const trending = [...manhwaList].sort((a, b) => b.views - a.views);
  const topRated = [...manhwaList].sort((a, b) => b.rating - a.rating);
  const newReleases = [...manhwaList].reverse();
  const editorPicks = [manhwaList[3], manhwaList[0], manhwaList[9], manhwaList[7], manhwaList[4]];
  const featuredSpotlight = manhwaList.slice(0, 4);

  const filteredByGenre = activeGenre
    ? manhwaList.filter(m => m.genres.includes(activeGenre))
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      {/* Announcement ticker */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-foreground overflow-hidden border-b-2 border-foreground">
        <div className="animate-marquee whitespace-nowrap py-1.5 text-xs font-semibold text-background">
          <span className="mx-8">🔥 Solo Ascension Chapter 45 just dropped!</span>
          <span className="mx-8">⭐ The Moonlit Garden wins Best Romance 2025</span>
          <span className="mx-8">🆕 New publisher applications now open</span>
          <span className="mx-8">🎉 Xtratoon reaches 10M readers worldwide</span>
          <span className="mx-8">🔥 Solo Ascension Chapter 45 just dropped!</span>
          <span className="mx-8">⭐ The Moonlit Garden wins Best Romance 2025</span>
        </div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center pt-28 sm:pt-24 overflow-hidden">
        {/* Background grid texture */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(hsl(0 0% 8%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 8%) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Big background text */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <motion.span 
            style={{ y: heroY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] sm:text-[18vw] font-display text-foreground/[0.03] leading-none tracking-widest whitespace-nowrap"
          >
            XTRATOON
          </motion.span>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Text */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground text-xs font-semibold mb-6" style={{ boxShadow: '2px 2px 0 hsl(0 0% 8%)' }}>
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Featured — {featured.title}
                </div>
                <h1 className="text-display text-[14vw] sm:text-7xl lg:text-8xl xl:text-[9rem] leading-[0.85] tracking-wider">
                  <motion.span 
                    className="block"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    DISCOVER
                  </motion.span>
                  <motion.span 
                    className="block text-primary"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    STORIES
                  </motion.span>
                  <motion.span 
                    className="block text-[5vw] sm:text-3xl lg:text-4xl text-muted-foreground font-display mt-2 tracking-[0.2em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    THAT MOVE YOU
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p 
                className="text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                Premium manhwa & manga from world-class creators. Immerse yourself in stunning art and compelling narratives.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <MagneticButton className="btn-accent rounded-none text-sm">
                  <Play className="w-4 h-4 fill-current" /> Start Reading
                </MagneticButton>
                <MagneticButton className="btn-outline rounded-none text-sm">
                  Browse All <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </motion.div>

              {/* Quick stats */}
              <motion.div 
                className="flex gap-8 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                {[
                  { value: '10M+', label: 'Readers' },
                  { value: '500+', label: 'Series' },
                  { value: '50K+', label: 'Chapters' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-xl sm:text-2xl font-display text-primary tracking-wider">{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Featured covers grid */}
            <motion.div 
              className="lg:col-span-2 hidden sm:grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {featuredSpotlight.map((m, i) => (
                <FeaturedCard key={m.id} manhwa={m} index={i} />
              ))}
            </motion.div>

            {/* Mobile: single featured card */}
            <motion.div 
              className="sm:hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <Link to={`/manhwa/${featured.id}`} className="block">
                <div className={`aspect-[16/9] ${featured.coverGradient} relative border-2 border-foreground overflow-hidden`} style={{ boxShadow: '4px 4px 0 hsl(0 0% 8%)' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-xl text-white tracking-wide">{featured.title}</h3>
                    <p className="text-xs text-white/70 mt-1">{featured.author} · {formatViews(featured.views)} views</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-foreground flex items-start justify-center p-1.5">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-20 sm:space-y-28">
        {/* Genre pills */}
        <ScrollReveal>
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-10 bg-primary" />
              <h2 className="text-display text-2xl sm:text-3xl tracking-wider">BROWSE BY GENRE</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((g, i) => (
                <motion.button
                  key={g}
                  onClick={() => setActiveGenre(activeGenre === g ? null : g)}
                  className={`px-4 py-2 text-sm font-semibold transition-all border-2 ${
                    activeGenre === g
                      ? 'bg-primary text-primary-foreground border-foreground'
                      : 'border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background'
                  }`}
                  style={activeGenre === g ? { boxShadow: '2px 2px 0 hsl(0 0% 8%)' } : {}}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {g}
                </motion.button>
              ))}
            </div>
            {filteredByGenre && (
              <motion.div 
                className="flex gap-5 overflow-x-auto pb-4 mt-6 snap-x snap-mandatory" 
                style={{ scrollbarWidth: 'none' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
              >
                {filteredByGenre.map(m => (
                  <div key={m.id} className="snap-start">
                    <ManhwaCard manhwa={m} />
                  </div>
                ))}
              </motion.div>
            )}
          </section>
        </ScrollReveal>

        <CarouselSection title="TRENDING NOW" icon={<TrendingUp className="w-5 h-5 text-primary" />} items={trending} />
        <CarouselSection title="TOP RATED" icon={<Star className="w-5 h-5 text-gold" />} items={topRated} delay={0.05} />
        <CarouselSection title="NEW RELEASES" icon={<Sparkles className="w-5 h-5 text-foreground" />} items={newReleases} delay={0.1} />
        <CarouselSection title="EDITOR'S PICKS" icon={<Award className="w-5 h-5 text-foreground" />} items={editorPicks} delay={0.15} />

        {/* CTA Section */}
        <ScrollReveal>
          <section className="border-2 border-foreground p-8 sm:p-12 text-center relative overflow-hidden" style={{ boxShadow: '6px 6px 0 hsl(0 0% 8%)' }}>
            <div className="relative z-10">
              <h2 className="text-display text-4xl sm:text-6xl mb-4 tracking-wider">READY TO <span className="text-primary">PUBLISH?</span></h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Join hundreds of creators sharing their stories with millions of readers on Xtratoon.
              </p>
              <MagneticButton className="btn-accent rounded-none text-base px-8 py-4">
                Start Publishing <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* Marquee CSS */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-block;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default HomePage;
