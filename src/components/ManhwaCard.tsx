import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { Manhwa, formatViews } from '@/data/mockData';

interface ManhwaCardProps {
  manhwa: Manhwa;
  rank?: number;
  rankColor?: string;
}

const ManhwaCard: React.FC<ManhwaCardProps> = ({ manhwa, rank, rankColor }) => {
  return (
    <Link
      to={`/manhwa/${manhwa.id}`}
      className="group relative flex-shrink-0 w-40 sm:w-48"
    >
      {/* Rank badge */}
      {rank && (
        <div
          className="absolute -top-2 -left-2 z-20 w-9 h-9 flex items-center justify-center text-xs font-bold border-2 border-foreground"
          style={{
            backgroundColor: rankColor || 'hsl(var(--muted))',
            color: rank <= 3 ? '#000' : 'hsl(var(--foreground))',
            boxShadow: '2px 2px 0 hsl(0 0% 8%)',
          }}
        >
          #{rank}
        </div>
      )}

      {/* Cover */}
      <motion.div 
        className={`relative aspect-[3/4] overflow-hidden ${manhwa.coverGradient} mb-3 border-2 border-foreground`}
        style={{ boxShadow: '4px 4px 0 hsl(0 0% 8%)' }}
        whileHover={{ boxShadow: '2px 2px 0 hsl(0 0% 8%)', x: 2, y: 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Glass overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 flex flex-col justify-end backdrop-blur-sm">
          <p className="text-xs text-foreground/90 line-clamp-3 leading-relaxed">{manhwa.description}</p>
          <div className="mt-2 inline-flex items-center gap-1 text-primary text-xs font-bold">
            Read now <Eye className="w-3 h-3" />
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className={`px-2 py-0.5 text-[10px] font-bold border border-foreground/20 backdrop-blur-md ${
            manhwa.status === 'Ongoing' ? 'bg-background/80 text-foreground' :
            manhwa.status === 'Completed' ? 'bg-primary/80 text-primary-foreground' :
            'bg-muted/80 text-muted-foreground'
          }`}>
            {manhwa.status}
          </span>
        </div>

        {/* Bookmark */}
        <button
          onClick={e => { e.preventDefault(); }}
          className="absolute top-2 left-2 z-10 p-1.5 glass opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </motion.div>

      {/* Info */}
      <div className="space-y-1 px-0.5">
        <h3 className="font-display text-base tracking-wide leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {manhwa.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{manhwa.author}</p>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Star className="w-3 h-3 text-gold fill-gold" />
            {manhwa.rating}
          </span>
          <span className="flex items-center gap-0.5">
            <Eye className="w-3 h-3" />
            {formatViews(manhwa.views)}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {manhwa.genres.slice(0, 2).map(g => (
            <span key={g} className="px-2 py-0.5 text-[9px] border border-foreground/20 text-muted-foreground font-medium">
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ManhwaCard;
