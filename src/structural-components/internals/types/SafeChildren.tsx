import { ReactNode, Fragment, Key } from 'react';
import { isFunction } from 'value-guards';


export class SafeChildren<E extends ReactNode = ReactNode, A extends any[] = any[]> extends Array<E | ((...args: A) => E) | SafeChildren> {

  render(...args: A): JSX.Element {
    return <>{
      this.map((item, index) => {
        const node = item instanceof SafeChildren
          ? (item as SafeChildren<ReactNode, A>).render(...args)
          : isFunction(item) ? item(...args) : item;

        return <Fragment key={(node as { key: Key })?.key ?? index}>{node}</Fragment>;
      })
    }</>;
  }

}
