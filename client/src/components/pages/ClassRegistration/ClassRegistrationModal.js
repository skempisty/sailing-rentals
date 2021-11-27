import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Modal, Card, Button, Table } from 'react-bootstrap'
import { FaCrown } from 'react-icons/fa'

import Box from '../../shared/styled-system/Box'
import Flex from '../../shared/styled-system/Flex'
import Text from '../../shared/styled-system/Text'
import PayPalButtons from '../../shared/PayPalButtons'

import { useSession } from '../../../store/session'
import { useClasses } from '../../../store/classes'

const ClassRegistrationModal = ({ klass, show, onHide }) => {
  const { currentUser } = useSession()
  const { createClassRegistrationThunk } = useClasses()

  const handlePaypalApprove = async (data, actions) => {
    const payPalData = { data, actions }

    createClassRegistrationThunk({ classId: klass.id, payPalData })

    onHide()
  }

  const handleFreeRegisterClick = () => {
    createClassRegistrationThunk({ classId: klass.id })

    onHide()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginLeft: '0.5em' }}>Register for Sailing Class {klass.id}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Text as='h3'>Some Info</Text>

        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

        <Text as='h3' marginTop='0.5em'>Meetings</Text>

        <Table responsive style={{ margin: '0' }}>
          <thead><tr>
            <th>When</th>
            <th>Where</th>
          </tr></thead>

          <tbody>
            {klass.meetings.map(mtg =>
              <tr key={mtg.id}>
                <td>{moment(mtg.start).format('hh:mm a')} - {moment(mtg.end).format('hh:mm a')} {moment(mtg.start).format('MM/DD')}</td>
                <td><Text>{mtg.rentalId ? 'On the water' : 'Online'}</Text></td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Box width='100%'>
          <Flex flexDirection='column' alignItems='center'>
            {currentUser.isAdmin &&
              <Card style={{ marginBottom: '1em', padding: '0.25em', background: 'lightgrey' }}>
                <Flex flexDirection='column'>
                  <Flex justifyContent='center' alignItems='center' marginBottom='0.25em'>
                    <FaCrown/>
                    <Text marginLeft='0.25em'>Admin Only</Text>
                  </Flex>

                  <Button onClick={handleFreeRegisterClick}>Free Register</Button>
                </Flex>
              </Card>
            }

            <Box marginBottom='1em'><Text fontWeight='bold' textAlign='center'>Class Price: ${klass.price}</Text></Box>
            <PayPalButtons amount={klass.price} onApprove={handlePaypalApprove}/>
          </Flex>
        </Box>
      </Modal.Footer>
    </Modal>
  )
}

ClassRegistrationModal.propTypes = {
  klass: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

export default ClassRegistrationModal
