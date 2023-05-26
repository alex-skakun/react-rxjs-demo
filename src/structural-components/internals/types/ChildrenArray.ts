import { ReactNode } from 'react';

import { AnyChild } from './AnyChild';
import { ArgOfChildren } from './ArgOfChildren';


export type ChildrenArray<Props, Data> = Array<AnyChild<Props, Data> | ((props: ArgOfChildren<Props>) => ReactNode)>;
