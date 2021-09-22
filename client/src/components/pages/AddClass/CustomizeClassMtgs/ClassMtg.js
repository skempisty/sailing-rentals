import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { FaArrowsAltV, FaBan, FaEdit } from 'react-icons/fa'

import Flex from '../../../shared/styled-system/Flex'
import SelectMenu from '../../../shared/SelectMenu'
import SelectMenuItem from '../../../shared/SelectMenuItem'

import EditClassMtgModal from './EditClassMtgModal'

const ClassMtg = ({ mtg, index, onDeleteClick }) => {
  const [showEditClassMtgModal, setShowEditClassMtgModal] = useState(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <EditClassMtgModal
        show={showEditClassMtgModal}
        mtg={mtg}
        index={index}
        onHide={() => setShowEditClassMtgModal(false)}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          marginRight: '1em',
          marginBottom: '0.5em'
        }}
      >
        <Flex
          className='handle'
          alignItems='center'
          padding='0 0.25em'
          background={'#343a3f'}
          borderTopLeftRadius='5px'
          borderBottomLeftRadius='5px'
          style={{ cursor: 'pointer' }}
        >
          <FaArrowsAltV color='white'/>
        </Flex>

        {mtg.name}

        <SelectMenu variant='light'>
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
      </div>
    </div>
  )
}

ClassMtg.propTypes = {
  mtg: PropTypes.object
}

export default ClassMtg
