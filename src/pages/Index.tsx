import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, TrendingUp, Star, Sparkles, Award, Play, ArrowRight, BookOpen, Users, Zap, Heart, Eye } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { manhwaList, allGenres, formatViews, publishers } from '@/data/mockData';
import ManhwaCard from '@/components/ManhwaCard';
import MagneticButton from '@/components/MagneticButton';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const CarouselSection: React.FC<{ title: string; icon: React.ReactNode; items: typeof manhwaList; delay?: number; viewAllLink?: string }> = ({ title, icon, items, delay = 0, viewAllLink }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <ScrollReveal delay={delay}>
      <section className="relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-display text-2xl sm:text-3xl flex items-center gap-3 tracking-wider">
            <span className="w-10 h-10 rounded-xl border border-border flex items-center justify-center bg-muted/30">{icon}</span>
            {title}
          </h2>
          <div className="flex items-center gap-3">
            {viewAllLink && (
              <Link to={viewAllLink} className="text-xs font-semibold text-primary hover:underline underline-offset-4 transition-colors hidden sm:block">
                View All →
              </Link>
            )}
            <div className="flex gap-2">
              <button onClick={() => scroll(-1)} className="p-2.5 rounded-xl border border-border hover:bg-foreground hover:text-background transition-all duration-300 active:scale-95 bg-muted/30">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scroll(1)} className="p-2.5 rounded-xl border border-border hover:bg-foreground hover:text-background transition-all duration-300 active:scale-95 bg-muted/30">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {items.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
      <div className={`aspect-[2/3] ${manhwa.coverGradient} relative rounded-2xl border border-border overflow-hidden`} style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; gradient: string; index: number }> = ({ icon, title, desc, gradient, index }) => (
  <StaggerItem>
    <div className={`relative p-6 sm:p-8 rounded-3xl border border-border overflow-hidden group hover:scale-[1.02] transition-all duration-500`} style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className={`absolute inset-0 opacity-[0.06] ${gradient}`} />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl border border-border flex items-center justify-center mb-4 bg-background/80 backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-display text-xl sm:text-2xl tracking-wider mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  </StaggerItem>
);

const CreatorCard: React.FC<{ publisher: typeof publishers[0]; index: number }> = ({ publisher, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <Link to={`/publisher/${publisher.id}`} className="group block">
      <div className="p-5 rounded-2xl border border-border hover:border-primary/30 transition-all duration-400 bg-muted/20 hover:bg-muted/40" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${publisher.avatarGradient} flex items-center justify-center text-lg font-bold text-foreground flex-shrink-0`}>
            {publisher.username[0]}
          </div>
          <div className="min-w-0">
            <h4 className="font-display text-base tracking-wide group-hover:text-primary transition-colors truncate">{publisher.username}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{formatViews(publisher.totalViews)} total views</p>
            <p className="text-xs text-muted-foreground">{publisher.works.length} series</p>
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
      <div className="fixed top-16 left-0 right-0 z-40 bg-foreground overflow-hidden">
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
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

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
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full text-xs font-semibold mb-6 bg-muted/30 backdrop-blur-sm">
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
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <Link to="/browse">
                  <MagneticButton className="btn-accent text-sm">
                    <Play className="w-4 h-4 fill-current" /> Start Reading
                  </MagneticButton>
                </Link>
                <Link to="/browse">
                  <MagneticButton className="btn-outline text-sm">
                    Browse All <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>
              </motion.div>

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

            <motion.div
              className="sm:hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <Link to={`/manhwa/${featured.id}`} className="block">
                <div className={`aspect-[16/9] ${featured.coverGradient} relative rounded-2xl border border-border overflow-hidden`} style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-xl text-white tracking-wide">{featured.title}</h3>
                    <p className="text-xs text-white/70 mt-1">{featured.author} · {formatViews(featured.views)} views</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-20 sm:space-y-28">

        {/* Why Xtratoon — feature cards inspired by Lavender reference */}
        <ScrollReveal>
          <section className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-full text-xs font-semibold mb-4 bg-primary/5 text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-3.5 h-3.5" /> Why Xtratoon?
            </motion.div>
            <h2 className="text-display text-4xl sm:text-6xl tracking-wider mb-3">
              THE <span className="text-primary">ULTIMATE</span> READING
              <br />EXPERIENCE
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
              Everything you need to discover, read, and fall in love with manhwa — all in one place.
            </p>
          </section>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={<BookOpen className="w-6 h-6 text-primary" />}
            title="ENDLESS LIBRARY"
            desc="500+ series across every genre — action, romance, fantasy, horror, and more. Updated daily."
            gradient="gradient-cover-1"
            index={0}
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="INSTANT UPDATES"
            desc="Get new chapters the moment they drop. No waiting, no delays. First to read, always."
            gradient="gradient-cover-2"
            index={1}
          />
          <FeatureCard
            icon={<Heart className="w-6 h-6 text-primary" />}
            title="CREATOR-FIRST"
            desc="We support creators with fair revenue sharing, analytics, and tools to grow their audience."
            gradient="gradient-cover-5"
            index={2}
          />
        </StaggerContainer>

        {/* Browse by genre */}
        <ScrollReveal>
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-display text-2xl sm:text-3xl tracking-wider">BROWSE BY GENRE</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((g, i) => (
                <motion.button
                  key={g}
                  onClick={() => setActiveGenre(activeGenre === g ? null : g)}
                  className={`px-4 py-2 text-sm font-semibold transition-all rounded-xl border ${
                    activeGenre === g
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                      : 'border-border/40 hover:border-border hover:bg-muted/50'
                  }`}
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

        <CarouselSection title="TRENDING NOW" icon={<TrendingUp className="w-5 h-5 text-primary" />} items={trending} viewAllLink="/browse?sort=trending" />
        <CarouselSection title="TOP RATED" icon={<Star className="w-5 h-5 text-gold" />} items={topRated} delay={0.05} viewAllLink="/charts" />
        <CarouselSection title="NEW RELEASES" icon={<Sparkles className="w-5 h-5 text-foreground" />} items={newReleases} delay={0.1} viewAllLink="/browse?sort=new" />

        {/* Top Creators section */}
        <ScrollReveal>
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-display text-2xl sm:text-3xl flex items-center gap-3 tracking-wider">
                <span className="w-10 h-10 rounded-xl border border-border flex items-center justify-center bg-muted/30"><Users className="w-5 h-5 text-primary" /></span>
                TOP CREATORS
              </h2>
              <Link to="/browse" className="text-xs font-semibold text-primary hover:underline underline-offset-4 transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {publishers.slice(0, 6).map((p, i) => (
                <CreatorCard key={p.id} publisher={p} index={i} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        <CarouselSection title="EDITOR'S PICKS" icon={<Award className="w-5 h-5 text-foreground" />} items={editorPicks} delay={0.15} viewAllLink="/browse" />

        {/* Big Browse CTA — inspired by the colorful reference images */}
        <ScrollReveal>
          <section className="relative rounded-3xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="absolute inset-0 gradient-cover-1 opacity-[0.08]" />
            <div className="relative z-10 p-8 sm:p-14 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/20 rounded-full text-[11px] font-semibold mb-4 bg-primary/5 text-primary">
                  <Eye className="w-3 h-3" /> Explore Everything
                </div>
                <h2 className="text-display text-4xl sm:text-6xl tracking-wider mb-3">
                  SEE ALL <span className="text-primary">SECTIONS</span>
                </h2>
                <p className="text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed mb-6">
                  From trending hits to hidden gems, editor picks to new releases — browse every collection in one place.
                </p>
                <Link to="/browse">
                  <MagneticButton className="btn-accent text-base px-8 py-4">
                    Browse Everything <ArrowRight className="w-5 h-5" />
                  </MagneticButton>
                </Link>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                {manhwaList.slice(0, 3).map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20, rotate: i === 0 ? -6 : i === 2 ? 6 : 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -6 : i === 2 ? 6 : 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="hidden sm:block"
                  >
                    <div className={`w-28 sm:w-36 aspect-[2/3] ${m.coverGradient} rounded-2xl border border-border`} style={{ boxShadow: 'var(--shadow-card)' }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Publish CTA */}
        <ScrollReveal>
          <section className="rounded-3xl border border-border p-8 sm:p-12 text-center relative overflow-hidden bg-muted/20" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="relative z-10">
              <h2 className="text-display text-4xl sm:text-6xl mb-4 tracking-wider">READY TO <span className="text-primary">PUBLISH?</span></h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Join hundreds of creators sharing their stories with millions of readers on Xtratoon.
              </p>
              <Link to="/dashboard">
                <MagneticButton className="btn-accent text-base px-8 py-4">
                  Start Publishing <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </div>

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
