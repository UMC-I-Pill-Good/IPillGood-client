import { setupWorker } from 'msw/browser';
import { rankingMockHandler } from './rankingMockHandler';
import { recentSearchMockHandlers } from './recentSearchMockHandler';

export const rankingMockWorker = setupWorker(
  rankingMockHandler,
  ...recentSearchMockHandlers,
);
