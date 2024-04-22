import React from 'react';
import classes from './canvas-accessible.pod.module.css';
import { CanvasAccessibleComponent } from './canvas-accessible.component';
import { DatabaseSchemaVm, TableVm } from '@/core/providers';
import { GUID } from '@/core/model';

interface CanvasAccessibleProps {
  canvasSchema: DatabaseSchemaVm;
  onAddTableModal: () => void;
  onEditTable: (table: TableVm) => void;
  onEditRelation: (relationId: GUID) => void;
  onDeleteSelectedItem: (tableId: string) => void;
}
export const CanvasAccessible: React.FC<CanvasAccessibleProps> = props => {
  const {
    canvasSchema,
    onAddTableModal,
    onEditTable,
    onEditRelation,
    onDeleteSelectedItem,
  } = props;

  const canvasAccessibleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (canvasAccessibleRef.current) {
      canvasAccessibleRef.current.focus();
    }
  }, []);

  return (
    //Maybe it needs something for better accessibility.
    //Before, the screen reader read all the content and displayed
    // the levels of the titles and the list of items, now read all like plain text.
    <section
      className={classes.screenReaderOnly}
      tabIndex={-1}
      ref={canvasAccessibleRef}
      aria-live="polite"
    >
      <CanvasAccessibleComponent
        canvasSchema={canvasSchema}
        onAddTableModal={onAddTableModal}
        onEditTable={onEditTable}
        onEditRelation={onEditRelation}
        onDeleteSelectedItem={onDeleteSelectedItem}
      />
    </section>
  );
};
