import { ReactNode } from 'react';

import { StructuralElement } from './StructuralElement';


export type AnyChild<Props, Data> = ReactNode | StructuralElement<Props, Data>;
