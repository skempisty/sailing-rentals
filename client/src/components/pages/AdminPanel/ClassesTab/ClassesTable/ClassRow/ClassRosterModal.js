import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Alert, Modal, Table } from 'react-bootstrap'

import Text from '../../../../../shared/styled-system/Text'

import buildFullName from '../../../../../../utils/buildUserFullName'

import { useUsers } from '../../../../../../store/users'
import { useClasses } from '../../../../../../store/classes'

const StyledTableWrapper = styled.div`
  .table th {
    border-top: none;
  }
`

const ClassRosterModal = ({ classId, onHide }) => {
  const { getUsersThunk, users } = useUsers()
  const { getClassRegistrationsThunk, classRegistrations } = useClasses()

  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    await getUsersThunk()
    await getClassRegistrationsThunk()

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const thisClassRegistrations = classRegistrations.filter(r => r.classId === classId)
  const registeredUsers = users.filter(u => thisClassRegistrations.some(r => r.userId === u.id))

  return (
    <Modal show onHide={onHide} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Class Roster</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!isLoading ?
          <>
            {registeredUsers.length > 0 ?
              <StyledTableWrapper>
                <Table responsive style={{ margin: '0' }}>
                  <thead><tr>
                    <th>Sailor</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr></thead>

                  <tbody>
                    {registeredUsers.map((user) =>
                      <tr>
                        <td>
                          <img
                            src={user.imageUrl}
                            alt=''
                            style={{ maxWidth: '2em', height: '2em', marginRight: '1em' }}
                          />

                          <b>{buildFullName(user.firstName, user.lastName)}</b>
                        </td>

                        <td>{user.email}</td>

                        <td>{user.phone}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </StyledTableWrapper>
              :
              <Alert
                variant='dark'
                style={{
                  margin: '0.5em',
                  textAlign: 'center'
                }}
              >
                <b>No Registered Users</b>
              </Alert>
            }
          </>
          :
          <Text>Loading...</Text>
        }
      </Modal.Body>
    </Modal>
  )
}

ClassRosterModal.propTypes = {
  classId: PropTypes.number,
  onHide: PropTypes.func.isRequired
}

export default ClassRosterModal
