import React, { useState } from 'react'
import moment from 'moment'

import { FaBan, FaEdit } from 'react-icons/fa'

import AddClassModal from '../AddClassModal'
import DeleteClassModal from './DeleteClassModal'

import getUserById from '../../../../../store/orm/users/getUserById'

import User from '../../../../../domains/User'
import Klass from '../../../../../domains/Klass'

import SelectMenu from '../../../../shared/SelectMenu'
import SelectMenuItem from '../../../../shared/SelectMenuItem'
import {useClasses} from "../../../../../store/classes";

const ClassRow = ({ klass, hasActionColumn }) => {
  const [showEditClassModal, setShowEditClassModal] = useState(false)
  const [showDeleteClassModal, setShowDeleteClassModal] = useState(false)

  const { classRegistrations } = useClasses()

  const instructorName = User.buildUserFullName(getUserById(klass.instructorId))
  const enrolledCount = Klass.getRegisteredCount(klass.id, classRegistrations)

  return (
    <React.Fragment>
      <AddClassModal
        klass={klass}
        show={showEditClassModal}
        onHide={() => setShowEditClassModal(false)}
      />

      {/*<DeleteClassModal*/}
      {/*  klass={klass}*/}
      {/*  show={showDeleteClassModal}*/}
      {/*  onHide={() => setShowDeleteClassModal(false)}*/}
      {/*/>*/}

      <tr style={{ whiteSpace: 'nowrap' }}>
        {/* Instructor */}
        <td>{instructorName}</td>

        {/* Start */}
        <td>TBD</td>

        {/* End */}
        <td>TBD</td>

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
                callback={() => setShowEditClassModal(true)}
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

export default ClassRow
