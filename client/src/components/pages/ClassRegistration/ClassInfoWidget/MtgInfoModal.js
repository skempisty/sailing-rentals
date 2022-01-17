import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Spinner } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

import Box from '../../../shared/styled-system/Box'
import Flex from '../../../shared/styled-system/Flex'
import Text from '../../../shared/styled-system/Text'

import buildFullName from '../../../../utils/buildUserFullName'

import { useUsers } from '../../../../store/users'

const MtgInfoModal = ({ mtg, show, onHide }) => {
  const { instructors } = useUsers()

  const instructorUser = instructors.find(u => u.id === mtg.instructorId)

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
        <Flex flexDirection='column' marginBottom='1em'>
          <Text fontWeight='bold'>Instructor</Text>

          {!!instructorUser ?
            <Box>
              <img
                src={instructorUser.imageUrl}
                alt=''
                style={{maxWidth: '2em', height: '2em', marginRight: '1em'}}
              />

              <b>{buildFullName(instructorUser.firstName, instructorUser.lastName)}</b>
            </Box>
            :
            <Flex>
              <Spinner animation='grow'/>
              <Text>Loading Instructor</Text>
            </Flex>
          }
        </Flex>

        {!!mtg.rentalId &&
          <>
            <Flex flexDirection='column' marginBottom='1em'>
              <Text fontWeight='bold'>Address</Text>
              <Text>Coast Guard Pier</Text>
              <Text>100 Lighthouse Ave.</Text>
              <Text>Monterey CA, 93940</Text>
            </Flex>

            <Flex flexDirection='column' marginBottom='1em'>
              <Text fontWeight='bold'>Gate Code</Text>
              <Text>2+4,5,1</Text>
            </Flex>

            {!!mtg.details &&
              <Flex flexDirection='column' marginBottom='1em'>
                <Text fontWeight='bold'>Additional Details</Text>
                <Text dangerouslySetInnerHTML={{ __html: mtg.details }}/>
              </Flex>
            }
          </>
        }

        {!mtg.rentalId &&
          <Flex>
            {mtg.details ?
              <Text dangerouslySetInnerHTML={{ __html: mtg.details }}/>
              :
              'No further details given.'
            }
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
