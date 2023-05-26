import { PropsWithChildren, ReactNode } from 'react';

import { RenderStructural, structuralComponent } from '../structural-components';


export type ThProps = PropsWithChildren<{}>;

export const Th = structuralComponent<ThProps, never>(({ children }) => {
  return <RenderStructural.JSX>{children}</RenderStructural.JSX>;
}, 'Th');
