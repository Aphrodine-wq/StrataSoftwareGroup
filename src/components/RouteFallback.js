import React from 'react';
import './RouteFallback.css';

/**
 * Skeleton fallback for Suspense when lazy-loaded route is loading.
 * Matches main layout (nav + content blocks) so route changes feel intentional.
 * Uses design tokens only.
 */
function RouteFallback() {
  return (
    <div className="route-fallback" aria-live="polite" aria-busy="true">
      <div className="route-fallback-skeleton">
        <div className="route-fallback-bar" />
        <div className="route-fallback-block route-fallback-block--wide" />
        <div className="route-fallback-row">
          <div className="route-fallback-block" />
          <div className="route-fallback-block" />
          <div className="route-fallback-block" />
        </div>
        <div className="route-fallback-block route-fallback-block--mid" />
      </div>
      <span className="route-fallback-label">Loading…</span>
    </div>
  );
}

export default RouteFallback;
