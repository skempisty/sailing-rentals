import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Card } from 'react-bootstrap'

import ClassRegistrationModal from './ClassRegistrationModal'

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

      <Card>
        <div>id: {klass.id}</div>
        <div>capacity: {klass.capacity}</div>
        <div>meetings: {JSON.stringify(klass.meetings)}</div>


        {hasRegisterBtn &&
          <Button
            disabled={isRegisterDisabled}
            onClick={() => setShowClassRegistrationModal(true)}
          >
            Register
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
