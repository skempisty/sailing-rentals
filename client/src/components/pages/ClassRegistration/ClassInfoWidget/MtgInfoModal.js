import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

import Flex from '../../../shared/styled-system/Flex'
import Text from '../../../shared/styled-system/Text'

const MtgInfoModal = ({ mtg, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', alignItems: 'center' }}>
          <Flex alignItems='center'>
            <FaInfoCircle/>

            <Text marginLeft='0.5em'>Meeting Details</Text>
          </Flex>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!!mtg.rentalId &&
          <>
            <Flex flexDirection='column'>
              <Text fontWeight='bold'>Address</Text>
              <Text>Coast Guard Pier</Text>
              <Text>100 Lighthouse Ave.</Text>
              <Text>Monterey CA, 93940</Text>
            </Flex>

            <Flex flexDirection='column' marginTop='1em'>
              <Text fontWeight='bold'>Gate Code</Text>
              <Text>2+4,5,1</Text>
            </Flex>

            {!!mtg.details &&
              <Flex flexDirection='column' marginTop='1em'>
                <Text fontWeight='bold'>Additional Details</Text>
                <Text>{mtg.details}</Text>
              </Flex>
            }
          </>
        }

        {!mtg.rentalId &&
          <Flex>
            {mtg.details ? mtg.details : 'No further details given.'}
          </Flex>
        }
      </Modal.Body>
    </Modal>
  )
}

MtgInfoModal.propTypes = {
  mtg: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

export default MtgInfoModal
