import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Button, Card, Table } from 'react-bootstrap'

import Flex from '../../shared/styled-system/Flex'
import Text from '../../shared/styled-system/Text'
import ClassRegistrationModal from './ClassRegistrationModal'

import ClassDomain from '../../../domains/Klass'

import { useClasses } from '../../../store/classes'
import { useSession } from '../../../store/session'

const ClassInfoWidget = ({ klass, hasRegisterBtn }) => {
  const [showClassRegistrationModal, setShowClassRegistrationModal] = useState(false)

  const { currentUser } = useSession()
  const { classRegistrations } = useClasses()

  const isRegisterDisabled = classRegistrations.some(r => r.classId === klass.id && r.userId === currentUser.id)

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

            <Flex flexDirection='column'>
              <Text textAlign='center'>{ClassDomain.getRegistrationCount(klass.id, classRegistrations)} / {klass.capacity}</Text>
              <Text textAlign='center' fontSize='0.8em'>capacity</Text>
            </Flex>
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
                  <tr>
                    <td>{moment(mtg.start).format('hh:mm a')} - {moment(mtg.end).format('hh:mm a')} {moment(mtg.start).format('MM/DD')}</td>
                    <td><Text>{mtg.rentalId ? 'On the water' : 'Online'}</Text></td>
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
            {isRegisterDisabled ? 'Registered' : 'Register'}
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
