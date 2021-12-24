import React, { useState } from 'react'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import moment from 'moment'

import { FaBan, FaEdit, FaUsers } from 'react-icons/fa'

import Flex from '../../../../../shared/styled-system/Flex'
import Text from '../../../../../shared/styled-system/Text'
import SelectMenu from '../../../../../shared/SelectMenu'
import SelectMenuItem from '../../../../../shared/SelectMenuItem'

import ClassRosterModal from './ClassRosterModal'
import DeleteClassModal from './DeleteClassModal'

import Klass from '../../../../../../domains/Klass'
import { siteColors } from '../../../../../../utils/constants'

import { useClasses } from '../../../../../../store/classes'

const ClassRow = ({ klass, hasActionColumn }) => {
  const history = useHistory()
  const [showClassRosterModal, setShowClassRosterModal] = useState(false)
  const [showDeleteClassModal, setShowDeleteClassModal] = useState(false)

  const { classRegistrations } = useClasses()

  const { startTime, endTime } = Klass.getStartEndTimes(klass)

  const enrolledCount = Klass.getRegistrationCount(klass.id, classRegistrations)

  return (
    <React.Fragment>
      {showClassRosterModal &&
        <ClassRosterModal
          classId={klass.id}
          onHide={() => setShowClassRosterModal(false)}
        />
      }

      <DeleteClassModal
        klass={klass}
        show={showDeleteClassModal}
        onHide={() => setShowDeleteClassModal(false)}
      />

      <tr style={{ whiteSpace: 'nowrap' }}>
        {/* id */}
        <td>{klass.id}</td>

        {/* Start */}
        <td>
          <Flex alignItems='center'>
            <Text
              marginRight='1em'
              color={siteColors.blue}
              fontWeight='bold'
            >
              {moment(startTime).format('MMM DD, YYYY')}
            </Text>

            <Text>{moment(startTime).format('hh:mm a')}</Text>
          </Flex>
        </td>

        {/* End */}
        <td>
          <Flex alignItems='center'>
            <Text
              marginRight='1em'
              color={siteColors.blue}
              fontWeight='bold'
            >
              {moment(endTime).format('MMM DD, YYYY')}
            </Text>

            <Text>{moment(endTime).format('hh:mm a')}</Text>
          </Flex>
        </td>

        {/* Enrolled */}
        <td>{enrolledCount}/{klass.capacity}</td>

        {/* Created At */}
        <td>{moment(klass.createdAt).format('MM/DD/YY LT')}</td>

        {/* Action */}
        {hasActionColumn &&
          <td>
            <SelectMenu variant='outline-dark'>
              <SelectMenuItem
                label='Roster'
                iconComponent={<FaUsers/>}
                callback={() => setShowClassRosterModal(true)}
              />

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
