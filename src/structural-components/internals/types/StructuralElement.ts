import { ReactElement } from 'react';

import { StructuralComponent } from './StructuralComponent';


export type StructuralElement<Props = {}, Data = never> = ReactElement<Props, StructuralComponent<Props, Data>>;
