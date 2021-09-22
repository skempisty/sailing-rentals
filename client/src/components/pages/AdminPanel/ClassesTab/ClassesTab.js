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

const ClassesTab = () => {
  const history = useHistory()

  const [loading, setLoading] = useState(true)

  const { classes, getClassesThunk } = useClasses()
  const { getUsersThunk } = useUsers()

  const fetchData = async () => {
    await getUsersThunk()
    await getClassesThunk()

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

          <ClassesTable
            classes={classes}
            noDataMsg='No Upcoming Classes'
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
