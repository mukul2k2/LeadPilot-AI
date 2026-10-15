import React from 'react';
import { UrgencyTag } from '@/types/lead';
import { Flame, Sun, Snowflake } from 'lucide-react';

interface TagBadgeProps {
  tag: UrgencyTag;
  size?: 'sm' | 'md' | 'lg';
}

export const TagBadge: React.FC<TagBadgeProps> = ({ tag, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  if (tag === 'Hot') {
    return (
      <span
        className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 border border-rose-200 shadow-sm ${sizeClasses[size]}`}
      >
        <Flame size={iconSizes[size]} className="text-rose-600 fill-rose-600 animate-pulse" />
        Hot Lead
      </span>
    );
  }

  if (tag === 'Warm') {
    return (
      <span
        className={`inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-200 shadow-sm ${sizeClasses[size]}`}
      >
        <Sun size={iconSizes[size]} className="text-amber-600" />
        Warm Lead
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-300 shadow-sm ${sizeClasses[size]}`}
    >
      <Snowflake size={iconSizes[size]} className="text-slate-500" />
      Cold Lead
    </span>
  );
};
