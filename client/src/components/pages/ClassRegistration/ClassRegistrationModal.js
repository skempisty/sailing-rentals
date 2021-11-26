import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Card, Button } from 'react-bootstrap'
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
