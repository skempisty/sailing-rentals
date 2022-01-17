import React from 'react'

import { Alert } from 'react-bootstrap'

import Box from '../../../shared/styled-system/Box'
import Title from '../../../shared/styled-system/Title'
import ClassInfoWidget from '../ClassInfoWidget'

import { useClasses } from '../../../../store/classes'
import { useSession } from '../../../../store/session'

const InstructorsPanel = () => {
  const { currentUser } = useSession()
  const { inProgressClasses, upcomingClasses } = useClasses()

  const currentUserIsClassInstructor = (klass) => {
    return klass.meetings.some(m => m.instructorId === currentUser.id)
  }

  const myInProgressClasses = inProgressClasses.filter(currentUserIsClassInstructor)
  const myUpcomingClasses = upcomingClasses.filter(currentUserIsClassInstructor)

  return (
    <>
      {(myInProgressClasses.length > 0 || myUpcomingClasses.length > 0) ?
        <Box>
          {myInProgressClasses.length > 0 &&
            <>
              <Title as='h3'>In Progress Assignments</Title>

              {myInProgressClasses.map((klass) =>
                <Box key={klass.id} marginBottom='1em'>
                  <ClassInfoWidget klass={klass} instructorId={currentUser.id}/>
                </Box>
              )}
            </>
          }

          {myUpcomingClasses.length > 0 &&
            <>
              <Title as='h3'>Upcoming Assignments</Title>

              {myUpcomingClasses.map((klass) =>
                <Box key={klass.id} marginBottom='1em'>
                  <ClassInfoWidget klass={klass} instructorId={currentUser.id}/>
                </Box>
              )}
            </>
          }
        </Box>
        :
        <Alert
          variant='dark'
          style={{
            margin: '0.5em',
            textAlign: 'center'
          }}
        >
          <b>No assignments</b>
        </Alert>
      }
    </>
  )
}

export default InstructorsPanel
