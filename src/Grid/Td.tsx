import { ReactNode } from 'react';

import { RenderStructural, structuralComponent } from '../structural-components';


export type TdProps = {
  children: (data: Record<string, any>) => ReactNode;
};

export const Td = structuralComponent<TdProps, never>(({ children }) => {
  return <RenderStructural.JSX>{children}</RenderStructural.JSX>;
}, 'Td');
