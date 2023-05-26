import { createContext, ReactNode } from 'react';
import { BehaviorSubject, NEVER, Observable, startWith } from 'rxjs';

import { SafeChildren, StructuralComponentContext, StructuralComponentReport } from '../types';


export const StructuralContext = createContext<StructuralComponentContext>({
  reports$: new BehaviorSubject([]).asObservable(),

  reportAboutYourself(_report: StructuralComponentReport<any, []>) {

  },
  selectAllBy(_selector: symbol): Observable<{ data: any; children: SafeChildren<ReactNode, []> }[]> {
    return NEVER.pipe(startWith([]));
  },
  selectDataBy(_selector: symbol): Observable<[]> {
    return NEVER.pipe(startWith([] as []));
  },
  selectChildrenBy(_selector: symbol): Observable<SafeChildren<ReactNode, []>> {
    return NEVER.pipe(startWith(new SafeChildren()));
  }
});
