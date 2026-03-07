import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useChapter } from '@/hooks/useApi';

const ReaderPage: React.FC = () => {
  const { id, chapter } = useParams();
  const navigate = useNavigate();
  const chapterSlug = chapter?.startsWith('chapter-') ? chapter : `chapter-${chapter}`;
  const { data: chapterData, isLoading } = useChapter(id || '', chapterSlug);
  const [showNav, setShowNav] = useState(true);
  const [chapterDropdown, setChapterDropdown] = useState(false);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <p className="text-white/50">Loading chapter...</p>
    </div>
  );

  if (!chapterData) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <p className="text-white/50">Chapter not found</p>
    </div>
  );

  const chapterNum = chapterData.chapterNumber;
  const mangaSlug = chapterData.manga.slug;
  const mangaTitle = chapterData.manga.title;
  const pages = chapterData.pages || [];
  const prevChapter = chapterData.prevChapter;
  const nextChapter = chapterData.nextChapter;

  return (
    <div className="min-h-screen bg-[#0a0a0a] no-select relative" onContextMenu={e => e.preventDefault()}>
      <div className="watermark-overlay" />

      {showNav && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <button onClick={() => navigate(`/manhwa/${mangaSlug}`)} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white truncate max-w-[150px]">{mangaTitle}</span>
              <button onClick={() => setChapterDropdown(!chapterDropdown)} className="flex items-center gap-1 px-3 py-1.5 border border-white/20 text-sm text-white">
                Ch. {chapterNum} <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              {prevChapter != null && (
                <Link to={`/read/${mangaSlug}/chapter-${prevChapter}`} className="p-2 text-white/70 hover:text-white">
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              )}
              {nextChapter != null && (
                <Link to={`/read/${mangaSlug}/chapter-${nextChapter}`} className="p-2 text-white/70 hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto pt-16 pb-20 cursor-pointer" onClick={() => setShowNav(!showNav)}>
        <div className="px-2 text-center text-xs text-white/30 py-4">
          🔒 Content protected by Xtratoon · Tap to toggle navigation
        </div>
        {pages.map((p) => (
          <img
            key={p.page}
            src={p.img}
            alt={`Page ${p.page}`}
            loading="lazy"
            className="w-full"
            style={{ userSelect: 'none', pointerEvents: 'none' } as React.CSSProperties}
            draggable={false}
          />
        ))}
        {pages.length === 0 && (
          <div className="text-center py-20 text-white/30">No pages available for this chapter.</div>
        )}
        <div className="text-center py-8 space-y-4">
          <p className="text-white/50 text-sm">End of Chapter {chapterNum}</p>
          <div className="flex justify-center gap-3">
            {prevChapter != null && (
              <Link to={`/read/${mangaSlug}/chapter-${prevChapter}`} className="px-4 py-2 border border-white/20 text-white text-sm font-medium flex items-center gap-1 hover:bg-white/5">
                <ChevronLeft className="w-4 h-4" /> Previous
              </Link>
            )}
            {nextChapter != null && (
              <Link to={`/read/${mangaSlug}/chapter-${nextChapter}`} className="px-4 py-2 bg-[#FF2D6B] text-white text-sm font-bold flex items-center gap-1 border-2 border-white/20" style={{ boxShadow: '3px 3px 0 rgba(255,255,255,0.15)' }}>
                Next <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {showNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              {prevChapter != null && (
                <Link to={`/read/${mangaSlug}/chapter-${prevChapter}`} className="p-2 text-white/70 hover:text-white">
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              )}
              <div className="flex-1">
                <div className="h-1.5 bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#FF2D6B] transition-all" style={{ width: '50%' }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-white/40">Ch. {chapterNum}</span>
                </div>
              </div>
              {nextChapter != null && (
                <Link to={`/read/${mangaSlug}/chapter-${nextChapter}`} className="p-2 text-white/70 hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReaderPage;
