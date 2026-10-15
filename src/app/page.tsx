import { Dashboard } from '@/components/Dashboard';

// Opt out of instant-navigation validation in Next.js 16/Turbopack
export const instant = false;

export default function Page() {
  return <Dashboard />;
}
