import { ReactNode } from 'react';
import { useOnce } from 'react-cool-hooks';
import { useSubject } from 'react-rx-tools';

import { distinctUntilChanged, ReplaySubject } from 'rxjs';
import { SafeChildren, StructuralComponentReport, StructuralRendererContextData } from '../types';


export function _useStructuralComponentReport<Data, Args extends any[]>(
  selector: symbol
): [StructuralComponentReport<Data, Args>, StructuralRendererContextData<Data, Args>] {
  const dataSubject = useSubject(() => new ReplaySubject<Data>(1));
  const childrenSubject = useSubject(() => new ReplaySubject<SafeChildren<ReactNode, Args>>(1));

  const report = useOnce(() => ({
    data: dataSubject.pipe(distinctUntilChanged()),
    children: childrenSubject.pipe(distinctUntilChanged()),
    selector
  }));

  const context = useOnce<StructuralRendererContextData<Data, Args>>(() => ({
    dataSubject,
    childrenSubject
  }));

  return [report, context];
}
