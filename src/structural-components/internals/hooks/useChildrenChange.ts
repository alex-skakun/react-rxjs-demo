import { ChildrenArray, DataOfChild, PropsOfChild, StructuralChildren, StructuralElement } from '../types';
import { isFunction } from 'value-guards';
import { Children, useRef } from 'react';

export function useChildrenChange<Props, Child extends StructuralElement<any, any>, Data>(
  children: StructuralChildren<PropsOfChild<Child>, DataOfChild<Child>>,
): [ChildrenArray<Props, Data>, symbol] {
  const childrenArray = isFunction(children)
    ? [children]
    : (Array.isArray(children) ? children : Children.toArray(children));
  const { current } = useRef<{ flag: symbol, children: ChildrenArray<Props, Data> }>({
    children: childrenArray,
    flag: Symbol(),
  });

  if (current.children === childrenArray) {
    return [childrenArray, current.flag];
  }

  if (current.children.length !== childrenArray.length || isNewChildren(current.children, childrenArray)) {
    current.children = childrenArray;
    current.flag = Symbol();

    return [childrenArray, current.flag];
  }

  return [current.children, current.flag];
}

function isNewChildren<Props, Data>(
  prevChildren: ChildrenArray<Props, Data>,
  newChildren: ChildrenArray<Props, Data>,
): boolean {
  return newChildren.some((newChild, index) => {
    return newChild !== prevChildren[index];
  });
}
