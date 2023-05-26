import { useEffect, useRef } from 'react';
import { useFunction } from 'react-cool-hooks';

export interface AnimationFrameFunction extends CallableFunction {
  (callback: () => void): () => void;
}

export function useAnimationFrame(): AnimationFrameFunction {
  const idsRef = useRef(new Set<number>());

  useEffect(() => {
    return () => {
      idsRef.current.forEach((id) => cancelAnimationFrame(id));
      idsRef.current.clear();
    };
  }, []);

  return useFunction((callback: () => void): () => void => {
    const id = requestAnimationFrame(() => {
      idsRef.current.delete(id);
      callback();
    });

    idsRef.current.add(id);

    return () => cancelAnimationFrame(id);
  });
}

export interface AddEventListenerFunction extends CallableFunction {
  <T extends EventTarget = EventTarget, E extends Event = Event>(
    target: T,
    type: string,
    callback: (event: Omit<E, 'currentTarget'> & { currentTarget: T }) => void,
  ): () => void;
}

export function useEventListener(): AddEventListenerFunction {
  const unBindsRef = useRef(new Set<() => void>());

  useEffect(() => {
    return () => {
      unBindsRef.current.forEach((unBind) => unBind());
      unBindsRef.current.clear();
    };
  }, []);

  return useFunction((target: EventTarget, type: string, callback: (event: Event) => void): () => void => {
    const handler = (event: Event) => callback(event);

    target.addEventListener(type, handler);

    const unBind = () => {
      unBindsRef.current.delete(unBind);
      target.removeEventListener(type, handler);
    };

    unBindsRef.current.add(unBind);

    return unBind;
  }) as AddEventListenerFunction;
}
