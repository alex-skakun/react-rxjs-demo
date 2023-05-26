import { ReactNode } from 'react';
import { Subject } from 'rxjs';

import { SafeChildren } from './SafeChildren';


export interface StructuralRendererContextData<Data = any, Args extends any[] = any[]> {
  dataSubject: Subject<Data>;
  childrenSubject: Subject<SafeChildren<ReactNode, Args>>;
}
