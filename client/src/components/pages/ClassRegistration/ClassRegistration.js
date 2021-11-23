import React, { useEffect } from 'react'

import Box from '../../shared/styled-system/Box'
import Title from '../../shared/styled-system/Title'
import ContentWrapper from '../../shared/ContentWrapper'

const ClassRegistration = () => {
  const fetchData = async () => {

  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ContentWrapper>
      <Box color='white'>
        <Title>Sailing Classes</Title>
      </Box>
    </ContentWrapper>
  )
}

export default ClassRegistration
