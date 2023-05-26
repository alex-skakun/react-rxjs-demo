import { buffer, connectable, map, Observable, ReplaySubject, Subject, switchMap, combineLatest } from 'rxjs';
import { useOnce } from 'react-cool-hooks';
import { useSubject, useSubscription } from 'react-rx-tools';

import { SafeChildren, StructuralComponentContext, StructuralComponentReport } from '../types';
import { ReactNode } from 'react';

export function useStructuralComponentContext<CData, CArgs extends any[]>(): [StructuralComponentContext<CData, CArgs>, Subject<void>] {
  const reportsSubject = useSubject(() => new Subject<StructuralComponentReport<CData, CArgs>>());
  const bufferSignal = useSubject(() => new Subject<void>());
  const reports$ = useOnce(() => connectable(
    reportsSubject.pipe(buffer(bufferSignal)),
    { connector: () => new ReplaySubject(1) },
  ));
  const context = useOnce<StructuralComponentContext<CData, CArgs>>(() => ({
    reports$,
    reportAboutYourself(report: StructuralComponentReport<any>): void {
      reportsSubject.next(report);
    },
    selectAllBy(selector: symbol): Observable<{ data: CData, children: SafeChildren<ReactNode, CArgs> }[]> {
      return reports$.pipe(
        map(allReports => {
          return allReports.reduce<Observable<{ data: CData, children: SafeChildren<ReactNode, CArgs> }>[]>((
            filteredReports,
            report,
          ) => {
            if (report.selector === selector) {
              filteredReports.push(
                combineLatest(report.data, report.children)
                  .pipe(
                    map(([data, children]) => ({ data, children })),
                  ),
              );
            }

            return filteredReports;
          }, []);
        }),
        switchMap(reports => combineLatest(reports)),
      );
    },
    selectDataBy(selector: symbol): Observable<CData[]> {
      return reports$.pipe(
        map(allReports => {
          return allReports.reduce<Observable<CData>[]>((data, report) => {
            if (report.selector === selector) {
              data.push(report.data);
            }

            return data;
          }, []);
        }),
        switchMap(dataObservables => combineLatest(dataObservables)),
      );
    },
    selectChildrenBy(selector: symbol): Observable<SafeChildren<ReactNode, CArgs>> {
      return reports$.pipe(
        map(allReports => {
          return allReports.reduce<Observable<SafeChildren<ReactNode, CArgs>>[]>((data, report) => {
            if (report.selector === selector) {
              data.push(report.children);
            }

            return data;
          }, []);
        }),
        switchMap(dataObservables => combineLatest(dataObservables)),
        map(childrenArray => {
          const safeChildren = new SafeChildren<ReactNode, CArgs>();

          childrenArray.forEach(child => safeChildren.push(child as SafeChildren))

          return safeChildren;
        })
      );
    },
  }));

  useSubscription(() => reports$.connect(), { immediate: true });

  return [context, bufferSignal];
}
