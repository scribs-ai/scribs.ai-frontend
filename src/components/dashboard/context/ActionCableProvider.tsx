'use client'
import { config } from '@/config';
import { createContext, useEffect, useState, ReactNode } from 'react';

interface ActionCableProviderProps {
  children: ReactNode;
}

interface CableApp {
  cable: any;
}

const ActionCableContext = createContext<any>(null);

const ActionCableProvider: React.FC<ActionCableProviderProps> = ({
  children,
}: ActionCableProviderProps) => {
  const [CableApp, setCableApp] = useState<CableApp>({ cable: undefined });

  const loadConsumer = async () => {
    const { createConsumer } = await import('@rails/actioncable');
    return createConsumer;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && CableApp.cable === undefined) {
      loadConsumer().then((createConsumer) => {
        setCableApp({
          cable: createConsumer(`${config.ws_url}`),
        });
      });
    }
  }, [CableApp.cable]);

  return (
    <ActionCableContext.Provider value={CableApp.cable}>
      {children}
    </ActionCableContext.Provider>
  );
};

export { ActionCableContext, ActionCableProvider };
