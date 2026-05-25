import { describe, expect, it } from 'vitest';
import { careerCoreWorkflow, careerLaunchPhases, careerRoleLandingPages, careerToolTracks } from './career-tools';

describe('career tools catalog', () => {
  it('keeps the launch plan centered on the application workflow', () => {
    expect(careerCoreWorkflow.length).toBeGreaterThanOrEqual(4);
    expect(careerToolTracks.map((track) => track.slug)).toContain('ats-match-checker');
    expect(careerToolTracks.filter((track) => track.status === 'now').length).toBeGreaterThanOrEqual(3);
  });

  it('covers role pages and phased rollout guidance', () => {
    expect(careerRoleLandingPages.length).toBeGreaterThanOrEqual(6);
    expect(careerLaunchPhases.map((phase) => phase.name)).toEqual([
      'Phase 1: Job Application Core',
      'Phase 2: Conversion Layer',
      'Phase 3: Retention and Monetization'
    ]);
  });
});
