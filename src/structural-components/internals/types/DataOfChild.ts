import { StructuralElement } from './StructuralElement';


export type DataOfChild<T extends StructuralElement<any, any> = StructuralElement<any, any>> =
  T extends StructuralElement<any, infer R> ? R : never;
