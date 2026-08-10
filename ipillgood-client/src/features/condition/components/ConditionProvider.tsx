'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useConditionFlow } from '../hooks/useConditionFlow';

type ConditionContextValue = ReturnType<typeof useConditionFlow>;

const ConditionContext = createContext<ConditionContextValue | null>(null);

export const ConditionProvider = ({ children }: { children: ReactNode }) => {
  const conditionFlow = useConditionFlow();

  return <ConditionContext.Provider value={conditionFlow}>{children}</ConditionContext.Provider>;
};

export const useConditionContext = () => {
  const context = useContext(ConditionContext);

  if (!context) {
    throw new Error('useConditionContext must be used within ConditionProvider');
  }

  return context;
};
