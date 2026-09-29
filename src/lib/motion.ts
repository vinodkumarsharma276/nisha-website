/**
 * Device-aware motion system.
 *
 * Decides how much animation this device should run and exposes it as
 * `<html data-motion="full | lite | none">` so CSS can gate effects, plus a
 * `useMotionTier()` hook for JS-driven effects (count-ups, parallax, tilt).
 *
 *  - none: user asked for reduced motion → no movement at all, content shown as-is
 *  - lite: weak / constrained device → cheap opacity fades only, no loops or parallax
 *  - full: capable device → everything
 *
 * Signals used (all optional, so unsupported browsers fall back to "full"):
 *  - prefers-reduced-motion media query
 *  - Save-Data / slow connection (Network Information API)
 *  - CPU core count (hardwareConcurrency) and RAM (deviceMemory)
 *  - A short frame-rate probe after load: if the device can't hold ~40fps
 *    while idle, it won't manage heavier animation either, so we downgrade.
 */
import { useSyncExternalStore } from 'react';

export type MotionTier = 'full' | 'lite' | 'none';

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

const listeners = new Set<() => void>();
let tier: MotionTier = 'full';

function apply(next: MotionTier) {
  tier = next;
  document.documentElement.dataset.motion = next;
  listeners.forEach((l) => l());
}

function staticTier(): MotionTier {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';

  const nav = navigator as NavigatorWithHints;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const conn = nav.connection;

  if (conn?.saveData) return 'lite';
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return 'lite';
  if (cores <= 2 || memory <= 2) return 'lite';
  return 'full';
}

/** Measure frame rate for ~600ms; downgrade full → lite if the device struggles. */
function probeFrameRate() {
  if (tier !== 'full' || document.hidden) return;
  let frames = 0;
  let start = 0;
  const step = (t: number) => {
    if (!start) start = t;
    frames++;
    if (t - start < 600) {
      requestAnimationFrame(step);
      return;
    }
    const fps = (frames * 1000) / (t - start);
    if (fps < 40 && tier === 'full') apply('lite');
  };
  requestAnimationFrame(step);
}

/** Call once, before React renders. */
export function initMotion() {
  apply(staticTier());

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener?.('change', () => apply(staticTier()));

  // Probe after the page has settled so load work doesn't skew the result.
  const run = () => setTimeout(probeFrameRate, 800);
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
}

export function getMotionTier() {
  return tier;
}

export function useMotionTier(): MotionTier {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => tier,
    () => 'none',
  );
}

/** True only when the device has a precise pointer that can hover (mouse / trackpad). */
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
