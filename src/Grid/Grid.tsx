import { Render$ } from 'react-rx-tools';
import { structuralComponent, useStructuralData, StructuralElement } from '../structural-components';
import { ColumnDef, ColumnDefProps } from './ColumnDef';


type GridProps = {
  data: any[];
  children: StructuralElement<ColumnDefProps>[] | StructuralElement<ColumnDefProps>;
};

export const Grid = structuralComponent<GridProps, never>(({ data }) => {
  const columns$ = useStructuralData(ColumnDef);

  return <table>
    <thead>
    <tr>
      <Render$ $={columns$} definedOnly>
        {columns => columns.map(({ id, RenderTh }) => <th data-id={id} key={id}>
          <RenderTh/>
        </th>)}
      </Render$>
    </tr>
    </thead>
    <tbody>
    {data.map((row, i) => <tr key={i}>
      <Render$ $={columns$} definedOnly>
        {columns => columns.map(({ id, RenderTd }) => <td key={id}>
          <RenderTd {...row}/>
        </td>)}
      </Render$>
    </tr>)}
    </tbody>
  </table>;
}, 'Grid', [ColumnDef]);
