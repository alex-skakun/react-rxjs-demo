import { ReactNode } from 'react';
import { Observable } from 'rxjs';

import { SafeChildren } from './SafeChildren';


export interface StructuralComponentReport<ChildData, ChildrenArgs extends any[] = any[]> {
  data: Observable<ChildData>;
  children: Observable<SafeChildren<ReactNode, ChildrenArgs>>;
  selector: symbol;
}
