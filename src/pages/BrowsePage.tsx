import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { manhwaList, allGenres } from '@/data/mockData';
import ManhwaCard from '@/components/ManhwaCard';
import ScrollReveal from '@/components/ScrollReveal';

const BrowsePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialGenre = searchParams.get('genre');
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialGenre ? [initialGenre] : []);
  const [status, setStatus] = useState<string>('All');
  const [sort, setSort] = useState<string>('Trending');
  const [showFilters, setShowFilters] = useState(false);

  const toggleGenre = (g: string) => {
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const removeFilter = (type: string, value: string) => {
    if (type === 'genre') setSelectedGenres(prev => prev.filter(x => x !== value));
    if (type === 'status') setStatus('All');
    if (type === 'query') setQuery('');
  };

  const filtered = useMemo(() => {
    let results = [...manhwaList];
    if (query) results = results.filter(m => m.title.toLowerCase().includes(query.toLowerCase()) || m.author.toLowerCase().includes(query.toLowerCase()));
    if (selectedGenres.length) results = results.filter(m => m.genres.some(g => selectedGenres.includes(g)));
    if (status !== 'All') results = results.filter(m => m.status === status);
    switch (sort) {
      case 'Rating': results.sort((a, b) => b.rating - a.rating); break;
      case 'New': results.sort((a, b) => b.chapters[b.chapters.length - 1]?.date.localeCompare(a.chapters[a.chapters.length - 1]?.date || '') || 0); break;
      case 'Views': results.sort((a, b) => b.views - a.views); break;
      default: results.sort((a, b) => b.views - a.views);
    }
    return results;
  }, [query, selectedGenres, status, sort]);

  const activeFilters = [
    ...selectedGenres.map(g => ({ type: 'genre', value: g })),
    ...(status !== 'All' ? [{ type: 'status', value: status }] : []),
    ...(query ? [{ type: 'query', value: `"${query}"` }] : []),
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-display text-5xl sm:text-6xl mb-8 tracking-wider">
            <span className="text-primary">BROWSE</span> & DISCOVER
          </h1>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-foreground text-sm font-semibold" style={{ boxShadow: '2px 2px 0 hsl(0 0% 8%)' }}>
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>

          {/* Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="brutal-card p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-3 py-2 bg-background border-2 border-foreground text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div className="brutal-card p-4">
              <h3 className="font-display text-lg tracking-wider mb-3">GENRE</h3>
              <div className="flex flex-wrap gap-1.5">
                {allGenres.map(g => (
                  <button key={g} onClick={() => toggleGenre(g)} className={`px-2.5 py-1 text-xs border transition-all font-medium ${selectedGenres.includes(g) ? 'border-primary bg-primary/10 text-primary' : 'border-foreground/20 hover:border-foreground'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="brutal-card p-4">
              <h3 className="font-display text-lg tracking-wider mb-3">STATUS</h3>
              <div className="space-y-1">
                {['All', 'Ongoing', 'Completed', 'Hiatus'].map(s => (
                  <button key={s} onClick={() => setStatus(s)} className={`block w-full text-left px-3 py-1.5 text-sm font-medium transition-colors ${status === s ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="brutal-card p-4">
              <h3 className="font-display text-lg tracking-wider mb-3">SORT BY</h3>
              <div className="space-y-1">
                {['Trending', 'Rating', 'New', 'Views'].map(s => (
                  <button key={s} onClick={() => setSort(s)} className={`block w-full text-left px-3 py-1.5 text-sm font-medium transition-colors ${sort === s ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((f, i) => (
                  <button key={i} onClick={() => removeFilter(f.type, f.value)} className="flex items-center gap-1 px-3 py-1 text-xs border-2 border-primary bg-primary/5 text-primary font-semibold">
                    {f.value} <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            <p className="text-sm text-muted-foreground mb-4 font-medium">{filtered.length} results</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6">
              {filtered.map(m => <ManhwaCard key={m.id} manhwa={m} />)}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No manhwa found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
