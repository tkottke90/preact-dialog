import { createContext } from "preact/compat";
import { useContext } from 'preact/hooks';

export function createContextWithHook<TContextProps>() {
  const context = createContext<TContextProps>({} as any);

  return {
    Provider: context.Provider,
    useHook: () => {
      const ctx = useContext(context);

      if (!ctx) {
        throw new Error('Invalid Context Hook.  No Context Found');
      }

      return ctx;
    }
  }
}