'use client';

/**
 * §29.2 — Client wrappers that fire a dataLayer event on click, then behave like
 * a normal link. Usable inside Server Components (they render as client islands),
 * so CTAs across statically-rendered pages stay measurable without converting a
 * whole page to a client component.
 */

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { track } from '@/lib/analytics';

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: string;
  params?: Record<string, any>;
};

export function TrackedLink({ event, params, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    />
  );
}

type TrackedAnchorProps = ComponentProps<'a'> & {
  event: string;
  params?: Record<string, any>;
  children: ReactNode;
};

export function TrackedAnchor({ event, params, onClick, children, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
