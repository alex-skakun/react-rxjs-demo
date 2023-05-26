import { Fragment, ReactElement, useRef } from 'react';
import { Accordion, AccordionRef } from './RxAccordion';
import { useFunction } from 'react-cool-hooks';
import { ColumnDef, Grid, Td, Th } from './Grid';
import { gridData } from './gridData';

export function AppRoot(): ReactElement {
  const accordionRef = useRef<AccordionRef>(null);

  const expand = useFunction(() => accordionRef.current?.expand());
  const collapse = useFunction(() => accordionRef.current?.collapse());

  return (
    <Fragment>
      <div style={{ margin: '20px 0' }}>
        <button type="button" onClick={expand}>Expand</button>
        <button type="button" onClick={collapse}>Collapse</button>
      </div>

      <Accordion ref={accordionRef} title="Toggle">
        <Grid data={gridData}>
          <ColumnDef id="firstName">
            <Th>First name</Th>
            <Td>{({firstName}) => firstName}</Td>
          </ColumnDef>
          <ColumnDef id="email">
            <Th>Email</Th>
            <Td>{({email}) => (
              <a href={`mailto:${email}`}>{email}</a>
            )}</Td>
          </ColumnDef>
        </Grid>
      </Accordion>
    </Fragment>
  );
}
