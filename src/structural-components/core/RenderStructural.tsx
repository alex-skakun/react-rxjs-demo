import { ReactNode, useContext, useMemo } from 'react';
import { SafeChildren, StructuralChildren, StructuralRendererContext, useChildrenChange } from '../internals';


export class RenderStructural {

  static Data<D>({ data }: { data: D }): null {
    const rendererContext = useContext(StructuralRendererContext);

    rendererContext.dataSubject.next(data);

    return null;
  }

  static JSX<A extends any[]>({ children }: { children: ReactNode | ((...args: A) => ReactNode) }): null {
    const rendererContext = useContext(StructuralRendererContext);
    const [childrenArray, childrenChangeFlag] = useChildrenChange(children as StructuralChildren);

    useMemo(() => {
      const safeChildren = new SafeChildren();

      childrenArray.forEach(child => safeChildren.push(child));

      rendererContext.childrenSubject.next(safeChildren);
    }, [childrenChangeFlag]);

    return null;
  }

}
