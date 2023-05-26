import { forwardRef, PropsWithChildren, ReactElement, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useFunction, useOnce } from 'react-cool-hooks';

import css from './Accordion.scss';
import { useAnimationFrame, useEventListener } from '../extras';
import { CleanButton } from '../CleanButton';

export type AccordionProps = PropsWithChildren<{
  title: ReactNode;
  initialState?: boolean;
}>;

export type AccordionRef = {
  expand: () => void;
  collapse: () => void;
};

export const Accordion = forwardRef<AccordionRef, AccordionProps>((
  { initialState = false, title, children },
  forwardedRef,
): ReactElement => {
  const animationFrame = useAnimationFrame();
  const addListener = useEventListener();
  const articleRef = useRef<HTMLDivElement>(null);
  const getScrollHeight = useFunction((): string => `${articleRef.current?.scrollHeight ?? 0}px`);
  const mqlReducedMotion = useOnce(() => matchMedia('screen and (prefers-reduced-motion: reduce)'));
  const [opened, setOpened] = useState(initialState);
  const targetHeight = useMemo((): string => opened ? 'auto' : '0px', [opened]);
  const [height, setHeight] = useState(targetHeight);

  const onHeaderClick = useFunction((): void => {
    setOpened((currentState) => !currentState);
  });

  const accordionRef = useOnce<AccordionRef>(() => ({
    expand: () => setOpened(true),
    collapse: () => setOpened(false),
  }));

  useImperativeHandle(forwardedRef, () => accordionRef);

  useEffect(() => {
    let removeListener: undefined | (() => void);
    let cancelFrame: undefined | (() => void);

    if (mqlReducedMotion.matches) {
      setHeight(targetHeight);
    } else {
      if (targetHeight === 'auto') {
        setHeight(getScrollHeight());
        removeListener = addListener<HTMLDivElement, TransitionEvent>(articleRef.current!, 'transitionend', (event) => {
          if (event.target === articleRef.current && event.propertyName === 'height') {
            removeListener?.();
            setHeight(targetHeight);
          }
        });
      } else {
        setHeight(() => {
          cancelFrame = animationFrame(() => {
            setHeight(targetHeight);
          });

          return getScrollHeight();
        });

      }
    }

    return () => {
      removeListener?.();
      cancelFrame?.();
    };
  }, [targetHeight]);

  return (
    <div className={css.accordion}>
      <header className={css.header}>
        <CleanButton className={css.toggleButton} onClick={onHeaderClick}>{title}</CleanButton>
      </header>
      <div ref={articleRef} style={{ height }} className={css.content}>
        <article className={css.body}>{children}</article>
      </div>
    </div>
  );
});
