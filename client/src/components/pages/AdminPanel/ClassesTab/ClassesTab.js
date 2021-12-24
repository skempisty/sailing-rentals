import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import Flex from '../../../shared/styled-system/Flex'
import Title from '../../../shared/styled-system/Title'
import Text from '../../../shared/styled-system/Text'

import LoadingPageMessage from '../../../LoadingPageMessage'
import ClassesTable from './ClassesTable'

import { useClasses } from '../../../../store/classes'
import { useUsers } from '../../../../store/users'
import { useRentals } from '../../../../store/rentals'

const ClassesTab = () => {
  const history = useHistory()

  const [loading, setLoading] = useState(true)

  const { getUsersThunk } = useUsers()
  const { inProgressClasses, upcomingClasses, pastClasses, getClassesThunk, getClassRegistrationsThunk } = useClasses()
  const { getAllRentalsThunk } = useRentals()

  const fetchData = async () => {
    await getUsersThunk()
    await getClassesThunk()
    await getAllRentalsThunk()
    await getClassRegistrationsThunk()

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <React.Fragment>
      {!loading ?
        <React.Fragment>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            marginBottom='1em'
          >
            <Title color='white' margin='0'>Classes</Title>

            <Button onClick={() => history.push('/classes/-1')}>

              <Flex
                justifyContent='center'
                alignItems='center'
              >
                <FaPlusCircle/>
                <Text marginLeft='0.5em'>Add Class</Text>
              </Flex>
            </Button>
          </Flex>

          <Title as='h3' marginTop='1em' color='white'>In Progress</Title>

          <ClassesTable
            classes={inProgressClasses}
            noDataMsg='No Classes In Progress'
            hasActionColumn
          />

          <Title as='h3' marginTop='1em' color='white'>Upcoming</Title>

          <ClassesTable
            classes={upcomingClasses}
            noDataMsg='No Upcoming Classes'
            hasActionColumn
          />

          <Title as='h3' marginTop='1em' color='white'>Past</Title>

          <ClassesTable
            classes={pastClasses}
            noDataMsg='No Past Classes'
            hasActionColumn
          />
        </React.Fragment>
        :
        <LoadingPageMessage/>
      }
    </React.Fragment>
  )
}

export default ClassesTab
