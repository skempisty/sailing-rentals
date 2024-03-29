import React from 'react'

import { Alert, Card, Table } from 'react-bootstrap'

import ClassRow from './ClassRow'

import isNotDeleted from '../../../../../utils/isNotDeleted'

const ClassesTable = ({ classes, noDataMsg, hasActionColumn }) => {
  const nonDeletedClasses = classes.filter(isNotDeleted)

  const hasClasses = !!nonDeletedClasses.length

  return (
    <Card>
      <Table responsive style={{ margin: '0' }}>
        <thead><tr>
          <th>ID</th>
          <th>Start</th>
          <th>End</th>
          <th>Enrolled</th>
          <th>Created At</th>
          <th/>
        </tr></thead>

        {hasClasses &&
          <tbody>
            {nonDeletedClasses.map((klass, index) =>
              <ClassRow
                key={`class-row-${klass.id}-${index}`}
                klass={klass}
                hasActionColumn={hasActionColumn}
              />
            )}
          </tbody>
        }
      </Table>

      {!hasClasses &&
        <Alert
          variant='dark'
          style={{
            margin: '0.5em',
            textAlign: 'center'
          }}
        >
          <b>{noDataMsg}</b>
        </Alert>
      }
    </Card>
  )
}

export default ClassesTable
