import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { RiSailboatFill } from 'react-icons/ri'
import { FaAppleAlt, FaArrowCircleUp, FaInfoCircle } from 'react-icons/fa'
import { Tab, Tabs } from 'react-bootstrap'

import Box from '../../shared/styled-system/Box'
import Flex from '../../shared/styled-system/Flex'
import Text from '../../shared/styled-system/Text'
import Title from '../../shared/styled-system/Title'
import ContentWrapper from '../../shared/ContentWrapper'
import ClassCatalog from './ClassCatalog'
import MyClasses from './MyClasses'
import ClassInfo from './ClassInfo'
import InstructorsPanel from './InstructorsPanel'

import { siteColors } from '../../../utils/constants'

import { useClasses } from '../../../store/classes'
import { useUsers } from '../../../store/users'
import { useSession } from '../../../store/session'

const StyledWrapper = styled.div`
  [role='tab'] {
    color: white;
  }
  
  [title='Instructors'] {
    color: red;
  }
`

const ClassRegistration = () => {
  const [activeKey, setActiveKey] = useState()

  const { getInstructorsThunk } = useUsers()

  const {
    getClassesThunk,
    getClassRegistrationsThunk
  } = useClasses()

  const { currentUser } = useSession()

  const fetchData = async () => {
    getClassesThunk()
    getClassRegistrationsThunk()
    getInstructorsThunk()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const instructorPanelTitle = (
    <Flex alignItems='center' color={siteColors.gold}>
      <FaAppleAlt/>
      <Text marginLeft='0.5em'>Instructor Panel</Text>
    </Flex>
  )

  const registerTitle = (
    <Flex alignItems='center'>
      <FaArrowCircleUp/>
      <Text marginLeft='0.5em'>Register</Text>
    </Flex>
  )

  const myClassesTitle = (
    <Flex alignItems='center'>
      <RiSailboatFill/>
      <Text marginLeft='0.5em'>My Classes</Text>
    </Flex>
  )

  const classInfoTitle = (
    <Flex alignItems='center'>
      <FaInfoCircle/>
      <Text marginLeft='0.5em'>Class Info</Text>
    </Flex>
  )

  return (
    <ContentWrapper>
      <StyledWrapper>
        <Box color='white'>
          <Title color={siteColors.gold}>Sailing Classes</Title>

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
            {currentUser.isInstructor > 0 &&
              <Tab eventKey='instructors' title={instructorPanelTitle}>
                <InstructorsPanel/>
              </Tab>
            }

            <Tab eventKey='register' title={registerTitle}>
              <ClassCatalog/>
            </Tab>

            <Tab eventKey='myClasses' title={myClassesTitle}>
              <MyClasses/>
            </Tab>

            <Tab eventKey='classInfo' title={classInfoTitle}>
              <ClassInfo/>
            </Tab>
          </Tabs>
        </Box>
      </StyledWrapper>
    </ContentWrapper>
  )
}

export default ClassRegistration
