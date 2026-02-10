import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card3D } from '@/components/Card3D';
import { Link } from 'react-router-dom';

interface Applicant {
  id?: string | number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  program?: string;
  sponsor?: string;
  sponsor_name?: string | null;
  age?: number;
  submitted_at?: string;
  pdf_url?: string | null;
}

export default function ProgrammingClassApplicants() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('connect_applicants') || '[]';
    try {
      const parsed = JSON.parse(raw) as Applicant[];
      setApplicants(parsed.reverse());
    } catch {
      setApplicants([]);
    }
  }, []);

  const total = applicants.length;
  const byProgram = applicants.reduce<Record<string, number>>((acc, cur) => {
    const p = cur.program || 'Unknown';
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});
  const bySponsor = applicants.reduce<Record<string, number>>((acc, cur) => {
    const s = cur.sponsor || 'Self';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  function clearStorage() {
    if (!confirm('Clear stored applicants? This cannot be undone.')) return;
    localStorage.removeItem('connect_applicants');
    setApplicants([]);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 container mx-auto px-4 lg:px-8">
        <Card3D className="p-6 mb-6 bg-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold">Applicants — Programming Class</h1>
              <p className="text-sm text-muted-foreground">Applicants submitted via the application form.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/programming-class" className="px-4 py-2 border rounded">Back</Link>
           
            </div>
          </div>
        </Card3D>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4">
            <div className="text-sm text-muted-foreground">Total Applicants</div>
            <div className="text-2xl font-bold">{total}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-sm text-muted-foreground">By Program</div>
            <div className="mt-2 space-y-1">
              {Object.entries(byProgram).map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span>{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="text-sm text-muted-foreground">By Sponsor</div>
            <div className="mt-2 space-y-1">
              {Object.entries(bySponsor).map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span>{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card3D className="p-0 overflow-x-auto bg-transparent">
          <table className="min-w-full divide-y">
            <thead className="bg-muted/10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium">Program</th>
                <th className="px-4 py-3 text-left text-xs font-medium">Sponsor</th>
                <th className="px-4 py-3 text-left text-xs font-medium">Age</th>
                <th className="px-4 py-3 text-left text-xs font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applicants.map((a, idx) => (
                <tr key={idx} className="hover:bg-muted/5">
                  <td className="px-4 py-3 text-sm">{[a.first_name, a.middle_name, a.last_name].filter(Boolean).join(' ')}</td>
                  <td className="px-4 py-3 text-sm">{a.email}</td>
                  <td className="px-4 py-3 text-sm">{a.phone}</td>
                  <td className="px-4 py-3 text-sm">{a.program}</td>
                  <td className="px-4 py-3 text-sm">{a.sponsor}{a.sponsor_name ? ` — ${a.sponsor_name}` : ''}</td>
                  <td className="px-4 py-3 text-sm">{a.age ?? '-'}</td>
                  <td className="px-4 py-3 text-sm">{a.submitted_at ? new Date(a.submitted_at).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card3D>
      </main>
      <Footer />
    </div>
  );
}
