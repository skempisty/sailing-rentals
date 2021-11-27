import React from 'react'

import { FaArrowCircleDown } from 'react-icons/fa'

import Box from '../../shared/styled-system/Box'
import Flex from '../../shared/styled-system/Flex'
import Title from '../../shared/styled-system/Title'
import ClassInfoWidget from './ClassInfoWidget'

import { useClasses } from '../../../store/classes'

const ClassCatalog = () => {
  const { upcomingClasses } = useClasses()

  return (
    <Box>
      <Title as='h2'>Available Classes</Title>

      <Flex alignItems='center' marginBottom='0.5em'>
        <FaArrowCircleDown color='white'/>
        <span style={{ margin: '0 0.5em' }}>First Available Class</span>
        <FaArrowCircleDown color='white'/>
      </Flex>

      {upcomingClasses.map((klass) =>
        <Box key={klass.id} marginBottom='1em'>
          <ClassInfoWidget
            klass={klass}
            hasRegisterBtn
          />
        </Box>
      )}
    </Box>
  )
}

export default ClassCatalog
