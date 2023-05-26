import { Observable } from 'rxjs';
import { ReactNode } from 'react';

import { StructuralComponentReport } from './StructuralComponentReport';
import { SafeChildren } from './SafeChildren';


export interface StructuralComponentContext<ChildData = any, ChildrenArgs extends any[] = any[]> {
  reports$: Observable<StructuralComponentReport<ChildData, ChildrenArgs>[]>;

  reportAboutYourself<Data, Args extends any[]>(report: StructuralComponentReport<Data, Args>): void;

  selectAllBy(selector: symbol): Observable<{ data: ChildData, children: SafeChildren<ReactNode, ChildrenArgs> }[]>;

  selectDataBy(selector: symbol): Observable<ChildData[]>;

  selectChildrenBy(selector: symbol): Observable<SafeChildren<ReactNode, ChildrenArgs>>;
}
