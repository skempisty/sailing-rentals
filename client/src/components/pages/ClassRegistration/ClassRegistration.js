import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Tab, Tabs } from 'react-bootstrap'

import Box from '../../shared/styled-system/Box'
import Title from '../../shared/styled-system/Title'
import ContentWrapper from '../../shared/ContentWrapper'
import ClassCatalog from './ClassCatalog'
import MyClasses from './MyClasses'

import { useClasses } from '../../../store/classes'

const StyledWrapper = styled.div`
  [role='tab'] {
    color: white;
  }
`

const ClassRegistration = () => {
  const [activeKey, setActiveKey] = useState()

  const {
    getClassesThunk,
    getClassRegistrationsThunk
  } = useClasses()

  const fetchData = async () => {
    getClassesThunk()
    getClassRegistrationsThunk()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ContentWrapper>
      <StyledWrapper>
        <Box color='white'>
          <Title color='#fec307'>Sailing Classes</Title>

          <Tabs
            activeKey={activeKey}
            onSelect={(tab) => setActiveKey(tab)}
            variant='pills'
            style={{
              marginBottom: '1em',
              paddingBottom: '1em',
              borderBottom: '1px solid white'
            }}
            mountOnEnter
            unmountOnExit
          >
            <Tab eventKey='register' title='Register'>
              <ClassCatalog/>
            </Tab>

            <Tab eventKey='myClasses' title='My Classes'>
              <MyClasses/>
            </Tab>
          </Tabs>
        </Box>
      </StyledWrapper>
    </ContentWrapper>
  )
}

export default ClassRegistration
