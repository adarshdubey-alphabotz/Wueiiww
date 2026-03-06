import React, { useState } from 'react';
import { manhwaList, publishers, mockSubmissions, mockReports, formatViews } from '@/data/mockData';
import { LayoutDashboard, FileText, Users, BookOpen, AlertTriangle, Check, X, EyeOff, Trash2, Ban, Shield } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [confirmModal, setConfirmModal] = useState<{ type: string; id: string; action: string } | null>(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'submissions', label: 'Submissions', icon: <FileText className="w-4 h-4" /> },
    { id: 'publishers', label: 'Publishers', icon: <Users className="w-4 h-4" /> },
    { id: 'library', label: 'Manhwa Library', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'reports', label: 'Reported Content', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  const handleAction = () => {
    if (confirmModal) {
      if (confirmModal.type === 'submission') {
        setSubmissions(prev => prev.map(s => s.id === confirmModal.id ? { ...s, status: confirmModal.action as any } : s));
      }
      setConfirmModal(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-56 flex-shrink-0">
          <div className="brutal-card p-4 space-y-1 sticky top-24">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b-2 border-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-display text-lg tracking-wider">ADMIN PANEL</span>
            </div>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors font-medium ${activeTab === t.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-display text-3xl mb-4 tracking-wider">DASHBOARD</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Pending Reviews', value: submissions.filter(s => s.status === 'pending').length, color: 'text-gold' },
                  { label: 'Total Publishers', value: publishers.length, color: 'text-foreground' },
                  { label: 'Total Manhwa', value: manhwaList.length, color: 'text-foreground' },
                  { label: 'Total Users', value: '1,247', color: 'text-primary' },
                ].map(s => (
                  <div key={s.label} className="brutal-card p-5">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{s.label}</div>
                    <div className={`text-3xl font-display tracking-wider ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div>
              <h2 className="text-display text-3xl mb-4 tracking-wider">SUBMISSIONS QUEUE</h2>
              <div className="brutal-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-foreground text-left text-muted-foreground text-xs uppercase tracking-wider">
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Publisher</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">File</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map(s => (
                        <tr key={s.id} className="border-b border-foreground/10 hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-3 font-semibold">{s.title}</td>
                          <td className="px-4 py-3 text-muted-foreground">{s.publisherUsername}</td>
                          <td className="px-4 py-3 text-muted-foreground">{s.submittedDate}</td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{s.fileName}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 text-xs font-bold border ${
                              s.status === 'pending' ? 'border-gold bg-gold/10 text-gold' :
                              s.status === 'approved' ? 'border-primary bg-primary/10 text-primary' :
                              'border-destructive bg-destructive/10 text-destructive'
                            }`}>{s.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            {s.status === 'pending' && (
                              <div className="flex gap-1">
                                <button onClick={() => setConfirmModal({ type: 'submission', id: s.id, action: 'approved' })} className="p-1.5 border border-primary text-primary hover:bg-primary/10"><Check className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setConfirmModal({ type: 'submission', id: s.id, action: 'rejected' })} className="p-1.5 border border-destructive text-destructive hover:bg-destructive/10"><X className="w-3.5 h-3.5" /></button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'publishers' && (
            <div>
              <h2 className="text-display text-3xl mb-4 tracking-wider">PUBLISHERS</h2>
              <div className="brutal-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-foreground text-left text-muted-foreground text-xs uppercase tracking-wider">
                        <th className="px-4 py-3">Publisher</th>
                        <th className="px-4 py-3">Works</th>
                        <th className="px-4 py-3">Followers</th>
                        <th className="px-4 py-3">Joined</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publishers.map(p => (
                        <tr key={p.id} className="border-b border-foreground/10 hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full ${p.avatarGradient} flex-shrink-0 border border-foreground`} />
                              <span className="font-semibold">{p.username}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{p.works.length}</td>
                          <td className="px-4 py-3 text-muted-foreground">{formatViews(p.followers)}</td>
                          <td className="px-4 py-3 text-muted-foreground">{p.joinDate}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button className="p-1.5 hover:text-gold transition-colors" title="Block"><Ban className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 hover:text-destructive transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div>
              <h2 className="text-display text-3xl mb-4 tracking-wider">MANHWA LIBRARY</h2>
              <div className="brutal-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-foreground text-left text-muted-foreground text-xs uppercase tracking-wider">
                        <th className="px-4 py-3">Cover</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Publisher</th>
                        <th className="px-4 py-3">Views</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {manhwaList.map(m => (
                        <tr key={m.id} className="border-b border-foreground/10 hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-3"><div className={`w-8 h-12 ${m.coverGradient} border border-foreground/20`} /></td>
                          <td className="px-4 py-3 font-semibold">{m.title}</td>
                          <td className="px-4 py-3 text-muted-foreground">{m.publisher}</td>
                          <td className="px-4 py-3 text-muted-foreground">{formatViews(m.views)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button className="p-1.5 hover:text-muted-foreground transition-colors" title="Toggle visibility"><EyeOff className="w-3.5 h-3.5" /></button>
                              <button className="p-1.5 hover:text-destructive transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-display text-3xl mb-4 tracking-wider">REPORTED CONTENT</h2>
              <div className="space-y-3">
                {mockReports.map(r => (
                  <div key={r.id} className="brutal-card p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs font-bold border ${r.targetType === 'manhwa' ? 'border-foreground/30' : 'border-gold bg-gold/10 text-gold'}`}>
                            {r.targetType}
                          </span>
                          <span className="font-semibold text-sm">{r.targetName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{r.reason}</p>
                        <p className="text-xs text-muted-foreground mt-1">Reported by {r.reportedBy} · {r.date}</p>
                      </div>
                      <div className="flex gap-1">
                        <button className="px-3 py-1 border border-destructive text-destructive text-xs font-semibold hover:bg-destructive/10">Take Action</button>
                        <button className="px-3 py-1 border border-foreground/20 text-xs font-medium text-muted-foreground hover:bg-muted">Dismiss</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setConfirmModal(null)}>
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
          <div className="relative bg-background border-2 border-foreground p-6 w-full max-w-sm text-center animate-fade-in-up" style={{ boxShadow: '6px 6px 0 hsl(0 0% 8%)' }} onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-2xl tracking-wider mb-2">
              {confirmModal.action === 'approved' ? '✅ APPROVE?' : '❌ DECLINE?'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmModal(null)} className="flex-1 btn-outline rounded-none py-2 text-sm">Cancel</button>
              <button onClick={handleAction} className={`flex-1 py-2 text-sm font-bold border-2 border-foreground ${
                confirmModal.action === 'approved' ? 'bg-primary text-primary-foreground' : 'bg-destructive text-destructive-foreground'
              }`} style={{ boxShadow: '2px 2px 0 hsl(0 0% 8%)' }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
