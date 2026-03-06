import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, Eye, BookOpen, Calendar } from 'lucide-react';
import { publishers, manhwaList, formatViews } from '@/data/mockData';
import ManhwaCard from '@/components/ManhwaCard';
import ScrollReveal from '@/components/ScrollReveal';

const PublisherProfile: React.FC = () => {
  const { id } = useParams();
  const publisher = publishers.find(p => p.id === id);

  if (!publisher) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground">Publisher not found</p>
    </div>
  );

  const works = manhwaList.filter(m => publisher.works.includes(m.id));

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <div className="brutal-card p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className={`w-24 h-24 rounded-full ${publisher.avatarGradient} flex-shrink-0 border-2 border-foreground`} style={{ boxShadow: '3px 3px 0 hsl(0 0% 8%)' }} />
              <div className="flex-1">
                <h1 className="text-display text-4xl sm:text-5xl mb-2 tracking-wider">{publisher.username.toUpperCase()}</h1>
                <p className="text-sm text-muted-foreground mb-4">{publisher.bio}</p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: <Users className="w-4 h-4" />, label: 'Followers', value: formatViews(publisher.followers) },
                    { icon: <BookOpen className="w-4 h-4" />, label: 'Works', value: publisher.works.length.toString() },
                    { icon: <Eye className="w-4 h-4" />, label: 'Total Views', value: formatViews(publisher.totalViews) },
                    { icon: <Calendar className="w-4 h-4" />, label: 'Joined', value: publisher.joinDate },
                  ].map(s => (
                    <div key={s.label} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{s.icon}</span>
                      <span className="font-bold">{s.value}</span>
                      <span className="text-muted-foreground text-xs">{s.label}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 btn-outline rounded-none text-xs py-2 px-6">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <h2 className="text-display text-2xl mb-4 tracking-wider">PUBLISHED WORKS</h2>
        {works.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6">
            {works.map(m => <ManhwaCard key={m.id} manhwa={m} />)}
          </div>
        ) : (
          <div className="brutal-card p-8 text-center">
            <p className="text-muted-foreground">No published works yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublisherProfile;
