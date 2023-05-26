import { StructuralElement } from './StructuralElement';


export type PropsOfChild<T extends StructuralElement<any, any> = StructuralElement<any, any>> =
  T extends StructuralElement<infer R, any> ? R : never;
