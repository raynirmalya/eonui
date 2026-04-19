export const icons = {
  check: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M6.4 11.2 2.8 7.6l-1.2 1.2 4.8 4.8L14.4 5.6l-1.2-1.2z"/></svg>',
  close: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="m3.3 4.7 1.4-1.4L8 6.6l3.3-3.3 1.4 1.4L9.4 8l3.3 3.3-1.4 1.4L8 9.4l-3.3 3.3-1.4-1.4L6.6 8z"/></svg>',
  info: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.3A6.7 6.7 0 1 0 8 14.7 6.7 6.7 0 0 0 8 1.3Zm.8 10H7.2V7h1.6Zm0-5.4H7.2V4.3h1.6Z"/></svg>'
} as const;

export type IconName = keyof typeof icons;
