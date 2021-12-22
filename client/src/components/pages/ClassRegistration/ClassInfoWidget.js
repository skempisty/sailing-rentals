import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Button, Card, Table } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

import Flex from '../../shared/styled-system/Flex'
import Text from '../../shared/styled-system/Text'
import ClassRegistrationModal from './ClassRegistrationModal'

import ClassDomain from '../../../domains/Klass'
import { siteColors } from '../../../utils/constants'

import { useClasses } from '../../../store/classes'
import { useSession } from '../../../store/session'

const ClassInfoWidget = ({ klass, hasRegisterBtn }) => {
  const [showClassRegistrationModal, setShowClassRegistrationModal] = useState(false)

  const { currentUser } = useSession()
  const { classRegistrations } = useClasses()

  const currentUserIsRegistered = classRegistrations.some(r => r.classId === klass.id && r.userId === currentUser.id)

  const registrationCount = ClassDomain.getRegistrationCount(klass.id, classRegistrations)

  const isClassFull = registrationCount >= klass.capacity

  const isRegisterDisabled = isClassFull || currentUserIsRegistered

  const registerBtnText = () => {
    if (isClassFull) {
      return 'Class Full'
    } else if (currentUserIsRegistered) {
      return 'Registered'
    } else {
      return 'Register'
    }
  }

  return (
    <>
      <ClassRegistrationModal
        klass={klass}
        show={showClassRegistrationModal}
        onHide={() => setShowClassRegistrationModal(false)}
      />

      <Card style={{ display: 'inline-flex', color: 'black' }}>
        <Flex>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            minWidth='10em'
          >
            <Text fontSize='1.25em' fontWeight='bold'>Cohort #{klass.id}</Text>

            {hasRegisterBtn &&
              <Flex flexDirection='column'>
                <Text textAlign='center'>{registrationCount} / {klass.capacity}</Text>
                <Text textAlign='center' fontSize='0.8em'>capacity</Text>
              </Flex>
            }
          </Flex>

          <Flex flexDirection='column' margin='0.5em 0'>
            <Text
              marginBottom='0.25em'
              textAlign='center'
              fontWeight='bold'
            >
              Meetings
            </Text>

            <Table responsive style={{ margin: '0' }}>
              <thead><tr>
                <th>When</th>
                <th>Where</th>
              </tr></thead>

              <tbody>
                {klass.meetings.map(mtg =>
                  <tr key={mtg.id}>
                    <td style={{ verticalAlign: 'middle' }}>
                      <Flex alignItems='center'>
                        <Text
                          marginRight='1em'
                          color={siteColors.blue}
                          fontWeight='bold'
                        >
                          {moment(mtg.start).format('MMM DD')}
                        </Text>

                        <Text>{moment(mtg.start).format('hh:mm a')} - {moment(mtg.end).format('hh:mm a')}</Text>
                      </Flex>
                    </td>

                    <td>
                      {hasRegisterBtn ?
                        <Text>{mtg.rentalId ? 'On the water' : 'Online'}</Text>
                        :
                        <Button style={{ width: '100%' }} variant='secondary'>
                          <Flex alignItems='center'>
                            <FaInfoCircle/>
                            <Text marginLeft='0.5em'>{mtg.rentalId ? 'On the water' : 'Online'}</Text>
                          </Flex>
                        </Button>
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Flex>
        </Flex>

        {hasRegisterBtn &&
          <Button
            disabled={isRegisterDisabled}
            onClick={() => setShowClassRegistrationModal(true)}
          >
            {registerBtnText()}
          </Button>
        }
      </Card>
    </>
  )
}

ClassInfoWidget.propTypes = {
  klass: PropTypes.object.isRequired,
  hasRegisterBtn: PropTypes.bool
}

export default ClassInfoWidget
