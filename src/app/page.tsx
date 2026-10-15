import { Suspense } from 'react';
import { Dashboard } from '@/components/Dashboard';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100/80" />}>
      <Dashboard />
    </Suspense>
  );
}
