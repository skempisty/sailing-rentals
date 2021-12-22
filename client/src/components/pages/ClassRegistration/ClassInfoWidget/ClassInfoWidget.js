import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Card, Table } from 'react-bootstrap'

import Flex from '../../../shared/styled-system/Flex'
import Text from '../../../shared/styled-system/Text'
import ClassRegistrationModal from '../ClassRegistrationModal'
import MtgInfoRow from '../MtgInfoRow'

import ClassDomain from '../../../../domains/Klass'

import { useClasses } from '../../../../store/classes'
import { useSession } from '../../../../store/session'

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
                  <MtgInfoRow key={mtg.id} mtg={mtg} hasRegisterBtn={hasRegisterBtn}/>
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
