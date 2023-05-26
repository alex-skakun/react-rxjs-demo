import { ReactElement, useMemo } from 'react';
import { ArgOfChildren, RenderStructural, structuralComponent, StructuralElement, useStructuralChildren } from '../structural-components';
import { Td, TdProps } from './Td';
import { Th, ThProps } from './Th';

export type ColumnDefProps = {
  id: string;
  sortable?: boolean;
  children: [StructuralElement<ThProps>, StructuralElement<TdProps>];
};

export type ColumnDefData = {
  id: string,
  sortable?: boolean,
  RenderTh: (p: ArgOfChildren<ThProps>) => ReactElement,
  RenderTd: (p: ArgOfChildren<TdProps>) => ReactElement,
};

export const ColumnDef = structuralComponent<ColumnDefProps, ColumnDefData>(({ id, sortable }) => {
  const RenderTh = useStructuralChildren(Th);
  const RenderTd = useStructuralChildren(Td);
  const columnData = useMemo(() => {
    return {
      id,
      sortable,
      RenderTh,
      RenderTd,
    };
  }, [id, sortable]);

  return <RenderStructural.Data data={columnData}/>;
}, 'ColumnDef', [Th, Td]);
