import { createContext } from 'react';
import { Subject } from 'rxjs';

import { StructuralRendererContextData } from '../types';


export const StructuralRendererContext = createContext<StructuralRendererContextData>({
  dataSubject: new Subject(),
  childrenSubject: new Subject(),
});
