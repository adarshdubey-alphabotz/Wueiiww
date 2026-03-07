import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, Eye, BookOpen, Calendar } from 'lucide-react';
import { userApi, formatViews } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import ScrollReveal from '@/components/ScrollReveal';

const PublisherProfile: React.FC = () => {
  const { id } = useParams();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['user-profile', id],
    queryFn: () => userApi.getProfile(id || ''),
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground">Loading profile...</p>
    </div>
  );

  const user = profileData?.user;
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground">User not found</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <div className="brutal-card p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="w-24 h-24 rounded-full object-cover border-2 border-foreground flex-shrink-0" style={{ boxShadow: '3px 3px 0 hsl(0 0% 8%)' }} />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/20 flex-shrink-0 border-2 border-foreground flex items-center justify-center text-2xl font-bold" style={{ boxShadow: '3px 3px 0 hsl(0 0% 8%)' }}>
                  {user.username[0]}
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-display text-4xl sm:text-5xl mb-2 tracking-wider">{user.username.toUpperCase()}</h1>
                <p className="text-sm text-muted-foreground mb-4">Level {user.level ?? 1} · {user.role}</p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: <BookOpen className="w-4 h-4" />, label: 'Library', value: String(user.stats?.libraryCount ?? 0) },
                    { icon: <Calendar className="w-4 h-4" />, label: 'Joined', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{s.icon}</span>
                      <span className="font-bold">{s.value}</span>
                      <span className="text-muted-foreground text-xs">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default PublisherProfile;
