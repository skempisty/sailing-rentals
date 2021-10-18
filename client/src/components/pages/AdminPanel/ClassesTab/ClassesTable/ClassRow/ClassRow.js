import React, { useState } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import moment from 'moment'

import { FaBan, FaEdit } from 'react-icons/fa'

import DeleteClassModal from './DeleteClassModal'

import SelectMenu from '../../../../../shared/SelectMenu'
import SelectMenuItem from '../../../../../shared/SelectMenuItem'

import Klass from '../../../../../../domains/Klass'

import { useClasses } from '../../../../../../store/classes'


const ClassRow = ({ klass, hasActionColumn }) => {
  const history = useHistory()
  const [showDeleteClassModal, setShowDeleteClassModal] = useState(false)

  const { classRegistrations } = useClasses()

  const { startTime, endTime } = Klass.getStartEndTimes(klass)

  const enrolledCount = Klass.getRegisteredCount(klass.id, classRegistrations)

  return (
    <React.Fragment>
      <DeleteClassModal
        klass={klass}
        show={showDeleteClassModal}
        onHide={() => setShowDeleteClassModal(false)}
      />

      <tr style={{ whiteSpace: 'nowrap' }}>
        {/* id */}
        <td>{klass.id}</td>

        {/* Start */}
        <td>{startTime.format('hh:mm a, MMM DD, YYYY')}</td>

        {/* End */}
        <td>{endTime.format('hh:mm a, MMM DD, YYYY')}</td>

        {/* Enrolled */}
        <td>{enrolledCount}/{klass.capacity}</td>

        {/* Created At */}
        <td>{moment(klass.createdAt).format('MM/DD/YY LT')}</td>

        {/* Action */}
        {hasActionColumn &&
          <td>
            <SelectMenu variant='outline-dark'>
              <SelectMenuItem
                label='Edit Class'
                iconComponent={<FaEdit/>}
                callback={() => history.push(`/classes/${klass.id}`)}
              />

              <SelectMenuItem
                label='Cancel Class'
                iconComponent={<FaBan/>}
                callback={() => setShowDeleteClassModal(true)}
              />
            </SelectMenu>
          </td>
        }
      </tr>
    </React.Fragment>
  )
}

ClassRow.propTypes = {
  klass: PropTypes.object,
  hasActionColumn: PropTypes.bool
}

export default ClassRow
