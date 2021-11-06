import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Card } from 'react-bootstrap'
import { FaAppleAlt, FaArrowsAltV, FaBan, FaCalendarAlt, FaEdit } from 'react-icons/fa'
import { RiSailboatFill } from 'react-icons/ri'

import Box from '../../../shared/styled-system/Box'
import Flex from '../../../shared/styled-system/Flex'
import Text from '../../../shared/styled-system/Text'
import SelectMenu from '../../../shared/SelectMenu'
import SelectMenuItem from '../../../shared/SelectMenuItem'

import EditClassMtgModal from './EditClassMtgModal'

import User from '../../../../domains/User'

import getUserById from '../../../../store/orm/users/getUserById'
import getBoatById from '../../../../store/orm/boats/getBoatById'

const ClassMtg = ({ mtg, index, onDeleteClick }) => {
  const [showEditClassMtgModal, setShowEditClassMtgModal] = useState(false)

  const hasValidInstructor = mtg.instructorId > -1
  const hasValidMtgTime = mtg.start && mtg.end
  const hasValidSelectedBoat = mtg.boatId && mtg.boatId > -1

  return (
    <>
      <EditClassMtgModal
        show={showEditClassMtgModal}
        mtg={mtg}
        mtgIndex={index}
        onHide={() => setShowEditClassMtgModal(false)}
      />

      <Flex alignItems='center' margin='0 1em 0.5em 0'>
        <Flex
          className='handle'
          alignSelf='stretch'
          padding='0 0.25em'
          marginRight='0.5em'
          background={'#343a3f'}
          borderTopLeftRadius='5px'
          borderBottomLeftRadius='5px'
          style={{ cursor: 'pointer' }}
        >
          <Flex alignItems='center'>
            <FaArrowsAltV color='white'/>
          </Flex>
        </Flex>

        <Card margin='0'>
          <Flex flexDirection='column' padding='0.5em 0.75em' color='black'>
            <Flex justifyContent='space-between' alignItems='center'>
              <Text fontWeight='bold'>{mtg.name}</Text>

              <Box marginLeft='0.5em'>
                <SelectMenu variant='outline-dark'>
                  <SelectMenuItem
                    label='Edit'
                    iconComponent={<FaEdit/>}
                    callback={() => setShowEditClassMtgModal(true)}
                  />

                  <SelectMenuItem
                    label='Delete'
                    iconComponent={<FaBan/>}
                    callback={() => onDeleteClick(index)}
                  />
                </SelectMenu>
              </Box>
            </Flex>

            <Flex flexDirection='column'>
              <Flex alignItems='center' height='24px'>
                <FaAppleAlt color={hasValidInstructor ? 'green' : 'red'}/>

                <Box marginLeft='0.25em'>
                  {hasValidInstructor ?
                    <>{User.buildUserFullName(getUserById(mtg.instructorId))}</>
                    :
                    <>Missing Instructor</>
                  }
                </Box>
              </Flex>

              <Flex alignItems='center' height='24px'>
                <FaCalendarAlt color={hasValidMtgTime ? 'green' : 'red'}/>

                <Box marginLeft='0.25em'>
                  {hasValidMtgTime ?
                    <>{moment(mtg.start).format('hh:mm a')} - {moment(mtg.end).format('hh:mm a, MMM DD, YYYY')}</>
                    :
                    <>Missing Time Slot</>
                  }
                </Box>
              </Flex>

              {mtg.boatId !== null &&
                <Flex alignItems='center' height='24px'>
                  <RiSailboatFill color={hasValidSelectedBoat ? 'green' : 'red'}/>

                  <Box marginLeft='0.25em'>
                    {hasValidSelectedBoat ?
                      <>{getBoatById(mtg.boatId).name}</>
                      :
                      <>Missing Boat</>
                    }
                  </Box>
                </Flex>
              }
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

ClassMtg.propTypes = {
  mtg: PropTypes.object
}

export default ClassMtg
