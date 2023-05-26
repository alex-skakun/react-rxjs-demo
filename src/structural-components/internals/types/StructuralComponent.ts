import { FunctionComponent } from 'react';
import { STRUCTURAL_COMPONENT_FLAG } from '../constants';


export interface StructuralComponent<Props = {}, Data = never, Ref = never> extends FunctionComponent<Props> {
  readonly STRUCTURAL_COMPONENT_FLAG: typeof STRUCTURAL_COMPONENT_FLAG;
  readonly SELECTOR: symbol;
  readonly displayName: string;
}

export interface DevStructuralComponent<Props, Data = never> extends FunctionComponent<Props> {
  STRUCTURAL_COMPONENT_FLAG?: typeof STRUCTURAL_COMPONENT_FLAG;
  SELECTOR?: symbol;
  displayName?: string;
}
