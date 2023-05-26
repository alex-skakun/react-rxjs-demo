import { Observable } from 'rxjs';
import { useContext, useMemo } from 'react';

import { StructuralComponent, StructuralComponentContext, StructuralContext } from '../internals';


export function useStructuralData<P, D>(selector: StructuralComponent<P, D>): Observable<D[]> {
  const structuralChildrenContext = useContext<StructuralComponentContext<D>>(StructuralContext);

  return useMemo(() => structuralChildrenContext.selectDataBy(selector.SELECTOR), [selector.SELECTOR]);
}
