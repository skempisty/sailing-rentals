import React from 'react'

import { Alert } from 'react-bootstrap'

import Box from '../../shared/styled-system/Box'
import Title from '../../shared/styled-system/Title'
import ClassInfoWidget from './ClassInfoWidget'

import { useClasses } from '../../../store/classes'
import { useSession } from '../../../store/session'

const MyClasses = () => {
  const { currentUser } = useSession()
  const { classes, inProgressClasses, upcomingClasses, pastClasses, classRegistrations } = useClasses()

  const myRegistrations = classRegistrations.filter(r => r.userId === currentUser.id)

  const currentUserIsRegistered = (klass) => {
    return myRegistrations.some(r => r.classId === klass.id)
  }

  const myInProgressClasses = inProgressClasses.filter(currentUserIsRegistered)
  const myUpcomingClasses = upcomingClasses.filter(currentUserIsRegistered)
  const myPastClasses = pastClasses.filter(currentUserIsRegistered)

  const allMyClasses = classes.filter(currentUserIsRegistered)

  return (
    <>
      {allMyClasses.length > 0 ?
        <Box>
          {myInProgressClasses.length > 0 &&
            <>
              <Title as='h2'>In Progress</Title>

              {myInProgressClasses.map((klass) =>
                <Box key={klass.id} marginBottom='1em'>
                  <ClassInfoWidget klass={klass}/>
                </Box>
              )}
            </>
          }

          {myUpcomingClasses.length > 0 &&
            <>
              <Title as='h2'>Upcoming</Title>

              {myUpcomingClasses.map((klass) =>
                <Box key={klass.id} marginBottom='1em'>
                  <ClassInfoWidget klass={klass}/>
                </Box>
              )}
            </>
          }

          {myPastClasses.length > 0 &&
            <>
              <Title as='h2'>Past</Title>

              {myPastClasses.map((klass) =>
                <Box key={klass.id} marginBottom='1em'>
                  <ClassInfoWidget klass={klass}/>
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
          <b>Not registered for any classes</b>
        </Alert>
      }
    </>
  )
}

export default MyClasses
