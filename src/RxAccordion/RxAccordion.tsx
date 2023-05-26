import { CSSProperties, forwardRef, MouseEvent, PropsWithChildren, ReactElement, ReactNode, useImperativeHandle, useRef } from 'react';

import css from './RxAccordion.scss';
import { Render$, useObservable, useRxEvent, useSubject } from 'react-rx-tools';
import {
  animationFrameScheduler,
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  of,
  scheduled,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { useFunction, useOnce } from 'react-cool-hooks';
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
  const articleRef = useRef<HTMLDivElement>(null);
  const getScrollHeight = useFunction((): string => `${articleRef.current?.scrollHeight ?? 0}px`);
  const mqlReducedMotion = useOnce(() => matchMedia('screen and (prefers-reduced-motion: reduce)'));
  const [click$, onClick] = useRxEvent<MouseEvent>();
  const outState = useSubject(() => new BehaviorSubject(initialState));
  const style$ = useOnce<Observable<CSSProperties>>(() => outState.pipe(
    switchMap((outState) => click$.pipe(
      map(() => outState = !outState),
      startWith(outState),
    )),
    map((state) => state ? 'auto' : '0px'),
    switchMap((targetHeight, index) => {
      if (index === 0 || mqlReducedMotion.matches) {
        return of(targetHeight);
      }

      const containerEl = articleRef.current as HTMLDivElement;
      const actualHeightInPx = getScrollHeight();

      return targetHeight === 'auto'
        ? fromEvent<TransitionEvent>(containerEl, 'transitionend')
          .pipe(
            filter(({ propertyName, target }) => propertyName === 'height' && target === containerEl),
            take(1),
            map(() => 'auto'),
            startWith(actualHeightInPx),
          )
        : scheduled([actualHeightInPx, '0px'], animationFrameScheduler);
    }),
    distinctUntilChanged(),
    map((height): CSSProperties => ({ height })),
  ));

  const accordionRef = useOnce<AccordionRef>(() => ({
    expand: () => outState.next(true),
    collapse: () => outState.next(false),
  }));

  useImperativeHandle(forwardedRef, () => accordionRef);

  return (
    <div className={css.accordion}>
      <header className={css.header}>
        <CleanButton className={css.toggleButton} onClick={onClick}>{title}</CleanButton>
      </header>
      <Render$ $={style$} definedOnly>
        {(style) => (
          <div className={css.content} ref={articleRef} style={style}>
            <article className={css.body}>{children}</article>
          </div>
        )}
      </Render$>
    </div>
  );
});
