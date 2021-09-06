import React, { useState, useEffect } from 'react'

import { Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

import Flex from '../../../shared/styled-system/Flex'
import Title from '../../../shared/styled-system/Title'
import Text from '../../../shared/styled-system/Text'

import LoadingPageMessage from '../../../LoadingPageMessage'
import AddClassModal from './AddClassModal'
import ClassesTable from './ClassesTable'

import { useClasses } from '../../../../store/classes'
import { useUsers } from '../../../../store/users'

const ClassesTab = () => {
  const [loading, setLoading] = useState(true)
  const [showAddClassModal, setShowAddClassModal] = useState(false)

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
          <AddClassModal
            show={showAddClassModal}
            onHide={() => setShowAddClassModal(false)}
          />

          <Flex
            justifyContent='space-between'
            alignItems='center'
            marginBottom='1em'
          >
            <Title color='white' margin='0'>Classes</Title>

            <Button onClick={() => setShowAddClassModal(true)}>

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
