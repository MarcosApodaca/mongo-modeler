import React from 'react';
import {
  TableVm,
  RelationVm,
  DatabaseSchemaVm,
  RelationType,
} from '@/core/providers';
import { findFieldNameAndParent } from './table-relations-accessible.business';

interface Props {
  relation: RelationVm;
  destinationTable: TableVm;
  originTableRef: React.RefObject<HTMLHeadingElement>;
  canvasSchema: DatabaseSchemaVm;
}

export const TableRelationElementDestination: React.FC<Props> = props => {
  const { relation, destinationTable, canvasSchema, originTableRef } = props;

  const originTable = canvasSchema.tables.find(
    table => table.id === relation.fromTableId
  );
  // Defensive Programming
  if (!originTable) return <></>;

  const originField = findFieldNameAndParent(
    originTable.fields,
    relation.fromFieldId
  );

  const destinationField = findFieldNameAndParent(
    destinationTable.fields,
    relation.toFieldId
  );

  const focusTablePosition = () => {
    if (originTableRef.current) {
      originTableRef.current.tabIndex = 0;
      originTableRef.current.focus();
    }
  };

  const getRelationTypeDirecction = (type: RelationType) => {
    switch (type) {
      case '1:M':
        return 'M:1';
      case 'M:1':
        return '1:M';
      default:
        return type;
    }
  };

  return originField && destinationField ? (
    <li>
      {destinationField.parentName
        ? `${destinationField.fieldName} nested field of the ${destinationField.parentName} has a relation type ${getRelationTypeDirecction(relation.type)} with the field ${originField.fieldName} in the ${originTable.tableName} collection`
        : `${destinationField.fieldName} field has a relation type ${getRelationTypeDirecction(relation.type)} with the field ${originField.fieldName} in the ${originTable.tableName} collection`}
      <button
        onClick={() => {
          focusTablePosition();
        }}
      >
        Go to {originTable.tableName}
      </button>
    </li>
  ) : null;
};
