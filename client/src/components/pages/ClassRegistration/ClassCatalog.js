import React from 'react'

import { Alert } from 'react-bootstrap'
import { FaArrowCircleDown } from 'react-icons/fa'

import Box from '../../shared/styled-system/Box'
import Flex from '../../shared/styled-system/Flex'
import Title from '../../shared/styled-system/Title'
import Text from '../../shared/styled-system/Text'
import ClassInfoWidget from './ClassInfoWidget'

import isNotDeleted from '../../../utils/isNotDeleted'

import { useClasses } from '../../../store/classes'

const ClassCatalog = () => {
  const { upcomingClasses } = useClasses()

  return (
    <Box>
      <Title as='h2'>Available Classes</Title>

      {upcomingClasses.length > 0 ?
        <>
          <Flex alignItems='center' marginBottom='0.5em'>
            <FaArrowCircleDown color='white'/>
            <span style={{ margin: '0 0.5em' }}>First Available Class</span>
            <FaArrowCircleDown color='white'/>
          </Flex>

          {upcomingClasses.filter(isNotDeleted).map((klass) =>
            <Box key={klass.id} marginBottom='1em'>
              <ClassInfoWidget
                klass={klass}
                hasRegisterBtn
              />
            </Box>
          )}
        </>
        :
        <Alert
          variant='dark'
          style={{
            marginTop: '0.5em',
            textAlign: 'center'
          }}
        >
          <Title as='h3'>No Upcoming Classes</Title>
          <Text>Please check back later</Text>
        </Alert>
      }
    </Box>
  )
}

export default ClassCatalog
